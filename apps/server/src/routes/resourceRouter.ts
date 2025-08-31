import express, { Router } from "express";
import { getAllResourcesController, getResourceByIdController, uploadPdfController, deleteResourceController, reviewResourceController, updateMetadataOfPdf } from "../controller/resourceController";
import { createMulterUpload } from "../lib/multer";

const upload = createMulterUpload();
const resourceRouter: Router = express.Router();

resourceRouter.get("/", getAllResourcesController);
resourceRouter.post("/pdf", upload.single("pdf"), uploadPdfController);
resourceRouter.post("/pdf/metadata", updateMetadataOfPdf);
resourceRouter.get("/:id", getResourceByIdController);
resourceRouter.delete("/:id", deleteResourceController);
resourceRouter.put("/:id", reviewResourceController);

export default resourceRouter;