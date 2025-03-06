import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostData } from "@/utils/blog";

// Generate metadata for each blog post dynamically
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
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
            url: post.coverImage || 'https://kalanroye.com/og-blog.png',
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
        images: [post.coverImage || 'https://kalanroye.com/og-blog.png'],
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