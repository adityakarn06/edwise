import { Response } from 'express';
import { Queue } from "bullmq";
import { AuthenticatedRequest } from '../middleware/auth';

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

        // Add the upload job to the queue with user information
        await queue.add("process-pdf", {
            filename: req.file.originalname,
            destination: req.file.destination,
            filePath: req.file.path,
            userId: req.user.id,
            userEmail: req.user.email,
            userName: req.user.name,
        });

        return res.json({ 
            message: "File uploaded successfully",
            filename: req.file.originalname,
            user: req.user.name
        });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: "Upload failed" });
    }
}

export { uploadpdf };