import { useState, useEffect } from 'react';
import { getMcqDocs } from '@/utils/getDoc';
import api from '@/lib/api';

interface McqDocument {
  id: string;
  fileName: string;
  fileUrl: string;
  createdAt: string;
}

interface McqData {
  question: string;
  options: string[];
  answer: string;
}

export const useMcqDocuments = () => {
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [fileIds, setFileIds] = useState<string[]>([]);
  const [mcqDocuments, setMcqDocuments] = useState<McqDocument[]>([]);
  const [mcqData, setMcqData] = useState<McqData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMcqDocuments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const docs = await getMcqDocs();
      
      if (docs && docs.length > 0) {
        const urls = docs.map((doc: McqDocument) => doc.fileUrl);
        const fileNames = docs.map((doc: McqDocument) => doc.fileName);
        const fileIds = docs.map((doc: McqDocument) => doc.id);
        
        setMcqDocuments(docs);
        setFileIds(fileIds);
        setFileNames(fileNames);
        
        if (urls.length > 0 && urls[0] && !currentPdfUrl) {
          setCurrentPdfUrl(urls[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching MCQ documents:", error);
      setError("Failed to fetch MCQ documents");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMcqData = async (pdfUrl: string) => {
    if (!pdfUrl) return;
    
    try {
      const result = await api.get(`/mcq/data?fileUrl=${pdfUrl}`);
      if (result.data && Array.isArray(result.data.MCQs)) {
        setMcqData(result.data.MCQs);
      } else {
        setMcqData([]);
      }
    } catch (error) {
      console.error("Error fetching MCQ data:", error);
      setMcqData([]);
    }
  };

  const deleteMcqDocument = async (docId: string) => {
    try {
      await api.delete(`/mcq/docs/${docId}`);
      await fetchMcqDocuments();
      return true;
    } catch (error) {
      console.error("Error deleting MCQ document:", error);
      return false;
    }
  };

  const setCurrentPdfByIndex = (index: number) => {
    if (mcqDocuments[index]) {
      setCurrentPdfUrl(mcqDocuments[index].fileUrl);
    }
  };

  const refreshDocuments = () => {
    fetchMcqDocuments();
  };

  useEffect(() => {
    fetchMcqDocuments();
  }, []);

  useEffect(() => {
    if (currentPdfUrl) {
      fetchMcqData(currentPdfUrl);
    }
  }, [currentPdfUrl]);

  return {
    currentPdfUrl,
    fileNames,
    fileIds,
    fileUrls: mcqDocuments.map(doc => doc.fileUrl), // Add fileUrls
    mcqDocuments,
    mcqData,
    isLoading,
    error,
    
    setCurrentPdfUrl,
    setCurrentPdfByIndex,
    setMcqData,
    refreshDocuments,
    deleteMcqDocument,
  };
};