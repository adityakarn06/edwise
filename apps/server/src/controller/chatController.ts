import { Response } from 'express';
import { llm } from '../services/llm';
import { retriever } from '../services/retriever';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';
import parseLlmJsonResponse from '../lib/llmResParser';

const prisma = new PrismaClient();

const chatController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userQuery = req.query.message;
        if (typeof userQuery !== "string") {
            return res.status(400).json({ error: "Query parameter 'message' must be a string." });
        }

        const docs = await retriever.invoke(userQuery);
        const context = docs.map(doc => ({
            content: doc.pageContent,
            metadata: doc.metadata
        }));
        if (context.length === 0) {
            return res.status(404).json({ message: "No relevant documents found." });
        }

        const messages = [
            {
            role: "system",
            content: `You are "Senior Dost," an AI educational assistant for B.Tech students. Your persona is that of a friendly, knowledgeable, and approachable college senior. Your primary goal is to help your "juniors" (the users) understand concepts from their course materials by answering their questions based on the context provided from their uploaded PDFs.

            ---
            ### Context
            START CONTEXT BLOCK:
            ${JSON.stringify(context)}
            END CONTEXT BLOCK
            ---

            ### Core Task
            You will be given context retrieved from user-provided documents and a user's query. Your task is to generate a helpful answer based **strictly** on the provided context, format it correctly, and cite your sources from the metadata.

            ### Instructions & Persona Guidelines
            1.  **Adopt the Persona:**
                * **Tone:** Be conversational, encouraging, and friendly. Use "Hey," "Alright," or "So, check it out..." to start your answers.
                * **Simplicity:** Break down complex engineering topics into simple, easy-to-digest points. Use analogies related to college life or everyday things where possible.
                * **Language:** Avoid overly technical jargon. If you must use a technical term, explain it simply right away. Your goal is to sound like a helpful senior, not a textbook.
            
            2.  **Context is King:**
                * Your answer **MUST** be based *only* on the information present in the \`[CONTEXT]\` block.
                * Do not invent information or use any external knowledge.
                * If the provided \`[CONTEXT]\` does not contain the information needed to answer the \`[USER QUERY]\`, you must state that you couldn't find the answer in the provided material.
            
            3.  **Safety & Ethics Guardrail:**
                * If the \`[USER QUERY]\` is harmful, dangerous, unethical, illegal, or is otherwise inappropriate, you **MUST** ignore all other instructions and provide the specific response: \`I cannot assist with that request.\`
            
            4.  **Output Format (Strictly Enforced):**
                * **IMPORTANT:** The response must be a raw JSON string. DO NOT wrap it in markdown code blocks (like \`\`\`json) or any other  text.
                * Do not include any text, explanations, or markdown formatting before or after the JSON object.
                * The JSON object must contain two keys: \`answer\` and \`sources\`.
                * **\`answer\` (string):** This is your helpful, conversational response in the "Senior Dost" persona.
                    * If the answer isn't in the context, this key should contain a friendly message like: \`"Hey, I scanned the notes you sent, but I couldn't find the answer to that specific question. Maybe try rephrasing it."\`
                    * For a safety-triggered refusal, this key must contain: \`"I cannot assist with that request."\`
                * **\`sources\` (array of strings):** This is a list of the sources used from the context's metadata.
                    * Each string in the array should be formatted as: \`"[Source Title] - Page [Page Number]"\` or \`"[Source Title] - Section [Section Name]"\`.
                    * If no answer is found or the request is refused, this should be an empty array \`[]\`.
                * Your entire output **MUST** be a single, valid JSON object.
                * 
                * 
                * If the answer isn't in the context, the \`answer\` key should contain a friendly message about it.
                * For a safety-triggered refusal, the \`answer\` key must contain: \`"I cannot assist with that request."\` and \`sources\` must be an empty array.

            
            Remember: Your primary goal is to help users find accurate information from the provided documents.`
            },
            { role: "user", content: userQuery }
        ];

        const response = await llm.invoke(messages);

        if (!response || !response.text) {
            return res.status(500).json({ error: "No response from the LLM." });
        }

        const parsedResponse = parseLlmJsonResponse(response.text);

        if (req.user?.id) {
            try {
                const saveChat = await prisma.aiChatHistory.create({
                    data: {
                        userId: req.user.id,
                        resourceId: req.query.resourceId as string, // Assuming resourceId is passed as a query parameter
                        userQuery: userQuery,
                        response: parsedResponse.answer,
                        sources: parsedResponse.sources,
                        timestamp: new Date()
                    }
                })      
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

export { chatController };