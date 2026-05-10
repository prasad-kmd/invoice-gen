"use client";

import { useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

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

export default function GlobalError({
  error,
  reset,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Critical system error:", error);
  }, [error]);

  const handleRetry = () => {
    if (typeof unstable_retry === "function") {
      unstable_retry();
    } else {
      reset();
    }
  };

  return (
    <html lang="en" className={`${localInter.variable} ${googleSans.variable}`}>
      <body className="antialiased bg-background text-foreground min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-primary/20">
          <CardHeader className="text-center pt-8">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 animate-pulse">
                <AlertTriangle className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-4xl font-bold tracking-tighter">System Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6 px-8">
            <p className="text-muted-foreground text-lg leading-relaxed">
                A critical error occurred in the application core. We apologize for the inconvenience.
            </p>
            {error.digest && (
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                <p className="text-[10px] uppercase font-black text-primary/60 tracking-[0.2em] mb-2 text-center">System Digest</p>
                <code className="text-sm font-mono break-all text-primary font-bold">{error.digest}</code>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pb-10 px-8">
            <Button onClick={handleRetry} size="lg" className="w-full h-14 text-lg font-bold shadow-[0_8px_30px_rgb(var(--primary)/0.4)]">
                <RefreshCw className="mr-3 h-5 w-5" /> Reboot Application
            </Button>
            <Button variant="ghost" className="w-full" asChild>
                <a href="/">
                    <Home className="mr-2 h-4 w-4" /> Go to Website
                </a>
            </Button>
          </CardFooter>
        </Card>
      </body>
    </html>
  );
}
