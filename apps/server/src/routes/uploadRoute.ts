import express, { Router } from "express";
import { uploadpdf } from "../controller/uploadController";

const uploadRouter: Router = express.Router();

uploadRouter.post("/pdf", uploadpdf);

export default uploadRouter;