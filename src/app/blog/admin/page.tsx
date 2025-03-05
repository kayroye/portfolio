'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSortedPostsData, deleteBlogPost, BlogPost } from '@/utils/blog';
import Terminal from '@/components/Terminal';
import { StaticTerminalText } from '@/components/TerminalText';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Simple authentication mechanism
  // In a real application, you'd want to use a proper auth service
  const authenticate = (enteredPassword: string) => {
    // This is a placeholder - in a real app, you'd use an environment variable 
    // or authenticate against a real backend
    if (enteredPassword === "admin1234") {
      setIsAuthenticated(true);
      localStorage.setItem('blog_admin_auth', 'true');
    } else {
      setErrorMessage('Invalid password');
    }
  };
  
  useEffect(() => {
    // Check for saved authentication
    const savedAuth = localStorage.getItem('blog_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Fetch posts if authenticated
    if (isAuthenticated) {
      fetchPosts();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);
  
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await getSortedPostsData();
      setPosts(fetchedPosts);
    } catch {
      setErrorMessage('Failed to load posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('blog_admin_auth');
    setIsAuthenticated(false);
  };
  
  const handleDeletePost = async (slug: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const success = await deleteBlogPost(slug);
        if (success) {
          // Refresh post list
          fetchPosts();
        } else {
          setErrorMessage('Failed to delete post. Please try again.');
        }
      } catch {
        setErrorMessage('An error occurred while deleting the post.');
      }
    }
  };
  
  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
        <NavigationBar isBlog={true} />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <Terminal title="Blog Admin Login">
            <div className="max-w-md mx-auto p-4">
              <h1 className="text-xl font-bold mb-4">Admin Login</h1>
              
              {errorMessage && (
                <div className="p-2 bg-red-900/30 text-red-400 border border-red-500/30 rounded mb-4">
                  <StaticTerminalText>{errorMessage}</StaticTerminalText>
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1">
                  <StaticTerminalText showPrompt>Password:</StaticTerminalText>
                </label>
                <input 
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 bg-black border border-green-500/30 rounded text-green-400 focus:border-green-500 focus:outline-none"
                />
              </div>
              
              <button
                onClick={() => authenticate(password)}
                className="px-4 py-2 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50"
              >
                Login
              </button>
            </div>
          </Terminal>
        </div>
        
        <Footer isBlog={true} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      <NavigationBar isBlog={true} />
      
      <main className="flex-1 container mx-auto p-4">
        <Terminal title="Blog Admin">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-xl font-bold">Post Management</h1>
            <div className="flex gap-2">
              <Link 
                href="/blog/admin/new"
                className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50"
              >
                + New Post
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-900/30 text-red-400 border border-red-500/30 rounded hover:bg-red-900/50"
              >
                Logout
              </button>
            </div>
          </div>
          
          {errorMessage && (
            <div className="p-2 bg-red-900/30 text-red-400 border border-red-500/30 rounded mb-4">
              <StaticTerminalText>{errorMessage}</StaticTerminalText>
            </div>
          )}
          
          {isLoading ? (
            <div className="text-center py-8">
              <StaticTerminalText>Loading posts...</StaticTerminalText>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8 border border-green-500/30 rounded">
              <StaticTerminalText>No posts found. Create your first post!</StaticTerminalText>
            </div>
          ) : (
            <div className="border border-green-500/30 rounded overflow-hidden">
              <table className="w-full table-auto">
                <thead className="bg-green-900/30">
                  <tr>
                    <th className="py-2 px-4 text-left">Title</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.slug} className="border-t border-green-500/30">
                      <td className="py-2 px-4 text-green-300">
                        <Link href={`/blog/posts/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4">
                        {new Date(post.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex gap-2">
                          <Link 
                            href={`/blog/admin/edit/${post.slug}`}
                            className="px-2 py-1 bg-green-900/30 text-xs text-green-400 border border-green-500/30 rounded hover:bg-green-900/50"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post.slug)}
                            className="px-2 py-1 bg-red-900/30 text-xs text-red-400 border border-red-500/30 rounded hover:bg-red-900/50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Terminal>
      </main>
      
      <Footer isBlog={true} />
    </div>
  );
} 