import { Response } from 'express';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';
import { CreateRoomSchema } from "@repo/common-zod/types"

const prisma = new PrismaClient();

const createRoomController = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
          msg: "incorrect inputs"
        })
        return;
    }

    const userId = req.user.id;

    try {
        const room = await prisma.communityRoom.create({
          data: {
              slug: parsedData.data.slug,
              adminId: userId,
          }
        })
    
        res.status(200).json({
            roomId: room.id
        })
    } catch (error) {
        res.json({
            msg: "room need to be unique"
        })
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
            }
        });

        res.status(200).json(rooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
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

    const { slug } = req.params;

    if (!slug) {
        return res.status(400).json({ error: "Room slug is required" });
    }

    try {
        const room = await prisma.communityRoom.findUnique({
            where: { slug },
            include: { messages: true }
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

export { createRoomController, getUserRoomsController, getAllRoomsController, joinRoomController, getRoomHistoryController };