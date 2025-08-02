import { Response } from "express";
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from "../middleware/auth";
import { llm } from "../services/llm";
import { extractTextFromPDF } from "../services/getPdfText";
import { uploadFileToCloudinary } from "../lib/cloudinary";

const prisma = new PrismaClient();

const McqController = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  if (req.file.mimetype !== "application/pdf") {
    return res.status(400).json({ error: "Only PDF files are allowed" });
  }

  // upload the file to Cloudinary
  try {
    const cloudinaryResult = await uploadFileToCloudinary(req.file.path, {
      folder: `pdfs/${req.user.id}`,
      resource_type: "auto",
    });

    const fileUrl = cloudinaryResult.secure_url;

    const extractedText = await extractTextFromPDF(fileUrl);
    if (!extractedText) {
      return res.status(500).json({ error: "Failed to extract text from PDF" });
    }

    const query = `
            You are an expert in generating MCQ for students.

            You are an expert in generating MCQs for students.

            Given the following content, generate  multiple choice questions.
            Include 4 options and indicate the correct answer clearly.

            Content:
            ${extractedText}

            Format your response as a JSON object with the following structure:
            {
                "mcqs": [
                    {
                    "question": "question text here",
                    "options": ["A", "B", "C", "D"],
                    "answer": "B"
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

    const MCQs = JSON.parse(jsonText);

    return res.json({
      MCQs: MCQs.mcqs.map((mcq: any) => ({
        question: mcq.question,
        options: mcq.options,
        answer: mcq.answer,
      })),
    });
  } catch (error) {
    console.error("Error in McqController:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

export { McqController };