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
  
  // After intro is typed, show the buttons
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
        <Terminal title="kayroye.com | Terminal" className="mb-6">
          <div className="p-4">
            <div className="mb-4">
              <TerminalText 
                typingSpeed={25} 
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
        
        <Terminal title="Featured Project">
          <div className="p-4">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-green-300">Project Title</h2>
              <div className="text-sm text-green-500 mb-3">
                Technologies: React, Node.js, TypeScript
              </div>
            </div>
            
            <p className="mb-4">
              Brief description of the featured project. This section showcases one of your best works
              to immediately capture visitors&apos; attention.
            </p>
            
            <Link 
              href="/projects"
              className="text-green-400 hover:underline inline-flex items-center"
            >
              View Project Details
              <span className="ml-1">→</span>
            </Link>
          </div>
        </Terminal>
      </main>
      
      <Footer />
    </div>
  );
}
