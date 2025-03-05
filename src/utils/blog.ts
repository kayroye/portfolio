import { put, del, list } from "@vercel/blob";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  coverImage?: string;
  excerpt: string;
  author?: string;
  categories: string[];
  content: string;
}

import { createClient } from "@vercel/kv";

const kv = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

const BLOG_POST_PREFIX = "blog:post:";
const BLOG_POSTS_LIST_KEY = "blog:posts:list";

/**
 * Saves a blog post to Vercel KV
 */
export async function saveBlogPost(post: BlogPost): Promise<boolean> {
  try {
    // Store the blog post with its slug as part of the key
    await kv.set(`${BLOG_POST_PREFIX}${post.slug}`, post);

    // Update the list of post slugs for easy retrieval
    const slugs: string[] = (await kv.get(BLOG_POSTS_LIST_KEY)) || [];
    if (!slugs.includes(post.slug)) {
      slugs.push(post.slug);
      await kv.set(BLOG_POSTS_LIST_KEY, slugs);
    }

    return true;
  } catch(error) {
    console.error("Error saving blog post:", error);
    return false;
  }
}

/**
 * Deletes a blog post from Vercel KV
 */
export async function deleteBlogPost(slug: string): Promise<boolean> {
  try {
    // Delete the post
    await kv.del(`${BLOG_POST_PREFIX}${slug}`);

    // Update the list of post slugs
    let slugs: string[] = (await kv.get(BLOG_POSTS_LIST_KEY)) || [];
    slugs = slugs.filter((s) => s !== slug);
    await kv.set(BLOG_POSTS_LIST_KEY, slugs);

    // Clean up any associated blobs if needed
    // (Implemented in separate media function)

    return true;
  } catch {
    return false;
  }
}

/**
 * Gets all blog posts sorted by date
 */
export async function getSortedPostsData(): Promise<BlogPost[]> {
  try {
    // Get all post slugs
    const slugs: string[] = (await kv.get(BLOG_POSTS_LIST_KEY)) || [];

    // Get all posts data using pipeline for efficiency
    const pipeline = kv.pipeline();
    slugs.forEach((slug) => {
      pipeline.get(`${BLOG_POST_PREFIX}${slug}`);
    });

    const postsData = await pipeline.exec();
    const allPosts = postsData.filter(Boolean) as BlogPost[];

    // Sort posts by date
    return allPosts.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else if (a.date > b.date) {
        return -1;
      } else {
        return 0;
      }
    });
  } catch {
    return [];
  }
}

/**
 * Gets a single blog post by slug
 */
export async function getPostData(slug: string): Promise<BlogPost | null> {
  try {
    const post = await kv.get<BlogPost>(`${BLOG_POST_PREFIX}${slug}`);
    return post;
  } catch {
    return null;
  }
}

/**
 * Gets all post slugs
 */
export async function getAllPostSlugs(): Promise<
  { params: { slug: string } }[]
> {
  const slugs: string[] = (await kv.get(BLOG_POSTS_LIST_KEY)) || [];
  return slugs.map((slug) => ({
    params: { slug },
  }));
}

/**
 * Uploads a media file to Vercel Blob
 */
export async function uploadMedia(
  file: File,
  postSlug: string
): Promise<string | null> {
  try {
    const { url } = await put(`blog/${postSlug}/${file.name}`, file, {
      access: "public",
    });
    return url;
  } catch {
    return null;
  }
}

/**
 * Lists all media for a specific blog post
 */
export async function listPostMedia(postSlug: string) {
  try {
    const { blobs } = await list({ prefix: `blog/${postSlug}/` });
    return blobs;
  } catch {
    return [];
  }
}

/**
 * Deletes a media file from Vercel Blob
 */
export async function deleteMedia(url: string): Promise<boolean> {
  try {
    await del(url);
    return true;
  } catch {
    return false;
  }
}
