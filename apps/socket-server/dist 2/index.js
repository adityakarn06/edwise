"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const client_1 = require("@repo/postgres-db/client");
const prisma = new client_1.PrismaClient();
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 3002;
if (!NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET environment variable is required');
}
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: FRONTEND_URL,
    credentials: true,
}));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: FRONTEND_URL,
        credentials: true
    }
});
const parseCookies = (cookieHeader) => {
    const cookies = {};
    if (!cookieHeader)
        return cookies;
    cookieHeader.split(';').forEach(cookie => {
        const [name, ...rest] = cookie.trim().split('=');
        if (name && rest.length > 0) {
            cookies[name] = rest.join('=');
        }
    });
    return cookies;
};
const validateSessionWithNextAuth = async (sessionToken) => {
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
    }
    catch (error) {
        console.error('Session validation failed:', error);
        return null;
    }
};
async function getRoomById(roomId) {
    try {
        const room = await prisma.communityRoom.findUnique({
            where: { id: roomId },
            include: { members: true }
        });
        if (!room)
            return null;
        return { id: room.id, users: room.members.map(member => member.id) };
    }
    catch (error) {
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
            image: session.user.image || '',
        };
        if (!user.id) {
            return next(new Error("Invalid user data"));
        }
        socket.user = user;
        next();
    }
    catch (error) {
        console.error('Authentication failed:', error);
        return next(new Error("Authentication failed"));
    }
});
io.on("connection", (socket) => {
    const user = socket.user;
    console.log(`User connected: ${user.id}`);
    prisma.user.update({
        where: { id: user.id },
        data: { status: 'ONLINE' }
    }).catch(err => console.error('Error updating user status on connect:', err));
    socket.on("join_room", async (roomId) => {
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
    socket.on("send_message", async ({ roomId, message }) => {
        try {
            const room = await getRoomById(roomId);
            if (!room) {
                socket.emit("error_message", "Room not found");
                return;
            }
            if (!room.users.includes(user.id)) {
                socket.emit("error_message", "Not authorized to send message to this room");
                return;
            }
            if (!message || message.trim() === "") {
                socket.emit("error_message", "Message cannot be empty");
                return;
            }
            const savedMessage = await prisma.message.create({
                data: {
                    roomId,
                    userId: user.id,
                    message,
                    timestamp: new Date()
                }
            });
            io.to(roomId).emit("receive_message", {
                sender: user.id,
                message,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatarUrl: user.image,
                },
                timestamp: new Date(),
                messageId: savedMessage.id
            });
        }
        catch (error) {
            console.error('Error saving message:', error);
            socket.emit("error_message", "Failed to save message");
        }
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${user.id}`);
        prisma.user.update({
            where: { id: user.id },
            data: { status: 'OFFLINE' }
        }).catch(err => console.error('Error updating user status on disconnect:', err));
    });
});
server.listen(PORT, () => {
    console.log(`Socket.io server running on port ${PORT}`);
});
