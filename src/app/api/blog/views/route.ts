import { NextRequest, NextResponse } from "next/server";
import { getPostData, saveBlogPost } from "@/utils/blog";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  if (!slug) {
    return NextResponse.json({ message: "Slug is required" }, { status: 400 });
  }
  
  // Get IP address from request
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  
  try {
    // Get the post
    const post = await getPostData(slug);
    
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    
    // Initialize views array if it doesn't exist
    if (!post.views) {
      post.views = [];
    }
    
    // Check if this IP has already viewed the post
    if (!post.views.includes(ip)) {
      // Add the IP to the views array
      post.views.push(ip);
      
      // Save the updated post
      await saveBlogPost(post);
    }
    
    // Return the view count
    return NextResponse.json({ 
      viewCount: post.views.length 
    }, { status: 200 });
  } catch (error) {
    console.error("Error tracking view:", error);
    return NextResponse.json({ message: "Failed to track view" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  if (!slug) {
    return NextResponse.json({ message: "Slug is required" }, { status: 400 });
  }
  
  try {
    // Get the post
    const post = await getPostData(slug);
    
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    
    // Return the view count
    return NextResponse.json({ 
      viewCount: post.views?.length || 0 
    }, { status: 200 });
  } catch (error) {
    console.error("Error getting view count:", error);
    return NextResponse.json({ message: "Failed to get view count" }, { status: 500 });
  }
} 