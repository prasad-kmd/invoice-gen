import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

const mozillaHeadline = localFont({
	src: [
		{
			path: "../public/fonts/MozillaHeadline-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/MozillaHeadline-ExtraLight.woff2",
			weight: "200",
			style: "normal",
		},
	],
	variable: "--font-mozilla-headline",
	display: "swap",
});

const localInter = localFont({
	src: "../public/fonts/Inter-Regular.woff2",
	variable: "--font-inter",
	display: "swap",
});

const jetbrainsMono = localFont({
	src: "../public/fonts/JetBrainsMono-Regular.woff2",
	variable: "--font-jetbrains-mono",
	display: "swap",
});

const googleSans = localFont({
	src: "../public/fonts/GoogleSans-Regular.woff2",
	variable: "--font-google-sans",
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
			className={`${mozillaHeadline.variable} ${localInter.variable} ${jetbrainsMono.variable} ${googleSans.variable}`}
			suppressHydrationWarning
		>
			<body className="antialiased">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
