import { Response } from 'express';
import { llm } from '../services/llm';
import { retriever } from '../services/retriever';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';
import parseLlmJsonResponse from '../lib/llmResParser';
import { createEmbedding } from '../lib/createEmbeddings';
import getChatSystemPrompt from '../config/chatSystemPrompt';

const prisma = new PrismaClient();

export enum ChatMode {
    DOCUMENT = "document",
    AI = "ai"
}

const aiChatController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Invalid request" });
        }
        if (!req.body.message || !req.body.fileUrl || !req.body.mode) {
            return res.status(400).json({ error: "Body parameters 'message' and 'fileUrl' are required." });
        }
        if (!req.body.mode || (req.body.mode !== ChatMode.DOCUMENT && req.body.mode !== ChatMode.AI)) {
            return res.status(400).json({ error: "Invalid mode. Must be 'document' or 'ai'." });
        }
        const userQuery = req.body.message;
        const fileUrl = req.body.fileUrl;
        const mode: ChatMode = req.body.mode;

        if (typeof userQuery !== "string" || typeof fileUrl !== "string") {
            return res.status(400).json({ error: "Query parameter must be a string." });
        }

        const embeddings = await createEmbedding(userQuery);
        if (!embeddings || embeddings.length === 0) {
            return res.status(500).json({ error: "Failed to create embeddings." });
        }

        const getFileNameFromDb = async () => {
                try {
                    const data = await prisma.uploadedDocs.findFirst({
                        where: {
                            uploadedById: req.user?.id,
                            fileUrl: fileUrl
                        },
                        select: {
                            fileName: true,
                        }
                    })
                    return data?.fileName;    
                } catch (error) {
                    console.error("Error fetching file name:", error);
                    return null;
                }
        }
            
        const fileName = await getFileNameFromDb();
        if (!fileName) {
            return res.status(404).json({ error: "No file found for the user." });
        }

        const matches = await retriever(embeddings, fileName);

        // filter matches to ensure they have a score above a threshold
        // const relevantDocs = matches.filter(match => match.score && match.score > 0.7)

        type metadataType = {
            text: string;
            pageNumber: number;
        };

        const getContext = () => {
            let docs = matches.map(match => (match.metadata as metadataType).text)
            return docs.join('\n').substring(0, 3000); // limit to 3000 characters
        }

        const context = getContext();

        const systemPrompt = getChatSystemPrompt(mode, context, userQuery);

        if (!systemPrompt) {
            return res.status(500).json({ error: "Failed to generate system prompt." });
        }

        const response = await llm.invoke(systemPrompt);

        if (!response || !response.text) {
            return res.status(500).json({ error: "No response from the LLM." });
        }

        const parsedResponse = parseLlmJsonResponse(response.text);

        if (req.user?.id) {
            try {
                const saveChat = await prisma.aiChatHistory.create({
                    data: {
                        userId: req.user.id,
                        userQuery: userQuery,
                        response: parsedResponse.answer,
                        sources: parsedResponse.sources[0] ? parsedResponse.sources : [],
                        timestamp: new Date()
                    },
                });
            } catch (error) {
                console.error("Error saving chat history:", error);
            }
        }

        return res.json({
            message: parsedResponse.answer,
            sources: parsedResponse.sources.map((source: string) => {
                const [title, section] = source.split(" - ");
                return {
                    title,
                    section: section || "N/A"
                };
            })
        });
    } catch (error) {
        console.error("Error in chat endpoint:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
};

const getChatHistoryController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const chatHistory = await prisma.aiChatHistory.findMany({
            where: { userId },
            orderBy: { timestamp: 'asc' }
        });

        return res.json({
            history: chatHistory.map(chat => ({
                id: chat.id,
                userQuery: chat.userQuery,
                response: chat.response,
                sources: chat.sources,
                timestamp: chat.timestamp
            }))
        });
    } catch (error) {
        console.error("Error fetching chat history:", error);
        return res.status(500).json({ error: "An error occurred while fetching chat history." });
    }
}

export { aiChatController, getChatHistoryController };