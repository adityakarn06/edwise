import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from "@clerk/themes";

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
    <ClerkProvider
    appearance={{
      baseTheme: dark,
    }}>
      <html lang="en">
        <body className={geist.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
