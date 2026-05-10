import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
            <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <div className="absolute font-bold text-xs text-primary">PC</div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
            PC Repair Invoice
          </h2>
          <p className="text-sm text-muted-foreground animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    </div>
  );
}
