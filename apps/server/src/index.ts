import express from "express";
import cors from 'cors';
import { createMulterUpload } from "./lib/multer";
import uploadRouter from "./routes/uploadRoute";
import chatRouter from "./routes/chatRouter";
import { PrismaClient } from "@repo/postgres-db/client";

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = createMulterUpload();

app.post("/test", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      id: "123456",
      name: "Test User 2",
      email: "test1@gmail.com",
      avatarUrl: "",
    },
  })
  res.status(200).json({ message: "Test endpoint hit successfully", user });
});

app.use('/upload', upload.single('pdf'), uploadRouter);
app.use('/chat', chatRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})