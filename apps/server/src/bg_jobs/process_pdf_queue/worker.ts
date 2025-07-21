import { Worker } from 'bullmq';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { QdrantVectorStore } from "@langchain/qdrant";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

const worker = new Worker('file-upload-queue', async job => {
  try {
    if (!job.data) {
      throw new Error('Job data is missing');
    }
    if (typeof job.data !== 'string') {
      throw new Error('Job data must be a string');
    }
    const data = JSON.parse(job.data);
    if (!data.filename || !data.filePath) {
      throw new Error('Job data must contain filename and filePath');
    }

    // Load the PDF file
    const loader = new PDFLoader(data.filePath);
    const docs = await loader.load();
    
    // split the documents into chunks
    const textSplitter = new CharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await textSplitter.splitDocuments(docs);
    
    // create embeddings
    const embeddings = new HuggingFaceTransformersEmbeddings({
      model: "Xenova/all-MiniLM-L6-v2",
    });

    // store the documents in Qdrant
    await QdrantVectorStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        url: 'http://localhost:6333',
        collectionName: "edwise-pdf-collection",
        collectionConfig: {
          vectors: {
            size: 384,
            distance: "Cosine"
          }
        }
      }
    );

    return { status: 'success', message: 'PDF processed successfully' };
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}, { concurrency: 100, connection: { host: 'localhost', port: 6379 } });

worker.on('error', err => {
  console.error('Worker encountered an error:', err);
});

worker.on('completed', job => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error:`, err.message);
});

console.log('Worker started and waiting for jobs...');