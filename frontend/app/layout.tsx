import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";

import AuthProvider from "@/components/providers/AuthProvider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crossprep.vercel.app"),
  title: {
    default: "CrossPrep",
    template: "%s | CrossPrep",
  },
  description:
    "AI-powered career preparation platform for resume analysis, mock interviews, coding practice, career coaching, job matching, and progress analytics.",
  applicationName: "CrossPrep",
  keywords: [
    "CrossPrep",
    "AI interview preparation",
    "resume analysis",
    "mock interview",
    "coding interview",
    "career coach",
  ],
  openGraph: {
    type: "website",
    url: "https://crossprep.vercel.app",
    siteName: "CrossPrep",
    title: "CrossPrep",
    description: "Prepare Smarter. Perform with Confidence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CrossPrep AI Career Preparation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CrossPrep",
    description: "Prepare Smarter. Perform with Confidence.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="flex min-h-full flex-col">
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}