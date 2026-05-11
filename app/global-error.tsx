"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground flex min-h-screen items-center justify-center p-6 text-center">
        <div className="max-w-md w-full">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-destructive/10 text-destructive shadow-inner shadow-destructive/20">
            <AlertTriangle className="h-10 w-10" />
          </div>
          
          <h1 className="mb-2 text-4xl font-black mozilla-headline tracking-tighter">
            Critical Error
          </h1>
          
          <p className="mb-8 text-muted-foreground google-sans tracking-tight">
            A critical application error occurred. Please try to refresh the application.
          </p>

          <Button
            onClick={() => reset()}
            className="h-14 rounded-2xl px-12 font-bold google-sans text-lg"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Restart Application
          </Button>

          {error.digest && (
            <p className="mt-8 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
