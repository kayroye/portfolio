'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import TerminalText from '@/components/TerminalText';
import { StaticTerminalText } from '@/components/TerminalText';

export default function Home() {
  const [typingDone, setTypingDone] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  
  // Effect for animations - depends on typingDone
  useEffect(() => {
    if (typingDone) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [typingDone]);
  
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      <NavigationBar />
      
      <main className="flex-1 container mx-auto p-4">
        <Terminal title="kalanroye.com | Terminal" className="mb-6">
          <div className="p-4">
            <div className="mb-4">
              <TerminalText 
                typingSpeed={15} 
                onComplete={() => setTypingDone(true)}
              >
                Hey! I&apos;m Kalan Roye. Welcome to my digital workspace.
                
                I&apos;m a software developer focused on creating innovative, user-friendly solutions.
                My work spans across web development, AI systems, and data science.
                
                Feel free to explore my projects, read my blog, or get in touch.
              </TerminalText>
            </div>
            
            {typingDone && (
              <div className="mt-6">
                <StaticTerminalText showPrompt>What would you like to explore today?</StaticTerminalText>
              </div>
            )}
            
            {showButtons && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  href="/about"
                  className="px-4 py-3 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50 transition-colors text-center"
                >
                  <span className="block font-bold mb-1">About Me</span>
                  <span className="text-sm text-green-500">Learn about my background and skills</span>
                </Link>
                
                <Link 
                  href="/projects"
                  className="px-4 py-3 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50 transition-colors text-center"
                >
                  <span className="block font-bold mb-1">Projects</span>
                  <span className="text-sm text-green-500">View my portfolio of work</span>
                </Link>
                
                <Link 
                  href="/contact"
                  className="px-4 py-3 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50 transition-colors text-center"
                >
                  <span className="block font-bold mb-1">Contact</span>
                  <span className="text-sm text-green-500">Get in touch with me</span>
                </Link>
                
                <Link 
                  href="/blog"
                  className="px-4 py-3 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50 transition-colors text-center"
                >
                  <span className="block font-bold mb-1">Blog</span>
                  <span className="text-sm text-green-500">Read my articles and tutorials</span>
                </Link>
              </div>
            )}
          </div>
        </Terminal>
        
        <Terminal title="Featured Project" className="mb-6">
          <div className="p-4">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-green-300">Conclave</h2>
              <div className="text-sm text-green-500 mb-3">
                Technologies: React.js, Next.js, Firebase, Vercel AI SDK
              </div>
            </div>
            
            <p className="mb-4">
              An open-source chat app that lets users interact with each other and their preferred large language models. Developed using Vercel&apos;s AI SDK and Socket.io.
            </p>
            
            <Link 
              href="/projects"
              className="text-green-400 hover:underline inline-flex items-center"
            >
              View All Projects
              <span className="ml-1">→</span>
            </Link>
          </div>
        </Terminal>

        <Terminal title="Author's (me) Choice">
          <div className="p-4">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-green-300">hello world</h2>
              <p className="text-sm text-green-500 mb-3">Mar 5, 2025</p>
              <p className="text-sm text-green-500 mb-3">A little introduction to me and my journey in code.</p>
              
              <div className="flex gap-2 mb-4">
                <span className="bg-green-950 text-green-400 px-3 py-1 rounded-md text-xs">introduction</span>
                <span className="bg-green-950 text-green-400 px-3 py-1 rounded-md text-xs">general thoughts</span>
              </div>

              <Link 
                href="/blog/posts/hello-world"
                className="text-green-400 hover:underline inline-flex items-center"
              >
                Read More
                <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </Terminal>
      </main>
      
      <Footer />
    </div>
  );
}
