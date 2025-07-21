import { Worker } from 'bullmq';
import { createEmbeddings } from '../../lib/embeddings';
import { createTextSplitter } from '../../lib/textSplitter';
import { loadPDF } from '../../lib/pdfLoader';
import { QdrantVectorStore } from "@langchain/qdrant";
import { vectorCollectionName } from '../../config/config';

const worker = new Worker('file-upload-queue', async job => {
  try {
    if (!job.data) throw new Error('Job data is missing');
    if (typeof job.data !== 'string') throw new Error('Job data must be a string');
    const data = JSON.parse(job.data);
    if (!data.filename || !data.filePath) throw new Error('Job data must contain filename and filePath');

    const docs = await loadPDF(data.filePath);
    const textSplitter = createTextSplitter();
    const splitDocs = await textSplitter.splitDocuments(docs);
    const embeddings = createEmbeddings();

    await QdrantVectorStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        url: 'http://localhost:6333',
        collectionName: vectorCollectionName,
        collectionConfig: {
          vectors: { size: 384, distance: "Cosine" }
        }
      }
    );

    return { status: 'success', message: 'PDF processed successfully' };
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}, { concurrency: 100, connection: { host: 'localhost', port: 6379 } });

worker.on('error', err => { console.error('Worker encountered an error:', err); });
worker.on('completed', job => { console.log(`Job ${job.id} completed successfully`); });
worker.on('failed', (job, err) => { console.error(`Job ${job?.id} failed with error:`, err.message); });

console.log('Worker started and waiting for jobs...');