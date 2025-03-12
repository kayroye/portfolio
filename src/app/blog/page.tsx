'use client';

import React, { useEffect, useState } from 'react';
import { BlogPost } from '@/utils/blog';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import { StaticTerminalText } from '@/components/TerminalText';
import TerminalText from '@/components/TerminalText';
import BlogPostCard from '@/components/BlogPostCard';
import Script from 'next/script';
export default function BlogHome() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/blog');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const fetchedPosts = await response.json();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setErrorMessage('Failed to load posts. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      <Script id="schema-blog" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Kalan Roye's Blog",
            "description": "Articles and tutorials about software development, AI, and technology",
            "url": "https://kalanroye.com/blog",
            "author": {
              "@type": "Person",
              "name": "Kalan Roye",
              "url": "https://kalanroye.com"
            }
          }
        `}
      </Script>
      
      <NavigationBar location="blog" />
      
      <main className="flex-1 container mx-auto p-4">
        <h1 className="sr-only">Kalan Roye - Blog</h1>
        <section aria-label="Blog Introduction">
          <Terminal title="Welcome" className="mb-6">
            <div className="p-4">
              <TerminalText typingSpeed={20}>
                Welcome to my blog. Here I explore code, share insights, and document discoveries I make in my coding journey.
              </TerminalText>
            </div>
          </Terminal>
        </section>
        
        <section aria-label="Blog Posts">
          <Terminal title="Blog Posts">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-green-300">Latest Posts</h2>
                
                <div className="flex gap-2">
                  {/* Filter or search could go here in the future */}
                </div>
              </div>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <StaticTerminalText>Loading posts...</StaticTerminalText>
                </div>
              ) : errorMessage ? (
                <div className="p-2 bg-red-900/30 text-red-400 border border-red-500/30 rounded">
                  <StaticTerminalText>{errorMessage}</StaticTerminalText>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8 border border-green-500/30 rounded">
                  <StaticTerminalText>No posts found. Check back soon for new content!</StaticTerminalText>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <article key={post.slug} className="h-[250px]">
                      <BlogPostCard
                        title={post.title}
                        excerpt={post.excerpt}
                        date={post.date}
                        slug={post.slug}
                        categories={post.categories}
                        coverImage={post.coverImage}
                        viewCount={post.views?.length || 0}
                      />
                    </article>
                  ))}
                </div>
              )}
            </div>
          </Terminal>
        </section>
      </main>
      
      <Footer isBlog={true} />
    </div>
  );
}
