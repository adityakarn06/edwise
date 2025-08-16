import { z } from "zod";

export const CreateRoomSchema = z.object({
    slug: z.string().min(3).max(20)
});