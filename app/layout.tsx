import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import localFont from "next/font/local";
import { ViewTransitions } from "@/components/view-transitions";
import { AccentColorInitializer } from "@/components/accent-color-initializer";
import { ClickSpark } from "@/components/click-spark";

const amoriaregular = localFont({
  src: "../public/fonts/en/AMORIARegular.woff2",
  variable: "--font-amoria-regular",
  display: "swap",
});
const mozillaHeadline = localFont({
  src: "../public/fonts/en/MozillaHeadline-Regular.woff2",
  variable: "--font-mozilla-headline",
  display: "swap",
});
const philosopher = localFont({
  src: "../public/fonts/en/Philosopher.woff2",
  variable: "--font-philosopher",
  display: "swap",
});

const googleSans = localFont({
  src: "../public/fonts/GoogleSans-Regular.woff2",
  variable: "--font-google-sans",
  display: "swap",
});

const mozillaText = localFont({
  src: [
    {
      path: "../public/fonts/MozillaText-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/MozillaText-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-mozilla-text",
  display: "swap",
});

const notoSans = localFont({
  src: "../public/fonts/NotoSans-Regular.woff2",
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSansDisplay = localFont({
  src: "../public/fonts/NotoSansDisplay-Regular.woff2",
  variable: "--font-noto-sans-display",
  display: "swap",
});

const notoSerifSinhala = localFont({
  src: "../public/fonts/NotoSerifSinhala-Regular.woff2",
  variable: "--font-noto-serif-sinhala",
  display: "swap",
});

const roboto = localFont({
  src: "../public/fonts/Roboto-Regular.woff2",
  variable: "--font-roboto",
  display: "swap",
});

const spaceMono = localFont({
  src: "../public/fonts/SpaceMono-Regular.woff2",
  variable: "--font-space-mono",
  display: "swap",
});

const localInter = localFont({
  src: "../public/fonts/Inter-Regular.woff2",
  variable: "--font-local-inter",
  display: "swap",
});

const localJetBrainsMono = localFont({
  src: "../public/fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-local-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PC Repair Invoice Generator",
  description: "General-purpose invoice generator for PC repair technicians",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${amoriaregular.variable} ${mozillaHeadline.variable} ${philosopher.variable} ${googleSans.variable} ${mozillaText.variable} ${notoSans.variable} ${notoSansDisplay.variable} ${notoSerifSinhala.variable} ${roboto.variable} ${spaceMono.variable} ${localInter.variable} ${localJetBrainsMono.variable}`}
    >
      <body
        className="antialiased selection:bg-brand-200 selection:text-brand-900"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AccentColorInitializer />
          <ClickSpark />
          <TooltipProvider>
            <ViewTransitions>
                {children}
                <Toaster position="bottom-right" richColors />
            </ViewTransitions>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
