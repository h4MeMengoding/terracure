import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppEntry } from "@/components/app-entry";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: {
    default: "TERRACURE",
    template: "%s | TERRACURE"
  },
  description: "Smart HMI Sawah untuk monitoring kondisi tanah dan rekomendasi agronomi.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "TERRACURE",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#1F6F5B",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={inter.variable}>
      <body><AppEntry>{children}</AppEntry></body>
    </html>
  );
}
