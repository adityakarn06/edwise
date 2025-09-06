import express, { Router } from "express";
import { ImpQuesController } from "../controller/ImpQuesController";
import { checkUsageLimit, UsageType } from "../middleware/usageTracking";

const ImpQuesRouter: Router = express.Router();

ImpQuesRouter.post("/", checkUsageLimit(UsageType.IMP_QUESTIONS_GENERATION), ImpQuesController);

export default ImpQuesRouter;