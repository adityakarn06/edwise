import { useState, useEffect } from 'react';
import { getAllDoc } from '@/utils/getDoc';

interface Document {
  id: string;
  fileName: string;
  fileUrl: string;
}

export const useDocuments = () => {
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [fileIds, setFileIds] = useState<string[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const docs = await getAllDoc();
      
      if (docs && docs.length > 0) {
        const urls = docs.map((doc: Document) => doc.fileUrl);
        const fileNames = docs.map((doc: Document) => doc.fileName);
        const fileIds = docs.map((doc: Document) => doc.id);
        
        setDocuments(docs);
        setFileIds(fileIds);
        setFileNames(fileNames);
        
        if (urls.length > 0 && urls[0] && !currentPdfUrl) {
          setCurrentPdfUrl(urls[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError("Failed to fetch documents");
    } finally {
      setIsLoading(false);
    }
  };

  const setCurrentPdfByIndex = (index: number) => {
    if (documents[index]) {
      setCurrentPdfUrl(documents[index].fileUrl);
    }
  };

  const refreshDocuments = () => {
    fetchDocuments();
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    currentPdfUrl,
    fileNames,
    fileIds,
    fileUrls: documents.map(doc => doc.fileUrl), 
    documents,
    isLoading,
    error,
    
    setCurrentPdfUrl,
    setCurrentPdfByIndex,
    refreshDocuments,
  };
};