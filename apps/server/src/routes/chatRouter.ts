import express, { Router } from "express";
import { chatController } from "../controller/chatController";

const chatRouter: Router = express.Router();

chatRouter.get("/", chatController);

export default chatRouter;