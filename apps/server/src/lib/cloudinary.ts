import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export const uploadToCloudinary = async (file: File): Promise<CloudinaryUploadResult> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as CloudinaryUploadResult);
      }
    );

    uploadStream.end(buffer);
  });
};

export const uploadFileToCloudinary = async (filePath: string, options?: {
  folder?: string;
  resource_type?: "image" | "video" | "raw" | "auto";
}): Promise<CloudinaryUploadResult> => {
  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        resource_type: options?.resource_type || "auto",
        folder: options?.folder || "documents",
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as CloudinaryUploadResult);
        }
      }
    );
  });
};

export const deleteFromCloudinary = async (publicId: string, resourceType: "image" | "video" | "raw" | "auto" = "auto"): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: resourceType },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};