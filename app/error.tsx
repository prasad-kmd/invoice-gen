"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Error({
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
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-destructive/10 text-destructive shadow-inner shadow-destructive/20">
          <AlertCircle className="h-10 w-10" />
        </div>
        
        <h2 className="mb-2 text-3xl font-black mozilla-headline tracking-tighter">
          Something went wrong!
        </h2>
        
        <p className="mb-8 text-muted-foreground google-sans tracking-tight">
          An unexpected error occurred. We've been notified and are working on a fix.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto h-12 rounded-2xl px-8 font-bold google-sans"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto h-12 rounded-2xl px-8 font-bold google-sans border-border/40"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>

        {error.digest && (
          <p className="mt-8 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Error ID: {error.digest}
          </p>
        )}
      </motion.div>
    </div>
  );
}
