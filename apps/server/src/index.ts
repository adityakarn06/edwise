import * as dotenv from 'dotenv';

dotenv.config();
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import uploadRouter from "./routes/uploadRoute";
import chatRouter from "./routes/chatRouter";
import mcqRouter from "./routes/mcqRouter";
import { createMulterUpload } from "./lib/multer";
import { authenticateToken } from "./middleware/auth";
import docRouter from './routes/docRouter';
import ImpQuesRouter from './routes/ImpQuesRouter';
import summaryRouter from './routes/summaryRoute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = createMulterUpload();

// Public routes
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});

// Protected routes
app.use('/upload', authenticateToken, upload.single('pdf'), uploadRouter);
app.use('/chat', authenticateToken, chatRouter);
app.use('/document', authenticateToken, docRouter);
app.use('/imp-ques', authenticateToken, ImpQuesRouter);
app.use('/summary', authenticateToken, summaryRouter);
app.use('/mcq', authenticateToken, upload.single('pdf'), mcqRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})