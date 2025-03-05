import { NextRequest, NextResponse } from "next/server";
import { saveBlogPost, deleteBlogPost, getPostData, getSortedPostsData } from "@/utils/blog";
import { BlogPost } from "@/utils/blog";

export async function POST(request: NextRequest) {
  const post: BlogPost = await request.json();

  const saved = await saveBlogPost(post);

  if (saved) {
    return NextResponse.json({ message: "Blog post saved successfully" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Failed to save blog post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  if (!slug) {
    return NextResponse.json({ message: "Slug is required" }, { status: 400 });
  }
  
  const deleted = await deleteBlogPost(slug);
  
  if (deleted) {
    return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Failed to delete blog post" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  if (!slug) {
    // Get all posts sorted by date (newest first)
    const posts = await getSortedPostsData();
    return NextResponse.json(posts, { status: 200 });
  }
  
  const post = await getPostData(slug);
  
  if (post) {
    return NextResponse.json(post, { status: 200 });
  } else {
    return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
  }
}




