import express, { Router } from "express";
import { summaryController } from "../controller/summaryController";
import { checkUsageLimit, UsageType } from "../middleware/usageTracking";

const summaryRouter: Router = express.Router();

summaryRouter.post("/", checkUsageLimit(UsageType.SUMMARY_GENERATION), summaryController);

export default summaryRouter;