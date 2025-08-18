import * as dotenv from 'dotenv';
dotenv.config();

import { Worker } from 'bullmq';
import { embedDocument, getPineconeClient, loadPDF, prepareDocument } from '../../lib/pinecone';
import { PrismaClient } from '@repo/postgres-db/client';
import { convertToAscii } from '../../lib/utils';

const VectorIndexName = process.env.PINECONE_INDEX_NAME;
if (!VectorIndexName) {
  throw new Error('Pinecone index name is not set in environment variables');
}

const prisma = new PrismaClient();

const worker = new Worker('file-upload-queue', async job => {
  try {
    if (!job.data) throw new Error('Job data is missing');
    
    const data = job.data;
    
    if (!data.filename || !data.filePath) {
      throw new Error('Job data must contain filename and filePath');
    }

    const pages = await loadPDF(data.filePath);
    const docs = await Promise.all(pages.map(page => prepareDocument(page)));
    
    const vectors = await Promise.all(docs.flat().map(embedDocument));

    const pineconeClient = await getPineconeClient();
    const pineconeIndex = pineconeClient.Index(VectorIndexName);

    const nameSpace = convertToAscii(data.filename);

    try {
      await pineconeIndex.namespace(nameSpace).upsert(vectors)
    } catch (error) {
      console.error('Error creating Pinecone namespace:', error);
    }

    return { 
      status: 'success', 
      message: 'PDF processed successfully',
      filename: data.filename,
      chunks: docs.flat().length,
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