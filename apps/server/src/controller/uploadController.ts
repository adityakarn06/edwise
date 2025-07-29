import { Response } from 'express';
import { Queue } from "bullmq";
import { AuthenticatedRequest } from '../middleware/auth';
import { PrismaClient } from "@repo/postgres-db/client";
import fs from 'fs';
import { uploadFileToCloudinary } from '../lib/cloudinary';

const prisma = new PrismaClient();

const queue = new Queue("file-upload-queue", {
    connection: {
        host: 'localhost',
        port: 6379
    }
});

const uploadpdf = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ error: "Only PDF files are allowed" });
        }

        // Add the upload job to the queue with user information
        await queue.add("process-pdf", {
            filename: req.file.originalname,
            destination: req.file.destination,
            filePath: req.file.path,
            userId: req.user.id,
            userEmail: req.user.email,
            userName: req.user.name,
        });

        try {
            console.log("started")
            // Upload to Cloudinary
            const cloudinaryResult = await uploadFileToCloudinary(req.file.path, {
                folder: `pdfs/${req.user.id}`, // Organize by user ID
                resource_type: "auto"
            });
            console.log("saving to db")

            const document = await prisma.uploadedDocs.create({
                data: {
                    fileName: req.file.originalname,
                    fileUrl: cloudinaryResult.secure_url,
                    uploadedById: req.user.id,
                    fileSize: req.file.size,
                    fileType: req.file.mimetype,
                }
            });
            console.log("done")

            // Remove file from server after successful upload
            // fs.unlinkSync(req.file.path);

            return res.json({ 
                message: "File uploaded successfully to Cloudinary",
                filename: req.file.originalname,
                user: req.user.name,
                documentId: document.id,
                fileUrl: cloudinaryResult.secure_url
            });
            
        } catch (cloudinaryError) {
            console.error('Cloudinary upload error:', cloudinaryError);
            
            // Clean up local file if Cloudinary upload fails
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            
            return res.status(500).json({ 
                error: "Failed to upload to Cloudinary",
                details: cloudinaryError instanceof Error ? cloudinaryError.message : "Unknown error"
            });
        }

    } catch (error) {
        console.error('Upload error:', error);
        
        // Clean up local file if any error occurs
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        return res.status(500).json({ error: "Upload failed" });
    }
}

export { uploadpdf };