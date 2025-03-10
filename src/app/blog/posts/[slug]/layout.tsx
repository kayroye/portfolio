import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostData } from "@/utils/blog";

// Generate metadata for each blog post dynamically
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;

  try {
    // Fetch the blog post data using the utility function
    const post = await getPostData(slug);
    
    if (!post) {
      return notFound();
    }
    
    // Format the date for OpenGraph metadata
    const publishedDate = new Date(post.date).toISOString();
    const modifiedDate = publishedDate; // Use same date if no updated date available
    
    // Generate the dynamic OpenGraph image URL
    const ogImageUrl = new URL(`/api/og?slug=${slug}`, process.env.NEXT_PUBLIC_BASE_URL || 'https://kalanroye.com').toString();
    
    return {
      title: `${post.title} | Kalan Roye's Blog`,
      description: post.excerpt || `Read ${post.title} on Kalan Roye's blog.`,
      openGraph: {
        type: 'article',
        locale: 'en_US',
        url: `https://kalanroye.com/blog/posts/${slug}`,
        siteName: 'Kalan Roye',
        title: post.title,
        description: post.excerpt || `Read ${post.title} on Kalan Roye's blog.`,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        publishedTime: publishedDate,
        modifiedTime: modifiedDate,
        authors: ['Kalan Roye'],
        tags: post.categories || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || `Read ${post.title} on Kalan Roye's blog.`,
        creator: 'kaywritescode',
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    console.error("Error fetching blog post metadata:", error);
    return {
      title: 'Blog Post | Kalan Roye',
      description: 'Read Kalan Roye\'s articles on software development, AI, and technology.',
    };
  }
}

export default function BlogPostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
} 