import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@repo/postgres-db/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const WebhookSecret = process.env.WEBHOOK_SECRET;

    if (!WebhookSecret) {
        throw new Error("Webhook secret is not configured");
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Missing required headers", { status: 400});
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WebhookSecret);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Webhook verification failed:", err);
        return new Response("Invalid webhook signature", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
        const { id, first_name, last_name, email_addresses, image_url } = evt.data;

        if (!id || !email_addresses) {
            return new Response("User ID or email is missing", { status: 400 });
        }
   
        const fullName = first_name && last_name ? `` : null;
        (image_url ? { image_url: image_url } : {});
        const email_address = email_addresses[0]?.email_address;

        try {
            await prisma.user.create({
                data: {
                    id,
                    name: fullName,
                    email: email_address,
                    avatarUrl: image_url,
                }
            });
            return new Response("User created successfully", { status: 200 });
        } catch (error) {
            console.error("Error creating user:", error);
            return new Response("Error creating user", { status: 500 });
        }
    }
    else if (eventType === "user.deleted") {
        const userId = evt.data.id;

        if (!userId) {
            return new Response("User ID is missing", { status: 400 });
        }

        try {
            await prisma.user.delete({
                where: { id: userId },
            });
            return new Response("User deleted successfully", { status: 200 });
        } catch (err) {
            console.error("Error deleting user:", err);
            return new Response("Error deleting user", { status: 500 });
        }
    }
    else if (eventType === "user.updated") {
        const { id, first_name, last_name, email_addresses, image_url } = evt.data;

        if (!id || !email_addresses) {
            return new Response("User ID or email is missing", { status: 400 });
        }
   
        const fullName = first_name && last_name ? `` : null;
        (image_url ? { image_url: image_url } : {});
        const email_address = email_addresses[0]?.email_address;

        try {
            await prisma.user.update({
                where: {
                    id
                },
                data: {
                    id,
                    name: fullName,
                    email: email_address,
                    avatarUrl: image_url,
                }
            })
            return new Response("User updated successfully", { status: 200 });
        } catch (err) {
            console.error("Error updating user:", err);
            return new Response("Error updating user", { status: 500 });
        }
    }

    return new Response("Webhook receive success", {status: 200});
}