import * as dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { PrismaClient } from "@repo/postgres-db/client";

const prisma = new PrismaClient();

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';
const PORT = process.env.PORT || 3002;

if (!NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET environment variable is required');
}

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true
  }
});

const parseCookies = (cookieHeader: string): Record<string, string> => {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.trim().split('=');
    if (name && rest.length > 0) {
      cookies[name] = rest.join('=');
    }
  });
  
  return cookies;
};

const validateSessionWithNextAuth = async (sessionToken: string): Promise<any> => {
  try {
      const response = await fetch(`${FRONTEND_URL}/api/auth/session`, {
          headers: {
              'Cookie': `next-auth.session-token=${sessionToken}; __Secure-next-auth.session-token=${sessionToken}`,
              'Content-Type': 'application/json'
          }
      });
      
      if (response.ok) {
          const session = await response.json();
          return session.user ? session : null;
      }
      return null;
  } catch (error) {
      console.error('Session validation failed:', error);
      return null;
  }
};

async function getRoomById(roomId: string) {
  try {
    const room = await prisma.communityRoom.findUnique({
      where: { id: roomId },
      include: { members: true }
    })
    if (!room) return null;
    return { id: room.id, users: room.members.map(member => member.id)}
  } catch (error) {
    console.error('Error fetching room by slug:', error);
    return null;
  }
}

io.use(async (socket, next) => {
  try {
    const rawCookie = socket.handshake.headers.cookie;

    if (!rawCookie) {
      return next(new Error("No cookie found"));
    }
  
    const parsed = parseCookies(rawCookie);
    const token = parsed["next-auth.session-token"] || parsed["__Secure-next-auth.session-token"];
  
    if (!token) {
      return next(new Error("No token in cookie"));
    }
  
    const session = await validateSessionWithNextAuth(token);
  
    if (!session || !session.user) {
      console.log('Session validation failed');
      return next(new Error("No session found"));
    }
  
    const user = {
      id: session.user.id,
      name: session.user.name || '',
      email: session.user.email || '',
      image: session.user.image || ''
    };
  
    if (!user.id) {
      return next(new Error("Invalid user data"));
    }
  
    (socket as any).user = user;
    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    return next(new Error("Authentication failed"));
  }
});

io.on("connection", (socket: Socket) => {
  const user = (socket as any).user;
  console.log(`User connected: ${user.id}`);

  socket.on("join_room", async (roomId: string) => {
    console.log(`User ${user.id} joining room: ${roomId}`);
    const room = await getRoomById(roomId);

    if (!room) {
      socket.emit("error_message", "Room not found");
      return;
    }

    if (!room.users.includes(user.id)) {
      socket.emit("error_message", "Not authorized to join this room");
      return;
    }

    socket.join(room.id);
    console.log(`User ${user.id} joined room ${room.id}`);
  });

  socket.on("send_message", ({ roomId, message }: { roomId: string, message: string }) => {
    try {
      const saveChat = async () => {
        await prisma.message.create({
          data: {
            roomId,
            userId: user.id,
            message,
          }
        })
      }
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit("error_message", "Failed to save message");
      return;
    }
    io.to(roomId).emit("receive_message", {
      sender: user.id,
      message,
      timestamp: new Date()
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${user.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
