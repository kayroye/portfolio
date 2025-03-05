import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
interface NavigationProps {
  isBlog?: boolean;
}

export default function NavigationBar({ isBlog = false }: NavigationProps) {
  const pathname = usePathname();
  const [commandInput, setCommandInput] = useState('');
  const [showCommands, setShowCommands] = useState(false);
  const router = useRouter();
  
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process command
    const cmd = commandInput.toLowerCase().trim();
    let redirectPath = '';
    
    if (isBlog) {
      // Blog navigation commands
      switch (cmd) {
        case 'home':
        case 'cd /':
          redirectPath = '/blog';
          break;
        case 'posts':
        case 'cd /posts':
          redirectPath = '/blog/posts';
          break;
        case 'main':
        case 'exit':
          redirectPath = '/app';
          break;
        case 'help':
          setShowCommands(true);
          break;
        default:
          // Could add command not found message
          break;
      }
    } else {
      // Main site navigation commands
      switch (cmd) {
        case 'home':
        case 'cd /':
          redirectPath = '/';
          break;
        case 'about':
        case 'cd /about':
          redirectPath = '/about';
          break;
        case 'projects':
        case 'cd /projects':
          redirectPath = '/projects';
          break;
        case 'contact':
        case 'cd /contact':
          redirectPath = '/contact';
          break;
        case 'blog':
          redirectPath = '/blog';
          break;
        case 'help':
          setShowCommands(true);
          break;
        default:
          // Could add command not found message
          break;
      }
    }
    
    // Redirect if needed
    if (redirectPath) {
      router.push(redirectPath);
    }
    
    // Clear input
    setCommandInput('');
  };
  
  return (
    <div className="border-b border-green-500/30 py-3 px-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {isBlog ? (
            <>
              <Link href="/blog" className={`text-sm ${pathname === '/blog' ? 'text-green-300 underline' : 'text-green-600 hover:text-green-400'}`}>
                ~/blog
              </Link>
              <Link href="/blog/posts" className={`text-sm ${pathname.includes('/blog/posts') ? 'text-green-300 underline' : 'text-green-600 hover:text-green-400'}`}>
                ~/blog/posts
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className={`text-sm ${pathname === '/' ? 'text-green-300 underline' : 'text-green-600 hover:text-green-400'}`}>
                ~
              </Link>
              <Link href="/about" className={`text-sm ${pathname === '/about' ? 'text-green-300 underline' : 'text-green-600 hover:text-green-400'}`}>
                ~/about
              </Link>
              <Link href="/projects" className={`text-sm ${pathname === '/projects' ? 'text-green-300 underline' : 'text-green-600 hover:text-green-400'}`}>
                ~/projects
              </Link>
              <Link href="/contact" className={`text-sm ${pathname === '/contact' ? 'text-green-300 underline' : 'text-green-600 hover:text-green-400'}`}>
                ~/contact
              </Link>
            </>
          )}
        </div>
        
        <div>
          {isBlog ? (
            <Link href="/" className="text-sm text-green-600 hover:text-green-400">
              exit
            </Link>
          ) : (
            <Link href="/blog" className="text-sm text-green-600 hover:text-green-400">
              blog
            </Link>
          )}
        </div>
      </div>
      
      <form onSubmit={handleCommandSubmit} className="flex items-center">
        <span className="text-green-500 mr-2">$</span>
        <input
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-700"
          placeholder="Type 'help' for commands..."
        />
      </form>
      
      {showCommands && (
        <div className="mt-2 p-2 bg-black/40 rounded text-green-400 text-sm">
          <div className="font-bold mb-1">Available commands:</div>
          {isBlog ? (
            <ul className="space-y-1">
              <li><code>home</code> or <code>cd /</code> - Go to blog home</li>
              <li><code>posts</code> or <code>cd /posts</code> - View all posts</li>
              <li><code>exit</code> - Return to main site</li>
              <li><code>help</code> - Show available commands</li>
            </ul>
          ) : (
            <ul className="space-y-1">
              <li><code>home</code> or <code>cd /</code> - Go to home page</li>
              <li><code>about</code> or <code>cd /about</code> - View about page</li>
              <li><code>projects</code> or <code>cd /projects</code> - Browse projects</li>
              <li><code>contact</code> or <code>cd /contact</code> - Contact information</li>
              <li><code>blog</code> - Visit the blog</li>
              <li><code>help</code> - Show available commands</li>
            </ul>
          )}
          <button 
            onClick={() => setShowCommands(false)} 
            className="mt-2 text-green-500 hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
} 