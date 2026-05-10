import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const localInter = localFont({
  src: "../public/fonts/Inter-Regular.woff2",
  variable: "--font-inter",
  display: "swap",
});

const googleSans = localFont({
  src: "../public/fonts/GoogleSans-Regular.woff2",
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Invoice Pro | Professional Invoice Generator",
  description: "Modern, fast, and professional invoice generator for businesses and freelancers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${localInter.variable} ${googleSans.variable}`}>
      <body className="antialiased font-inter">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
