import { Request, Response } from 'express';
import { Queue } from "bullmq";

const queue = new Queue("file-upload-queue", {
    connection: {
        host: 'localhost',
        port: 6379
    }
});

const uploadpdf = async (req: Request, res: Response) => {
    await queue.add("process-pdf", JSON.stringify({
        filename: req.file?.originalname,
        destination: req.file?.destination,
        filePath: req.file?.path,
    }));
    return res.json({ message: "uploaded" })
}

export { uploadpdf };