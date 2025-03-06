'use client';

import React from 'react';
import Link from 'next/link';
import Terminal from '@/components/Terminal';
import TerminalText, { StaticTerminalText } from '@/components/TerminalText';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-400">
      <NavigationBar location="404" />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Terminal title="ERROR 404 - NOT FOUND" fullScreen={false}>
          <div className="p-4 space-y-6">
            <TerminalText typingSpeed={20}>
              $ system.locate --path=&quot;/requested/resource&quot;
            </TerminalText>
            
            <StaticTerminalText className="text-red-500 mt-4">
              Error: Resource not found. The path you are looking for does not exist or has been moved.
            </StaticTerminalText>
            
            <div className="mt-8 border-t border-green-500/30 pt-4">
              <StaticTerminalText showPrompt={true} className="mb-4">
                Running diagnostics...
              </StaticTerminalText>
              
              <div className="space-y-2 ml-4">
                <StaticTerminalText>
                  <span className="text-yellow-400">→ Possible causes:</span>
                </StaticTerminalText>
                <ul className="list-disc ml-8 space-y-1 text-green-300">
                  <li>The URL may be misspelled</li>
                  <li>The page may have been moved or deleted</li>
                  <li>You may not have permission to view this resource</li>
                </ul>
              </div>
              
              <div className="mt-6 space-y-2 ml-4">
                <StaticTerminalText>
                  <span className="text-yellow-400">→ Suggested actions:</span>
                </StaticTerminalText>
                <ul className="list-disc ml-8 space-y-1 text-green-300">
                  <li>Check the URL for typos</li>
                  <li>Return to the homepage</li>
                  <li>Try navigating through the site menu</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <Link 
                href="/"
                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 px-4 rounded border border-green-500/40 transition-colors inline-flex items-center justify-center"
              >
                <span className="mr-2">$</span> cd /home
              </Link>
              
              <Link 
                href="/projects"
                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 px-4 rounded border border-green-500/40 transition-colors inline-flex items-center justify-center"
              >
                <span className="mr-2">$</span> cd /projects
              </Link>
              
              <Link 
                href="/blog"
                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 px-4 rounded border border-green-500/40 transition-colors inline-flex items-center justify-center"
              >
                <span className="mr-2">$</span> cd /blog
              </Link>
            </div>
          </div>
        </Terminal>
      </main>
      
      <Footer />
    </div>
  );
} 