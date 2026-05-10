"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { ReceiptText, CheckCircle2, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      setIsLoading(provider);
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      toast.error("Failed to sign in");
      setIsLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      {/* Left Column: Hero/Branding */}
      <div className="hidden md:flex flex-1 flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-[100px]" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <div className="bg-white rounded-lg p-1.5 text-primary">
              <ReceiptText className="h-6 w-6" />
            </div>
            <span>PC Repair Invoice</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">Streamline your billing process</h1>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-teal-300 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Secure & Private</p>
                <p className="text-primary-foreground/70 text-sm">Role-based access ensures your business data remains confidential.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-teal-300 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Professional PDF Invoices</p>
                <p className="text-primary-foreground/70 text-sm">Generate beautiful, branded PDFs ready for your clients instantly.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-teal-300 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Client Management</p>
                <p className="text-primary-foreground/70 text-sm">Organize your client base and their history in one central location.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} PC Repair Invoice Generator. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Column: Login Card */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="md:hidden mb-8 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 font-bold text-2xl mb-2 text-primary">
                <ReceiptText className="h-8 w-8" />
                <span>PC Repair</span>
            </Link>
            <p className="text-muted-foreground">Professional Invoice Generator</p>
        </div>

        <Card className="w-full max-w-[400px] border-none shadow-none md:shadow-sm md:border md:bg-card">
          <CardHeader className="space-y-2 text-center pb-8">
            <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium relative group"
              onClick={() => handleSignIn("github")}
              disabled={isLoading !== null}
            >
              {isLoading === "github" ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <FaGithub className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              )}
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium relative group"
              onClick={() => handleSignIn("google")}
              disabled={isLoading !== null}
            >
              {isLoading === "google" ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <FaGoogle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              )}
              Continue with Google
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Admin access only</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-sm text-muted-foreground px-8">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
