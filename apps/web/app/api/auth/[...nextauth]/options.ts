import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { PrismaClient } from "@repo/postgres-db/client";
const prisma = new PrismaClient();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id : "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Email and password are required");
                }
                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });
                    if (!user) {
                        throw new Error("User not found");
                    }
                    
                    if (!user.password) {
                        throw new Error("Password not set for this user. Please sign in with Google.");
                    }
                    
                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isValidPassword) {
                        throw new Error("Invalid password");
                    }

                    return { 
                        id: user.id, 
                        name: user.name, 
                        email: user.email,
                        image: user.avatarUrl 
                    };
                } catch (error) {
                    console.error("Error during authorization:", error);
                    throw new Error(error instanceof Error ? error.message : "Authorization failed");
                }
            }
        }),
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: "/sign-in",
        error: "/auth/error"
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile, user }) {
            if (account?.provider === "google") {
                if (!profile?.email) {
                    throw new Error("Email not found in Google profile");
                }
                try {
                    const existingUser = await prisma.user.upsert({
                        where: { email: profile.email },
                        create: {
                            name: profile.name || "No Name",
                            email: profile.email,
                            avatarUrl: (profile as any).picture || null,
                        },
                        update: {
                            name: profile.name || "No Name",
                            avatarUrl: (profile as any).picture || null,
                        },
                    });
                    return !!existingUser;
                } catch (error) {
                    console.error("Error during Google sign in:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (account?.provider === "google" && user?.email) {
                // Fetch user from database to get the ID
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email }
                });
                if (dbUser) {
                    token.id = dbUser.id;
                    token.name = dbUser.name || "";
                    token.email = dbUser.email || "";
                    token.picture = dbUser.avatarUrl;
                }
            } else if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.image = token.picture as string;
            }
            return session;
        },
    },
}