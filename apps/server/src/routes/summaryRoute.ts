import express, { Router } from "express";
import { summaryController } from "../controller/summaryController";

const summaryRouter: Router = express.Router();

summaryRouter.post("/", summaryController);

export default summaryRouter;