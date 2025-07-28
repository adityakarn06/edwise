import express, { Router } from "express";
import { docController } from "../controller/docController";

const docRouter: Router = express.Router();

docRouter.get("/", docController);

export default docRouter;