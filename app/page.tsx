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
  Layout,
  ChevronRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6">
        <nav className="flex items-center justify-between w-full max-w-7xl px-6 py-3 rounded-full border glass-morphism shadow-xl shadow-black/5 animate-in slide-in-from-top duration-700">
          <Link className="flex items-center gap-2 group" href="/">
            <div className="bg-primary rounded-lg p-1.5 text-primary-foreground transition-transform group-hover:scale-110 duration-300">
              <ReceiptText className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">PC Repair</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-6">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">Log in</Link>
            <Button asChild size="sm" className="rounded-full px-6 shadow-lg shadow-primary/20">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 lg:pt-64 lg:pb-48 flex justify-center overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[128px] animate-pulse delay-700" />
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
                Trusted by 500+ Technicians
              </div>
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl/none animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                  Professional Invoices for <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">PC Technicians</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                  The most beautiful way to manage your repair business billing. Fast, secure, and professional.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
                <Button asChild size="lg" className="px-10 h-14 text-lg rounded-full shadow-xl shadow-primary/20 group">
                  <Link href="/login">
                    Start Generating <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-10 h-14 text-lg rounded-full backdrop-blur-sm">
                  <Link href="https://github.com/prasad-kmd/invoice-gen" target="_blank">
                    View GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 md:py-32 flex justify-center bg-card/30 border-y">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="Rapid Generation"
                description="Create professional invoices in seconds with our highly optimized workflow."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Secure & Private"
                description="Your business data is protected with enterprise-grade security and role-based access."
              />
              <FeatureCard
                icon={<Smartphone className="h-6 w-6" />}
                title="Mobile First"
                description="Manage your clients and billing from any device with our responsive app shell."
              />
              <FeatureCard
                icon={<Database className="h-6 w-6" />}
                title="Client Vault"
                description="Maintain a detailed history of your clients and their past repair records effortlessly."
              />
              <FeatureCard
                icon={<Layout className="h-6 w-6" />}
                title="Insights Dashboard"
                description="Track your revenue and pending payments at a glance with beautiful visualizations."
              />
              <FeatureCard
                icon={<ReceiptText className="h-6 w-6" />}
                title="Custom PDFs"
                description="Generate branded PDF invoices with custom themes and layout options."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 md:py-20 flex justify-center border-t bg-muted/20">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link className="flex items-center gap-2 font-bold text-2xl tracking-tighter" href="/">
              <div className="bg-primary rounded-lg p-1 text-primary-foreground">
                <ReceiptText className="h-6 w-6" />
              </div>
              PC Repair
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
              The professional billing companion for independent PC technicians and small repair shops.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Product</h4>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/dashboard">Dashboard</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/invoices">Invoices</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/clients">Clients</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Connect</h4>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="https://github.com/prasad-kmd/invoice-gen" target="_blank">GitHub</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Twitter</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Discord</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="group border-none shadow-none bg-transparent hover:bg-card hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 p-2 rounded-[2rem]">
      <CardContent className="pt-8 px-8 pb-10 flex flex-col items-start space-y-4">
        <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
          {icon}
        </div>
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
