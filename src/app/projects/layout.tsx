import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Kalan Roye",
  description: "Explore Kalan Roye's portfolio of software development projects, including web applications, AI systems, and more.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kalanroye.com/projects',
    siteName: 'Kalan Roye',
    title: 'Projects | Kalan Roye',
    description: 'Explore Kalan Roye\'s portfolio of software development projects, including web applications, AI systems, and more.',
    images: [
      {
        url: 'https://kalanroye.com/og-projects.png',
        width: 1200,
        height: 630,
        alt: 'Kalan Roye\'s Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Kalan Roye',
    description: 'Explore Kalan Roye\'s portfolio of software development projects, including web applications, AI systems, and more.',
    creator: 'kaywritescode',
    images: ['https://kalanroye.com/og-projects.png'],
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
} 