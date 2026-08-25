import type { Metadata } from "next";
import type { Viewport } from "next";
import { Geist, Hanken_Grotesk, Inter } from "next/font/google";
import { portfolioContent } from "@/content/portfolio";
import "./globals.css";

const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  title: portfolioContent.metadata.title,
  description: portfolioContent.metadata.description,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fbfaee" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${hanken.variable} ${inter.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
