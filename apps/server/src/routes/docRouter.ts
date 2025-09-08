import express, { Router } from "express";
import { deleteDoc, docController } from "../controller/docController";

const docRouter: Router = express.Router();

docRouter.get("/", docController);
docRouter.delete("/:docId", deleteDoc);

export default docRouter;