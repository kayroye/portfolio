import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalan Roye's Blog",
  description: "Kalan Roye's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
