'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost } from '@/utils/blog';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import BlogPostForm from '@/components/BlogPostForm';

export default function NewPostPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        
        if (response.ok && data.authenticated) {
          setIsAuthenticated(true);
        } else {
          // Redirect to admin login if not authenticated
          router.push('/blog/admin');
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        router.push('/blog/admin');
      }
    };
    
    checkAuth();
  }, [router]);
  
  const handleSubmit = async (post: BlogPost) => {
    try {
      // Call the API route instead of directly using saveBlogPost
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      
      if (response.ok) {
        router.push('/blog/admin');
        return true;
      }
      
      console.error("Failed to save blog post");
      return false;
    } catch (error) {
      console.error("Error saving blog post:", error);
      return false;
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
        <NavigationBar location="blog" />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center p-8">
            <p>Authenticating...</p>
          </div>
        </div>
        
        <Footer isBlog={true} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      <NavigationBar location="blog" />
      
      <main className="flex-1 container mx-auto p-4">
        <div className="mb-4">
          <Link 
            href="/blog/admin"
            className="text-green-500 hover:text-green-400 transition-colors flex items-center"
          >
            <span className="mr-1">←</span> Back to Admin
          </Link>
        </div>
        
        <BlogPostForm onSubmit={handleSubmit} />
      </main>
      
      <Footer isBlog={true} />
    </div>
  );
} 