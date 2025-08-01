import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthProvider";
import QueryProvider from "@/context/QueryProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edwise",
  description: "Your AI-powered education buddy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <AuthProvider>
          <QueryProvider>
            <body className={geist.className}>
              <Toaster />
              {children}
            </body>
          </QueryProvider>
        </AuthProvider>
      </html>
  );
}
