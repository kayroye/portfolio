import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Kalan Roye",
  description: "Get in touch with Kalan Roye for collaboration, questions, or just to say hello.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kalanroye.com/contact',
    siteName: 'Kalan Roye',
    title: 'Contact | Kalan Roye',
    description: 'Get in touch with Kalan Roye for collaboration, questions, or just to say hello.',
    images: [
      {
        url: 'https://kalanroye.com/og-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact Kalan Roye',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Kalan Roye',
    description: 'Get in touch with Kalan Roye for collaboration, questions, or just to say hello.',
    creator: 'kaywritescode',
    images: ['https://kalanroye.com/og-contact.png'],
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
} 