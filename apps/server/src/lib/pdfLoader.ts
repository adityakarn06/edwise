import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export function loadPDF(filePath: string) {
  const loader = new PDFLoader(filePath);
  return loader.load();
}