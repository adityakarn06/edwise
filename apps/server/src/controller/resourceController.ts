import { Response } from "express";
import { PrismaClient, status } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from "../middleware/auth";
import { uploadFileToCloudinary } from "../lib/cloudinary";
import fs from "fs";

const prisma = new PrismaClient();

const uploadPdfController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }
    try {
      const cloudinaryResult = await uploadFileToCloudinary(req.file.path, {
        folder: `pdfs/${req.user.id}`, // Organize by user ID
        resource_type: "auto",
      });

      const document = await prisma.resource.create({
        data: {
            uploadedById: req.user.id,
            fileName: req.file.originalname,
            fileURL: cloudinaryResult.secure_url,
            fileSize: req.file.size,
            fileType: req.file.mimetype,
            status: "UPLOADED",
            createdAt: new Date(),
        },
      });

      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.json({
        message: "File uploaded successfully to Object Storage",
        filename: req.file.originalname,
        user: req.user.name,
        documentId: document.id,
        fileUrl: cloudinaryResult.secure_url,
      });
    } catch (cloudinaryError) {
      console.error("Cloudinary upload error:", cloudinaryError);

      return res.status(500).json({
        error: "Failed to upload to Object Storage",
        details:
          cloudinaryError instanceof Error
            ? cloudinaryError.message
            : "Unknown error",
      });
    }
  } catch (error) {
    console.error("Upload error:", error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({ error: "Upload failed" });
  }
};

const updateMetadataOfPdf = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        if (!req.body) {
          return res.status(400).json({ error: "No data provided" });
        }
    
        if (!req.user) {
          return res.status(401).json({ error: "User not authenticated" });
        }

        if (!req.body.title || !req.body.description || !req.body.fileUrl) {
            return res.status(400).json({ error: "Missing required data: title, description, and fileUrl are required"});
        }

        if (req.body.tags && !Array.isArray(req.body.tags)) {
            return res.status(400).json({ error: "Tags must be an array" });
        }

        const existingResource = await prisma.resource.findFirst({
            where: {
                uploadedById: req.user.id,
                fileURL: req.body.fileUrl
            }
        });

        if (!existingResource) {
            return res.status(404).json({ error: "Resource not found" });
        }

        const document = await prisma.resource.update({
            where: {
                id: existingResource.id
            },
            data: {
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags,
                status: "PENDING"
            }
        });
    
          return res.json({
            message: "File uploaded successfully",
            document: document.id,
            status: "PENDING"
          });

    } catch (error) {
        console.error("error while updating resource metadata", error)
    }
}

const getAllResourcesController = async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    try {
        const resources = await prisma.resource.findMany({
            where: {
                status: status.APPROVED
            }
        });

        res.status(200).json(resources);
    } catch (error) {
        console.error("error while getting all resources", error);
    }
};
  
const getResourceByIdController = async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const resourceId = req.params.id;
    if (!resourceId) {
      return res.status(400).json({ error: "Resource ID is required" });
    }   
    try {
      const resource = await prisma.resource.findUnique({
        where: { id: resourceId },
      });

      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }

      return res.status(200).json(resource);
    } catch (error) {
      console.error("Error fetching resource:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteResourceController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    const resourceId = req.params.id;
    if (!resourceId) {
        return res.status(400).json({ error: "Resource ID is required" });
    }
    try {
        const resource = await prisma.resource.findUnique({
            where: { id: resourceId },
        });
        if (!resource) {
            return res.status(404).json({ error: "Resource not found" });
        }
        // Delete the resource from the database
        await prisma.resource.delete({
            where: { id: resourceId },
        });

        
        return res.status(200).json({ message: "deleted resource successfully", resourceId });
    } catch (error) {
        console.error("Error deleting resource:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const reviewResourceController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    const resourceId = req.params.id;
    if (!resourceId) {
        return res.status(400).json({ error: "Resource ID is required" });
    }
    try {
        const resource = await prisma.resource.findUnique({
            where: { id: resourceId },
        });
        if (!resource) {
            return res.status(404).json({ error: "Resource not found" });
        }

        const updatedResource = await prisma.resource.update({
            where: { id: resourceId },
            data: {
                status: req.body.status || status.APPROVED,
            },
        });

        return res.status(200).json({ message: "Resource reviewed successfully", resource: updatedResource });
    } catch (error) {
        console.error("Error reviewing resource:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export {
  uploadPdfController,
  updateMetadataOfPdf,
  getAllResourcesController,
  getResourceByIdController,
  deleteResourceController,
  reviewResourceController,
};
