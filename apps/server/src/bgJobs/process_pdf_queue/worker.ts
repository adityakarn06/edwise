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

    try {
      async function checkCloudinaryUpload() {
        const findCloudinaryUpload = await prisma.uploadedDocs.findFirst({
          where: {
            fileName: data.filename
          }
        });
        return findCloudinaryUpload;
      }

      setTimeout(async () => {
        const result = await checkCloudinaryUpload();
        if (result) {
          if (fs.existsSync(data.filePath)) {
            fs.unlinkSync(data.filePath);
          }
        } else {
          console.error("File not found in Cloudinary. so can't delete local file");
        }
      }, 8000);
    } catch (error) {
      console.error('Error checking Cloudinary upload:', error);
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