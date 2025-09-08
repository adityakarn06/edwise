import { Response } from 'express';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';
import { deleteFromCloudinary } from '../lib/cloudinary';

const prisma = new PrismaClient();

const docController = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    try {
        const documents = await prisma.uploadedDocs.findMany({
            where: { uploadedById: req.user?.id },
            orderBy: { createdAt: 'desc' }
        });

        return res.json(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
        return res.status(500).json({ error: "An error occurred while fetching documents." });
    }
};

const deleteDoc = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    const { docId } = req.params;
    try {
        const document = await prisma.uploadedDocs.findUnique({
            where: { id: docId }
        });

        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }

        if (document.uploadedById !== req.user.id) {
            return res.status(403).json({ error: "You do not have permission to delete this document." });
        }

        const urlParts = document.fileUrl.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = publicIdWithExtension?.split('.')[0];
        
        if (!publicId) {
            return res.status(400).json({ error: "Invalid file URL format" });
        }
        
        await deleteFromCloudinary(publicId, 'raw');

        await prisma.uploadedDocs.delete({
            where: { id: docId }
        });

        return res.json({ message: "Document deleted successfully." });
    } catch (error) {
        console.error("Error deleting document:", error);
        return res.status(500).json({ error: "An error occurred while deleting the document." });
    }
};

export { docController, deleteDoc };