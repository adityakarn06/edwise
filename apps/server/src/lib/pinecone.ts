import { Pinecone } from '@pinecone-database/pinecone';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document, RecursiveCharacterTextSplitter } from '@pinecone-database/doc-splitter';
import { createEmbedding } from './createEmbeddings';
import md5 from 'md5';

let pinecone: Pinecone | null = null;

type Vector = {
  id: string;
  values: number[];
  metadata: {
    text: string;
    pageNumber: number;
  };
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: {pageNumber: number};
  }
};

// init pinecone instance
export const getPineconeClient = async () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error('Pinecone API key is not set in environment variables');
  }
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY
    });
  }
  return pinecone;
};

// load pdf file and return pages
export async function loadPDF(filePath: string) {
  if (!filePath) {
    throw new Error('File path is required to load PDF');
  }
  const loader = new PDFLoader(filePath);
  const pages = (await loader.load()) as PDFPage[];
  return pages;
}

// make string to a specific byte size
export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
};

// convert a page to multiple para
export async function prepareDocument(pages: PDFPage) {
  let { pageContent, metadata } = pages;
  pageContent = pageContent.replace(/\n/g, ' ').trim();
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000)
      }
    })
  ]);
  return docs;
}

// embed a document and return vector
export async function embedDocument(doc: Document) {
      try {
        const embeddings = await createEmbedding(doc.pageContent);
        // uniquely identify the document using its content
        const hash = md5(doc.pageContent);

        return {
          id: hash,
          values: embeddings,
          metadata: {
            text: doc.metadata.text,
            pageNumber: doc.metadata.pageNumber,
          }
        } as Vector;
      } catch (error) {
        console.error('error embedding document:', error);
        throw error;
      }
}