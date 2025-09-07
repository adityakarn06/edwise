import express, { Router } from "express";
import { 
    generateReferralCode, 
    getReferralStats, 
    withdrawCashReward,
    processReferral 
} from "../controller/referralController";
import { authenticateToken } from "../middleware/auth";

const referralRouter: Router = express.Router();

referralRouter.use(authenticateToken);

referralRouter.get("/code", generateReferralCode);
referralRouter.get("/stats", getReferralStats);
referralRouter.post("/process", processReferral);
referralRouter.post("/withdraw", withdrawCashReward);

export default referralRouter;