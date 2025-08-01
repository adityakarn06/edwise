"use client";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import api from "@/lib/api";
import { useSession } from "next-auth/react";
import { TypeAnimation } from 'react-type-animation';
import SummaryGenComponent from "./SummaryGen";
import GenImpQuesComponent from "./ImpQuestions";
import { useEffect, useState } from "react";

interface IMessages {
  role: "assistant" | "user";
  content?: string;
  refference?: string[];
  sources?: any[];
}

interface ImportantQuestion {
  question: string;
  answer: string;
}

interface ChatComponentProps {
  currentPdfUrl: string;
}

const ThinkingAnimation: React.FC = () => (
  <div className="flex items-center space-x-1">
    <span className="text-sm">Thinking</span>
    <span className="animate-bounce">.</span>
    <span className="animate-bounce delay-100">.</span>
    <span className="animate-bounce delay-200">.</span>
  </div>
);

const getChatHistory = async () => {
  try {
    const { data } = await api.get(`/chat/history`);
    return data; 
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return { history: [] };
  }
}

const ChatComponent: React.FC<ChatComponentProps> = ({currentPdfUrl}) => {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [latestAssistantMessageId, setLatestAssistantMessageId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [importantQuestions, setImportantQuestions] = useState<ImportantQuestion[]>([]);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);

  useEffect(() => {
    getChatHistory().then((history) => {
      if (history && history.history && history.history.length > 0) {
        const formattedMessages = history.history.map((msg: any) => ({
          role: msg.userQuery ? "user" : "assistant",
          content: msg.userQuery || msg.response,
          refference: msg.sources || [],
          sources: msg.sources || []
        }));
        
        // Create pairs of messages (user query followed by assistant response)
        const messagePairs: IMessages[] = [];
        history.history.forEach((msg: any) => {
          if (msg.userQuery) {
            messagePairs.push({
              role: "user",
              content: msg.userQuery,
              sources: []
            });
          }
          if (msg.response) {
            messagePairs.push({
              role: "assistant",
              content: msg.response,
              refference: msg.sources || [],
              sources: msg.sources || []
            });
          }
        });
        
        setMessages(messagePairs);
      }
    }).catch((error) => {
      console.error("Error fetching chat history:", error);
      setMessages([]);
    })
  }, []);

  const handleSendChatMessage = async () => {
    if (!message.trim()) return;
    
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);
    
    setIsLoading(true);
    
    try {
      const { data } = await api.get(`/chat/ai?message=${encodeURIComponent(message)}`);

      const references = data?.sources
        ? data.sources.map((source: any) => {
          return source.title && source.section 
            ? `${source.title} - ${source.section}`
            : source.title || "Unknown source";
        })
        : [];

      setMessages((prev) => {
        const newMessages = [
          ...prev,
          {
            role: "assistant" as const,
            content: data.message,
            refference: references,
            sources: data.sources,
          },
        ];
        // Set the latest assistant message index
        setLatestAssistantMessageId(newMessages.length - 1);
        return newMessages;
      });

    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => {
        const newMessages = [
          ...prev,
          {
            role: "assistant" as const,
            content:
              "Sorry, I encountered an error while processing your request.",
          },
        ];
        setLatestAssistantMessageId(newMessages.length - 1);
        return newMessages;
      });
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  const handleImportantQuestionClick = (question: string) => {
    setMessage(question);
    
    // Add the user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);
    
    setIsLoading(true);
    
    api.get(`/chat/ai?message=${encodeURIComponent(question)}`)
      .then(({ data }) => {
        const references = data?.sources
          ? data.sources.map((source: any) => {
            return source.title && source.section 
              ? `${source.title} - ${source.section}`
              : source.title || "Unknown source";
          })
          : [];

        setMessages((prev) => {
          const newMessages = [
            ...prev,
            {
              role: "assistant" as const,
              content: data.message,
              refference: references,
              sources: data.sources,
            },
          ];
          setLatestAssistantMessageId(newMessages.length - 1);
          return newMessages;
        });
      })
      .catch((error) => {
        console.error("Error fetching response:", error);
        setMessages((prev) => {
          const newMessages = [
            ...prev,
            {
              role: "assistant" as const,
              content: "Sorry, I encountered an error while processing your request.",
            },
          ];
          setLatestAssistantMessageId(newMessages.length - 1);
          return newMessages;
        });
      })
      .finally(() => {
        setIsLoading(false);
        setMessage("");
      });
  };

  const renderMessageContent = (msg: IMessages, index: number) => {
    if (msg.role === "user") {
      return <div>{msg.content}</div>;
    } else {
      if (index === latestAssistantMessageId) {
        return (
          <TypeAnimation
            sequence={[msg.content || ""]}
            wrapper="div"
            speed={95}
            cursor={false}
          />
        );
      } else {
        return <div>{msg.content}</div>;
      }
    }
  };

  const handleImportantQuestionsGenerated = (questions: ImportantQuestion[]) => {
    setImportantQuestions(questions);
    setShowQuestions(true);
  };

  const toggleQuestions = () => {
    if (importantQuestions.length > 0) {
      setShowQuestions(!showQuestions);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/90">
      {messages.length === 0 ? (
        <div className="flex flex-col gap-2 items-center justify-center h-full p-4">
          <p className="text-3xl text-gray-500">Welcome, {session?.user?.name || session?.user?.email}! 👋</p>
          <p className="text-lg text-gray-500">How can I help you today?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            <SummaryGenComponent />
            <GenImpQuesComponent 
              currentPdfUrl={currentPdfUrl} 
              onQuestionsGenerated={handleImportantQuestionsGenerated}
            />
          </div>

          {importantQuestions.length > 0 && (
            <div className="mt-6 w-full max-w-4xl max-h-96 overflow-y-auto">
              <button 
                onClick={toggleQuestions}
                className="text-sm text-blue-400 hover:text-blue-300 mb-2"
              >
                {showQuestions ? "Hide Questions" : "Show Questions"}
              </button>
              
              {showQuestions && (
                <div className="space-y-4 mt-2">
                  {importantQuestions.map((question, index) => (
                    <div 
                      key={index} 
                      className="border border-white/15 rounded-lg p-4 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleImportantQuestionClick(question.question)}
                    >
                      <h3 className="font-medium text-white/90 mb-2">Q{index + 1}: {question.question}</h3>
                      <p className="text-white/70 text-sm">{question.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg?.role === "user" ? "flex justify-end" : "flex justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {renderMessageContent(msg, index)}
                
                {msg.refference && msg.refference.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    <p className="font-semibold">Sources:</p>
                    <ul className="list-disc pl-5 mt-1">
                      {msg.refference.map((ref, idx) => (
                        <li key={idx}>{ref}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="mb-4 flex justify-start">
              <div className="px-4 py-2 rounded-lg bg-gray-200 text-black">
                <ThinkingAnimation />
              </div>
            </div>
          )}

          {importantQuestions.length > 0 && (
            <div className="mt-4 max-h-96 overflow-y-auto">
              <button 
                onClick={toggleQuestions}
                className="text-sm text-blue-400 hover:text-blue-300 mb-2"
              >
                {showQuestions ? "Hide Questions" : "Show Questions"}
              </button>
              
              {showQuestions && (
                <div className="space-y-4 mt-2">
                  {importantQuestions.map((question, index) => (
                    <div 
                      key={index} 
                      className="border border-white/15 rounded-lg p-4 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleImportantQuestionClick(question.question)}
                    >
                      <h3 className="font-medium text-white/90 mb-2">Q{index + 1}: {question.question}</h3>
                      <p className="text-white/70 text-sm">{question.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-center w-full">
          <PlaceholdersAndVanishInput
            placeholders={["Hello", "How are you?", "What is your name?"]}
            onChange={(e) => setMessage(e.target.value)}
            onSubmit={handleSendChatMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
