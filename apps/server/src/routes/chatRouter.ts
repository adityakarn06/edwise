import express, { Router } from "express";
import { aiChatController, getChatHistoryController } from "../controller/chatController";

const chatRouter: Router = express.Router();

chatRouter.get("/ai", aiChatController);
chatRouter.get("/history", getChatHistoryController);

export default chatRouter;