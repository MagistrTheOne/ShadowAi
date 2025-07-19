import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider, TRPCReactProvider } from "@/trpc/client";




const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shadow ai",
  description: "New ai -web SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html> 
    </TRPCReactProvider>
  );
}
