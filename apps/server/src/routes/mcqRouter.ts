import express, { Router } from "express";
import { getMCQData, McqController, getMCQDocs } from "../controller/mcqController";
import { checkUsageLimit, UsageType } from "../middleware/usageTracking";

const mcqRouter: Router = express.Router();
import { createMulterUpload } from "../lib/multer";
const upload = createMulterUpload();

mcqRouter.post("/", checkUsageLimit(UsageType.MCQ_GENERATION), upload.single('pdf'), McqController);
mcqRouter.get("/data", getMCQData);
mcqRouter.get("/docs", getMCQDocs);

export default mcqRouter;