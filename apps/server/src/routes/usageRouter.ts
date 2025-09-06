import express, { Router } from "express";
import { getUserUsage, resetDailyUsage } from "../controller/usageController";

const usageRouter: Router = express.Router();

usageRouter.get("/stats", getUserUsage);
usageRouter.post("/reset", resetDailyUsage);

export default usageRouter;