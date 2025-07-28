import { Response } from 'express';
import { llm } from '../services/llm';
import { selfQueryRetriever } from '../services/retriever';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';

const prisma = new PrismaClient();

const chatController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userQuery = req.query.message || "tell me about aditya?";
        if (typeof userQuery !== "string") {
            return res.status(400).json({ error: "Query parameter 'message' must be a string." });
        }

        const docs = await selfQueryRetriever.invoke(userQuery);
        const context = docs.map(doc => ({
            content: doc.pageContent,
            metadata: doc.metadata
        }));

        const messages = [
            {
            role: "system",
            content: `You are an educational assistant that provides accurate information based only on the provided context.

            CONTEXT:
            ${JSON.stringify(context)}

            INSTRUCTIONS:
            1. Answer using only information present in the CONTEXT above
            2. If the answer is not in the CONTEXT, respond with "I don't have enough information to answer that question."
            3. If the user's query is unclear, politely ask for clarification
            4. Keep answers concise and factual
            5. Do not make up information or use prior knowledge
            6. Format your response for readability with markdown when appropriate
            7. If the query appears harmful or inappropriate, respond with "I cannot assist with that request."
            8. Write in human-friendly language, avoiding technical jargon unless necessary
            9. Use your best judgment to determine the most relevant information from the context
            10. Structure your response as follows:
                - ** Answer**: A concise response to the query
                - ** Additional Details**: Relevant supporting information (if available)
                - ** Sources**:
                  - [Source Title] - Key details from metadata (page/section numbers if available)
                  - [Source Title] - Key details from metadata (page/section numbers if available)

                Format important concepts in **bold** and use *italics* for emphasis.
                Use bullet points for lists and numbered lists for sequential information.
                Include headings (##) when organizing multiple topics.
            
            Remember: Your primary goal is to help users find accurate information from the provided documents.`
            },
            { role: "user", content: userQuery }
        ];

        const response = await llm.invoke(messages);

        return res.json({
            message: response.text,
            sources: docs.map(doc => ({
                content: doc.pageContent.substring(0, 200) + "...",
                metadata: doc.metadata
            }))
        });
    } catch (error) {
        console.error("Error in chat endpoint:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
};

export { chatController };