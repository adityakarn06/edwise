import express, { Router } from "express";
import { aiChatController, getChatHistoryController } from "../controller/chatController";
import { checkUsageLimit, UsageType } from "../middleware/usageTracking";

const chatRouter: Router = express.Router();

chatRouter.post("/ai", checkUsageLimit(UsageType.CHAT_MESSAGE), aiChatController);
chatRouter.get("/history", getChatHistoryController);

export default chatRouter;