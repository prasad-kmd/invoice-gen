"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  const handleRetry = () => {
    if (typeof unstable_retry === "function") {
      unstable_retry();
    } else {
      reset();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
      <Card className="w-full max-w-md border-none shadow-none md:border md:shadow-sm">
        <CardHeader className="pt-8 pb-4 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            We've encountered an unexpected error. Our team has been notified.
          </p>
          {error.digest && (
            <div className="bg-muted p-3 rounded-lg border border-border">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Reference ID</p>
              <code className="text-xs font-mono break-all text-primary">{error.digest}</code>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pb-8">
          <Button onClick={handleRetry} className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg">
            <RefreshCcw className="mr-2 h-4 w-4" /> Try again
          </Button>
          <Button asChild variant="ghost" className="w-full h-11">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Return Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
