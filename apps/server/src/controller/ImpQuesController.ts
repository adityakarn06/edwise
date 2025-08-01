import { Response } from 'express';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';
import { llm } from '../services/llm';
import { extractTextFromPDF } from '../services/getPdfText';

const prisma = new PrismaClient();

const ImpQuesController = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    const fileUrl = req.body.fileUrl;
    if (!fileUrl || typeof fileUrl !== 'string') {
        return res.status(400).json({ error: "Document ID is required" });
    }
    
    try {
        const document = await prisma.uploadedDocs.findFirst({
            where: {
                fileUrl: fileUrl
            }
        });

        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }

        const url = document.fileUrl;

        const extractedText = await extractTextFromPDF(url)
        if (!extractedText) {
            return res.status(500).json({ error: "Failed to extract text from PDF" });
        }

        const query = `
            You are an expert in generating Important Question to study for exam for students.

            Given the following content, generate 5 important questions that can be asked in exam.
            Please ensure the questions are clear, concise, and relevant to the content provided.
            Also provide the answer to each question in detail and simple words.

            Content:
            ${extractedText}

            Format your response as a JSON object with the following structure:
            {
                "questions": [
                    {
                        "question": "Question text here",
                        "answer": "Detailed answer here"
                    },
                    ...
                ]
            }
            `;

        const response = await llm.invoke(query);
        if (!response || !response.text) {
            return res.status(500).json({ error: "No response from the LLM." });
        }
        
        let jsonText = response.text;
        const jsonMatch = response.text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
            jsonText = jsonMatch[1] || response.text;
        }

        const importantQuesWithAns = JSON.parse(jsonText);
        // if (req.user?.id) {
        // CREATE AND SAVE TO IMP QUEST MODEL
        //     try {
        //         await prisma.aiChatHistory.create({
        //             data: {
        //                 userId: req.user.id,
        //                 userQuery: 'Important Questions',
        //                 resourceId: document.id,
        //                 response: importantQuesWithAns,
        //                 sources: [document.fileName],
        //                 timestamp: new Date()
        //             },
        //         });
        //     } catch (error) {
        //         console.error("Error saving chat history:", error);
        //     }
        // }
        return res.json({
            importantQuestions: importantQuesWithAns.questions.map((q: any) => ({
                question: q.question,
                answer: q.answer
            }))
        });
    } catch (error) {
        console.error("Error in ImpQuesController:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
};

export { ImpQuesController };