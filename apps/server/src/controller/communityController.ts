import { Response } from 'express';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';
import { CreateRoomSchema } from "@repo/common-zod/types"
import { uploadFileToCloudinary } from '../lib/cloudinary';
import fs from 'fs';

const prisma = new PrismaClient();

const createRoomController = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    try {
        const { slug, description } = req.body;
        
        if (!slug || !description) {
            return res.status(400).json({ error: "Room name and description are required" });
        }

        const userId = req.user.id;
        let thumbnailUrl = '';

        if (req.file) {
            try {
                const cloudinaryResult = await uploadFileToCloudinary(req.file.path, {
                    folder: `community-rooms/${userId}`,
                    resource_type: "image",
                });
                thumbnailUrl = cloudinaryResult.secure_url;

                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }
            } catch (uploadError) {
                console.error("Error uploading thumbnail:", uploadError);
                return res.status(500).json({ error: "Failed to upload thumbnail" });
            }
        }

        const room = await prisma.communityRoom.create({
            data: {
                slug: slug.trim(),
                adminId: userId,
                description: description.trim(),
                thumbnail: thumbnailUrl,
            }
        });

        res.status(200).json({
            roomId: room.id,
            slug: room.slug,
            description: room.description,
            thumbnail: room.thumbnail,
        });
    } catch (error: any) {
        console.error("Error creating room:", error);
        
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        if (error.code === 'P2002') {
            return res.status(400).json({ error: "Room name already exists" });
        }
        
        res.status(500).json({ error: "Failed to create room" });
    }
};

const joinRoomController = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    const { roomId } = req.body;

    if (!roomId) {
        return res.status(400).json({ error: "Room Slug is required" });
    }

    try {
        const room = await prisma.communityRoom.findUnique({
            where: { id: roomId },
            include: { members: true }
        });

        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        if (room.members.some(member => member.id === req.user?.id)) {
            return res.status(400).json({ error: "User already in the room" });
        }

        await prisma.communityRoom.update({
            where: { id: room.id },
            data: {
                members: {
                    connect: { id: req.user.id }
                }
            }
        });

        return res.status(200).json({ message: "Joined room successfully" });
    } catch (error: any) {
        console.error("Error joining room:", error);
        return res.status(500).json({ error: "An error occurred while joining the room.", errorDetails: error.message });
    }
};

const getUserRoomsController = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    try {
        const rooms = await prisma.communityRoom.findMany({
            where: {
                members: {
                    some: {
                    id: req.user.id
                    }
                }
            },
            include: {
                messages: {
                    orderBy: {
                        timestamp: 'desc'
                    },
                    take: 1
                }
            }
        });

        res.status(200).json(rooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ error: "An error occurred while fetching rooms." });
    }
};

const getRoomsExceptUserController = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    try {
        const rooms = await prisma.communityRoom.findMany({
            where: {
                NOT: {
                    members: {
                        some: {
                            id: req.user.id
                        }
                    }
                }
            }
        });
        res.status(200).json(rooms);
    } catch (error) {
        console.error("Error fetching rooms except user:", error);
        res.status(500).json({ error: "An error occurred while fetching rooms." });
    }
};

const getAllRoomsController = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    try {
        const rooms = await prisma.communityRoom.findMany();

        res.status(200).json(rooms);
    } catch (error) {
        console.error("Error fetching all rooms:", error);
        res.status(500).json({ error: "An error occurred while fetching all rooms." });
    }
};

const getRoomHistoryController = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    const { roomId } = req.params;

    if (!roomId) {
        return res.status(400).json({ error: "Room slug is required" });
    }

    try {
        const room = await prisma.communityRoom.findUnique({
            where: { id: roomId },
            include: { 
            messages: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatarUrl: true
                        }
                    }
                }
            } 
            }
        });

        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        res.status(200).json(room.messages);
    } catch (error) {
        console.error("Error fetching room history:", error);
        res.status(500).json({ error: "An error occurred while fetching room history." });
    }
};

export { createRoomController, getUserRoomsController, getAllRoomsController, joinRoomController, getRoomHistoryController, getRoomsExceptUserController };