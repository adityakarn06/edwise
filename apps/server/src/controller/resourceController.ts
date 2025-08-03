import { Response } from 'express';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';

const prisma = new PrismaClient();

const resourceController = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    return res.status(200).json({ message: "Resource controller is working" });
};

export { resourceController };