"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { ReceiptText, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      toast.error("Failed to sign in");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/10 shadow-inner shadow-primary/20 mb-6 group transition-transform hover:scale-110">
            <ReceiptText className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-black mozilla-headline tracking-tighter mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground google-sans tracking-tight">
            Sign in to access your repair invoice dashboard.
          </p>
        </div>

        <div className="p-8 md:p-10 rounded-[3rem] border border-border/40 bg-card/60 backdrop-blur-3xl shadow-2xl space-y-6">
          <div className="space-y-4">
            <Button
              variant="secondary"
              className="w-full h-14 rounded-2xl border border-border/40 bg-background/50 hover:bg-muted font-bold google-sans transition-all active:scale-[0.98]"
              onClick={() => handleSignIn("github")}
            >
              <FaGithub className="mr-3 h-5 w-5" />
              Continue with GitHub
            </Button>
            <Button
              variant="secondary"
              className="w-full h-14 rounded-2xl border border-border/40 bg-background/50 hover:bg-muted font-bold google-sans transition-all active:scale-[0.98]"
              onClick={() => handleSignIn("google")}
            >
              <FaGoogle className="mr-3 h-5 w-5 text-rose-500" />
              Continue with Google
            </Button>
          </div>

          <div className="pt-6 border-t border-border/40 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold local-jetbrains-mono flex items-center justify-center gap-2">
              <ShieldCheck className="h-3 w-3 text-primary" /> 
              Admin Access Only
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground google-sans">
          &copy; {new Date().getFullYear()} PC Repair Invoice Gen. Secure & Private.
        </p>
      </div>
    </div>
  );
}
