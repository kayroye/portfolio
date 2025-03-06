import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kalan Roye | Developer & AI Enthusiast",
  description: "Hey! I'm a student software developer with a passion for building products that help people do more with technology.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kalanroye.com',
    siteName: 'Kalan Roye',
    title: 'Kalan Roye | Developer & AI Enthusiast',
    description: 'Hey! I\'m a student software developer with a passion for building products that help people do more with technology.',
    images: [
      {
        url: 'https://kalanroye.com/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Kalan Roye | Developer & AI Enthusiast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalan Roye | Developer & AI Enthusiast',
    description: 'Hey! I\'m a student software developer with a passion for building products that help people do more with technology.',
    creator: '@kaywritescode',
    images: ['https://kalanroye.com/og-home.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
