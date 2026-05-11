"use client";

import { motion } from "framer-motion";
import { ReceiptText } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="relative flex items-center justify-center"
      >
        <div className="absolute h-24 w-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-inner shadow-primary/20">
          <ReceiptText className="h-8 w-8 text-primary" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center"
      >
        <h2 className="text-xl font-bold mozilla-headline tracking-tight">Loading</h2>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold local-jetbrains-mono">
          PC Repair Invoice Gen
        </p>
      </motion.div>
    </div>
  );
}
