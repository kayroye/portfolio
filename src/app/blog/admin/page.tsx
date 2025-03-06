'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/utils/blog';
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
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Secure authentication using server-side API
  const authenticate = async (enteredPassword: string) => {
    setIsAuthenticating(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: enteredPassword }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setErrorMessage(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrorMessage('An error occurred during authentication');
    } finally {
      setIsAuthenticating(false);
    }
  };
  
  useEffect(() => {
    // Check authentication status on load
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        
        if (response.ok && data.authenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth verification error:', error);
      } finally {
        setIsCheckingAuth(false);
      }
      
      // Fetch posts if authenticated
      if (isAuthenticated) {
        fetchPosts();
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [isAuthenticated]);
  
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/blog');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setErrorMessage('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    // Clear the authentication cookie by making a request to the server
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => {
        setIsAuthenticated(false);
        setPosts([]);
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };
  
  const handleDeletePost = async (slug: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/blog?slug=${slug}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // Refresh the posts list
          fetchPosts();
        } else {
          setErrorMessage('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        setErrorMessage('Error deleting post');
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      <NavigationBar location="blog" />
      
      <main className="flex-1 container mx-auto p-4">
        {isCheckingAuth ? (
          <div className="flex items-center justify-center h-full">
            <Terminal title="Blog Admin">
              <div className="p-4 text-center">
                <StaticTerminalText>Checking authentication status...</StaticTerminalText>
              </div>
            </Terminal>
          </div>
        ) : !isAuthenticated ? (
          <div className="flex items-center justify-center h-full">
            <Terminal title="Blog Admin Login">
              <div className="max-w-md p-4">
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        authenticate(password);
                      }
                    }}
                  />
                </div>
                
                <button
                  onClick={() => authenticate(password)}
                  disabled={isAuthenticating || !password}
                  className="px-4 py-2 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAuthenticating ? 'Authenticating...' : 'Login'}
                </button>
              </div>
            </Terminal>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Blog Admin Dashboard</h1>
              <div className="flex gap-4">
                <Link href="/blog/admin/new" className="px-4 py-2 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50">
                  New Post
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-900/30 text-red-400 border border-red-500/30 rounded hover:bg-red-900/50"
                >
                  Logout
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center py-8">
                <StaticTerminalText>Loading posts...</StaticTerminalText>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <StaticTerminalText>No posts found.</StaticTerminalText>
              </div>
            ) : (
              <div className="grid gap-4">
                {posts.map((post) => (
                  <div key={post.slug} className="p-4 border border-green-500/30 rounded bg-green-900/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                        <p className="text-sm opacity-70 mb-2">
                          {new Date(post.date).toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {post.categories.map((category: string) => (
                            <span key={category} className="text-xs px-2 py-1 bg-green-900/20 border border-green-500/20 rounded">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link 
                          href={`/blog/admin/edit/${post.slug}`}
                          className="px-3 py-1 bg-blue-900/30 text-blue-400 border border-blue-500/30 rounded hover:bg-blue-900/50 text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.slug)}
                          className="px-3 py-1 bg-red-900/30 text-red-400 border border-red-500/30 rounded hover:bg-red-900/50 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer isBlog={true} />
    </div>
  );
} 