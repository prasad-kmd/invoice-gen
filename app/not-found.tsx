"use client";

import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-primary/10 text-primary shadow-inner shadow-primary/20">
          <span className="text-4xl font-black mozilla-headline">404</span>
        </div>
        
        <h2 className="mb-2 text-3xl font-black mozilla-headline tracking-tighter">
          Page Not Found
        </h2>
        
        <p className="mb-8 text-muted-foreground google-sans tracking-tight leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Check the URL or return to the dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="w-full sm:w-auto h-12 rounded-2xl px-8 font-bold google-sans"
          >
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto h-12 rounded-2xl px-8 font-bold google-sans border-border/40"
          >
            <Link href="/">
              <Search className="mr-2 h-4 w-4" />
              Go to Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
