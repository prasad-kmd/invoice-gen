import { Loader2, ReceiptText } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background animate-in fade-in duration-700">
      <div className="flex flex-col items-center gap-8">
        <div className="relative flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border-[3px] border-primary/10 border-t-primary animate-spin" />
            <div className="absolute font-black text-2xl text-primary animate-pulse tracking-tighter">PC</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
            PC REPAIR INVOICE
          </h2>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce delay-0" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce delay-150" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce delay-300" />
          </div>
        </div>
      </div>

      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[128px] -z-10 animate-pulse" />
    </div>
  );
}
