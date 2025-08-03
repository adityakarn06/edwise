import express, { Router } from "express";
import { getMCQData, McqController } from "../controller/mcqController";

const mcqRouter: Router = express.Router();
import { createMulterUpload } from "../lib/multer";
const upload = createMulterUpload();

mcqRouter.post("/", upload.single('pdf'), McqController);
mcqRouter.get("/data", getMCQData);

export default mcqRouter;