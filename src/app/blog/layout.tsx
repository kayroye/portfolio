import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Kalan Roye",
  description: "Read Kalan Roye's articles and tutorials on software development, AI, and technology.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kalanroye.com/blog',
    siteName: 'Kalan Roye',
    title: 'Blog | Kalan Roye',
    description: 'Read Kalan Roye\'s articles and tutorials on software development, AI, and technology.',
    images: [
      {
        url: 'https://kalanroye.com/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'Kalan Roye\'s Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Kalan Roye',
    description: 'Read Kalan Roye\'s articles and tutorials on software development, AI, and technology.',
    creator: 'kaywritescode',
    images: ['https://kalanroye.com/og-blog.png'],
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
} 