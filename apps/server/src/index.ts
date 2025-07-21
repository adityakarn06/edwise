import express from "express";
import cors from 'cors';
import { createMulterUpload } from "./config/multer";
import uploadRouter from "./routes/uploadRoute";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = createMulterUpload();

app.use('/upload', upload.single('pdf'), uploadRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})