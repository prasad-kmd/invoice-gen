"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Terminal, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

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
    <div className="flex min-h-screen items-center justify-center bg-background px-4 relative overflow-hidden selection:bg-primary/20">
      {/* Decorative background blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
        >
          <Link href="/" className="inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/10 shadow-inner shadow-primary/20 mb-6 group transition-transform hover:scale-110">
            <Terminal className="h-10 w-10 text-primary" />
          </Link>
          <h1 className="text-4xl font-black mozilla-headline tracking-tighter mb-2">
            System Authentication
          </h1>
          <p className="text-muted-foreground google-sans tracking-tight">
            Login to the {siteConfig.author} administrative portal.
          </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 md:p-10 rounded-[3rem] border border-border/40 bg-card/60 backdrop-blur-3xl shadow-2xl space-y-6"
        >
          <div className="space-y-4">
            <Button
              variant="secondary"
              className="w-full h-14 rounded-2xl border border-border/40 bg-background/50 hover:bg-muted font-bold google-sans transition-all active:scale-[0.98] group"
              onClick={() => handleSignIn("github")}
            >
              <FaGithub className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
              Continue with GitHub
            </Button>
            <Button
              variant="secondary"
              className="w-full h-14 rounded-2xl border border-border/40 bg-background/50 hover:bg-muted font-bold google-sans transition-all active:scale-[0.98] group"
              onClick={() => handleSignIn("google")}
            >
              <FaGoogle className="mr-3 h-5 w-5 text-rose-500 transition-transform group-hover:scale-110" />
              Continue with Google
            </Button>
          </div>

          <div className="pt-6 border-t border-border/40 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold local-jetbrains-mono flex items-center justify-center gap-2">
              <ShieldCheck className="h-3 w-3 text-primary" /> 
              Authorized Personnel Only
            </p>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col items-center gap-6"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors google-sans"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Homepage
          </Link>

          <p className="text-center text-xs text-muted-foreground google-sans opacity-50">
            &copy; {new Date().getFullYear()} {siteConfig.author} {siteConfig.name}. Secure Environment.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
