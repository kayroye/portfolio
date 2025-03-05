import React from 'react';
import Link from 'next/link';

interface FooterProps {
  isBlog?: boolean;
}

export default function Footer({ isBlog = false }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-green-500/30 py-3 px-4 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center text-green-500/70 font-mono text-xs">
        <div className="mb-2 md:mb-0">
          © {currentYear} Kalan Roye. All rights reserved.
        </div>
        
        <div className="flex space-x-4">
          {/* Social Links */}
          <Link 
            href="https://github.com/kayroye" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            GitHub
          </Link>
          <Link 
            href="https://linkedin.com/in/kayroye" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            LinkedIn
          </Link>
          <Link 
            href="https://twitter.com/kayroye" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            Twitter
          </Link>
          {isBlog ? (
            <Link 
              href="/" 
              className="hover:text-green-400 transition-colors"
            >
              Main Site
            </Link>
          ) : (
            <Link 
              href="https://blog.kayroye.com" 
              className="hover:text-green-400 transition-colors"
            >
              Blog
            </Link>
          )}
        </div>
      </div>
      
      <div className="text-center mt-2 text-green-500/50 font-mono text-xs">
        <span>$ echo &quot;Built with Next.js and React&quot;</span>
      </div>
    </footer>
  );
} 