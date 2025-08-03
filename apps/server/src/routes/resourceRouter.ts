import express, { Router } from "express";
import { resourceController } from "../controller/resourceController";

const resourceRouter: Router = express.Router();

resourceRouter.get("/", resourceController);
resourceRouter.post("/pdf", resourceController);
resourceRouter.post("/video", resourceController);

export default resourceRouter;