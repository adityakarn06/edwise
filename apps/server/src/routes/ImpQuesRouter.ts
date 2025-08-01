import express, { Router } from "express";
import { ImpQuesController } from "../controller/ImpQuesController";

const ImpQuesRouter: Router = express.Router();

ImpQuesRouter.post("/", ImpQuesController);

export default ImpQuesRouter;