import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Kalan Roye",
  description: "Learn about Kalan Roye's background, skills, and experience as a software developer and AI enthusiast.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kalanroye.com/about',
    siteName: 'Kalan Roye',
    title: 'About | Kalan Roye',
    description: 'Learn about Kalan Roye\'s background, skills, and experience as a software developer and AI enthusiast.',
    images: [
      {
        url: 'https://kalanroye.com/og-about.png',
        width: 1200,
        height: 630,
        alt: 'About Kalan Roye',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Kalan Roye',
    description: 'Learn about Kalan Roye\'s background, skills, and experience as a software developer and AI enthusiast.',
    creator: 'kaywritescode',
    images: ['https://kalanroye.com/og-about.png'],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
} 