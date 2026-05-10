import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const localInter = localFont({
  src: "../public/fonts/Inter-Regular.woff2",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PC Repair Invoice Generator",
  description: "General-purpose invoice generator for PC repair technicians",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={localInter.variable}>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
