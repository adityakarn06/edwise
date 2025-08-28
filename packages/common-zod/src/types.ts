import { z } from "zod";

export const CreateRoomSchema = z.object({
    slug: z.string().min(3).max(50),
    description: z.string().min(10).max(200),
    thumbnail: z.instanceof(File).optional(),
    privacy: z.enum(["public", "private"]).default("public"),
});