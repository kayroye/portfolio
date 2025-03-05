'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPostData, saveBlogPost, BlogPost } from '@/utils/blog';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import BlogPostForm from '@/components/BlogPostForm';
import Terminal from '@/components/Terminal';
import { StaticTerminalText } from '@/components/TerminalText';

interface EditPostParams {
  params: {
    slug: string;
  };
}

export default function EditPostPage({ params }: EditPostParams) {
  const { slug } = params;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [post, setPost] = useState<BlogPost | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    // Check for saved authentication
    const savedAuth = localStorage.getItem('blog_admin_auth');
    if (savedAuth !== 'true') {
      router.push('/blog/admin');
      return;
    }
    
    setIsAuthenticated(true);
    fetchPost();
  }, [router, slug]);
  
  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const postData = await getPostData(slug);
      
      if (postData) {
        setPost(postData);
      } else {
        setErrorMessage('Post not found.');
      }
    } catch {
      setErrorMessage('Failed to load post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = async (updatedPost: BlogPost) => {
    try {
      const success = await saveBlogPost(updatedPost);
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
        
        {isLoading ? (
          <Terminal title="Loading Post">
            <div className="text-center py-8">
              <StaticTerminalText>Loading post data...</StaticTerminalText>
            </div>
          </Terminal>
        ) : errorMessage ? (
          <Terminal title="Error">
            <div className="p-4">
              <div className="p-2 bg-red-900/30 text-red-400 border border-red-500/30 rounded mb-4">
                <StaticTerminalText>{errorMessage}</StaticTerminalText>
              </div>
              <div className="mt-4">
                <Link 
                  href="/blog/admin"
                  className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50"
                >
                  Return to Admin
                </Link>
              </div>
            </div>
          </Terminal>
        ) : post ? (
          <BlogPostForm 
            initialData={post} 
            onSubmit={handleSubmit} 
            isEditing={true} 
          />
        ) : null}
      </main>
      
      <Footer isBlog={true} />
    </div>
  );
} 