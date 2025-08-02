import { Response } from 'express';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';
import { llm } from '../services/llm';
import { extractTextFromPDF } from '../services/getPdfText';

const prisma = new PrismaClient();

const summaryController = async (req: AuthenticatedRequest, res: Response) => {
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
            You are an expert in generating summary from a given content for students.

            Given the following content, generate a summary that summarizes the whole content.
            Please ensure the summary are clear, concise, and relevant to the content provided.

            Content:
            ${extractedText}

            Format your response as a JSON object with the following structure:
            {
                "summary": [
                    {
                        "section": "Section title here"
                        "text": "Summary text here",
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

        const summary = JSON.parse(jsonText);
        return res.json({
            summary: summary.summary.map((s: any) => ({
                section: s.section,
                text: s.text
            }))
        });
    } catch (error) {
        console.error("Error in SummaryController:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
};

export { summaryController };