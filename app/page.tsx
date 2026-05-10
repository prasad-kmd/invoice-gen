import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Zap,
  ArrowRight,
  Database,
  Layout
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary rounded-lg p-1.5 text-primary-foreground">
            <ReceiptText className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">PC Repair Invoice</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Professional Invoices for <br className="hidden sm:inline" />
                  <span className="text-primary">PC Technicians</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl dark:text-muted-foreground/80">
                  Modern, fast, and secure invoice generation. Manage clients, track payments, and generate beautiful PDFs in seconds.
                </p>
              </div>
              <div className="space-x-4 flex flex-col sm:flex-row gap-4 sm:gap-0 pt-4">
                <Button asChild size="lg" className="px-8 h-12 text-base rounded-full">
                  <Link href="/login">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 h-12 text-base rounded-full">
                  <Link href="https://github.com/prasad-kmd/invoice-gen" target="_blank">
                    View GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 flex justify-center border-y">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features that empower you</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your PC repair business billing in one place.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="Rapid Generation"
                description="Create professional invoices in seconds with our streamlined workflow."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-8 w-8 text-primary" />}
                title="Secure & Private"
                description="Your data is safe with role-based access and secure authentication."
              />
              <FeatureCard
                icon={<Smartphone className="h-8 w-8 text-primary" />}
                title="Mobile Friendly"
                description="Manage your business on the go with our fully responsive dashboard."
              />
              <FeatureCard
                icon={<Database className="h-8 w-8 text-primary" />}
                title="Client Management"
                description="Keep track of your clients and their repair history effortlessly."
              />
              <FeatureCard
                icon={<Layout className="h-8 w-8 text-primary" />}
                title="Modern Dashboard"
                description="Visualize your earnings and recent activity at a glance."
              />
              <FeatureCard
                icon={<ReceiptText className="h-8 w-8 text-primary" />}
                title="PDF Export"
                description="Generate beautiful, branded PDF invoices ready to be sent to clients."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t flex justify-center">
        <div className="container px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded p-1 text-primary-foreground">
              <ReceiptText className="h-4 w-4" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              &copy; {new Date().getFullYear()} PC Repair Invoice Generator.
            </p>
          </div>
          <div className="flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:text-primary transition-colors underline-offset-4" href="https://github.com/prasad-kmd/invoice-gen" target="_blank">
              GitHub
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors underline-offset-4" href="#">
              Privacy
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors underline-offset-4" href="#">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
      <CardContent className="pt-6 flex flex-col items-center text-center space-y-3">
        <div className="p-3 bg-primary/5 rounded-2xl mb-2">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
