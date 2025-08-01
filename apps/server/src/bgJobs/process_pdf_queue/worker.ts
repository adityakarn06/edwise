import { Worker } from 'bullmq';
import { createEmbeddings } from '../../lib/embeddings';
import { createTextSplitter } from '../../lib/textSplitter';
import { loadPDF } from '../../lib/pdfLoader';
import { QdrantVectorStore } from "@langchain/qdrant";
import { vectorCollectionName } from '../../config/config';
import { PrismaClient } from '@repo/postgres-db/client';
import fs from "fs";

const prisma = new PrismaClient();

const worker = new Worker('file-upload-queue', async job => {
  try {
    if (!job.data) throw new Error('Job data is missing');
    
    const data = job.data;
    
    if (!data.filename || !data.filePath) {
      throw new Error('Job data must contain filename and filePath');
    }

    const docs = await loadPDF(data.filePath);
    
    const textSplitter = createTextSplitter();
    const splitDocs = await textSplitter.splitDocuments(docs);
    
    const embeddings = createEmbeddings();

    await QdrantVectorStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        url: process.env.QDRANT_URL || 'http://localhost:6333',
        collectionName: vectorCollectionName,
        collectionConfig: {
          vectors: { size: 384, distance: "Cosine" }
        }
      }
    );

    async function checkCloudinaryUpload() {
      const findCloudinaryUpload = await prisma.uploadedDocs.findFirst({
        where: {
          fileName: data.filename
        }
      });
      return findCloudinaryUpload;
    }

    try {
      console.log("Deleting local file after processing...");
      const result = await checkCloudinaryUpload();
      console.log("result", result);

      if (result) {
        if (fs.existsSync(data.filePath)) {
          fs.unlinkSync(data.filePath);
          console.log("Deleted file from server");
        }
      }
    } catch (error) {
      console.log("failed to delete file from server");
      const result = await checkCloudinaryUpload();
      if (result) {
        console.log("deleted finally");
      }
    }

    return { 
      status: 'success', 
      message: 'PDF processed successfully',
      filename: data.filename,
      chunks: splitDocs.length,
      userId: data.userId
    };
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}, { concurrency: 100, connection: { host: 'localhost', port: 6379 } });

worker.on('error', err => { console.error('Worker encountered an error:', err); });
worker.on('completed', job => { console.log(`Job ${job.id} completed successfully`); });
worker.on('failed', (job, err) => { console.error(`Job ${job?.id} failed with error:`, err.message); });

console.log('Worker started and waiting for jobs...');