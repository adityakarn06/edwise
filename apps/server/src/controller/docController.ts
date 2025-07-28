import { Response } from 'express';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';

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

export { docController };