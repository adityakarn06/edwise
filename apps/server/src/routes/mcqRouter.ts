import express, { Router } from "express";
import { McqController } from "../controller/mcqController";

const mcqRouter: Router = express.Router();

mcqRouter.post("/", McqController);

export default mcqRouter;