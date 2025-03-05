'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { saveBlogPost, BlogPost } from '@/utils/blog';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import BlogPostForm from '@/components/BlogPostForm';

export default function NewPostPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Check for saved authentication
    const savedAuth = localStorage.getItem('blog_admin_auth');
    if (savedAuth !== 'true') {
      router.push('/blog/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);
  
  const handleSubmit = async (post: BlogPost) => {
    try {
      const success = await saveBlogPost(post);
      if (success) {
        router.push('/blog/admin');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
        <NavigationBar isBlog={true} />
        
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
      <NavigationBar isBlog={true} />
      
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