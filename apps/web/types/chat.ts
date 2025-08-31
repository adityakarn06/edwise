export interface ChatMessage {
    role: "assistant" | "user";
    content: string;
    references?: string[];
    sources?: any[];
    id?: string;
    timestamp?: Date;
  }
  
  export interface ImportantQuestion {
    question: string;
    answer: string;
    id?: string;
  }
  
  export interface ChatState {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
    latestAssistantMessageId: number | null;
  }
  
  export interface ImportantQuestionsState {
    questions: ImportantQuestion[];
    isVisible: boolean;
    isLoading: boolean;
    error: string | null;
  }