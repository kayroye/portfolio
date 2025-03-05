'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { marked } from 'marked';
import { getPostData, BlogPost } from '@/utils/blog';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import { StaticTerminalText } from '@/components/TerminalText';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostParams) {
  const { slug } = params;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
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
    
    fetchPost();
  }, [slug]);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      <NavigationBar isBlog={true} />
      
      <main className="flex-1 container mx-auto p-4">
        <div className="mb-4">
          <Link 
            href="/blog"
            className="text-green-500 hover:text-green-400 transition-colors flex items-center"
          >
            <span className="mr-1">←</span> Back to Blog
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
                  href="/blog"
                  className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50"
                >
                  Return to Blog
                </Link>
              </div>
            </div>
          </Terminal>
        ) : post ? (
          <Terminal title={post.title}>
            <div className="p-4">
              {post.coverImage && (
                <div className="relative w-full h-60 mb-6 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="object-cover w-full h-full rounded border border-green-500/20"
                  />
                </div>
              )}
              
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-green-300 mb-2">{post.title}</h1>
                
                <div className="flex items-center text-sm mb-4">
                  <div className="text-green-500/70 mr-4">
                    {formatDate(post.date)}
                  </div>
                  
                  {post.author && (
                    <div className="text-green-500/70 mr-4">
                      By {post.author}
                    </div>
                  )}
                </div>
                
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.categories.map((category, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div 
                className="prose prose-sm prose-invert prose-green max-w-none font-mono"
                dangerouslySetInnerHTML={{ __html: marked(post.content) }}
              />
            </div>
          </Terminal>
        ) : null}
      </main>
      
      <Footer isBlog={true} />
    </div>
  );
} 