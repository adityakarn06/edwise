import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string;
            email?: string;
        } & DefaultSession["user"];
        accessToken?: JWT;
    }
    interface User {
        id?: string;
        name?: string;
        email?: string;
        avatarUrl?: string;
        role?: "STUDENT" | "ADMIN";
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        name?: string;
        email?: string;
        accessToken?: JWT;
    }
}