'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/utils/blog';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import { StaticTerminalText } from '@/components/TerminalText';

interface BlogPostParams {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage(props: BlogPostParams) {
  const params = use(props.params);
  const { slug } = params;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Simple content parser for links and code blocks
  const parseContent = (content: string): React.ReactNode[] => {
    if (!content) return [];
    
    // Split the content by code blocks first
    const parts: Array<{ type: 'text' | 'code', content: string }> = [];
    const codeBlockRegex = /```([\s\S]*?)```/g;
    
    let lastIndex = 0;
    let match;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add the text before the code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.substring(lastIndex, match.index)
        });
      }
      
      // Add the code block
      parts.push({
        type: 'code',
        content: match[1]
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex)
      });
    }
    
    // Now, for each text part, parse links and formatting
    const result: React.ReactNode[] = [];
    
    // Helper function to parse text with formatting (bold, italic, underline)
    const parseFormatting = (text: string): React.ReactNode[] => {
      // Process formatting in this order:
      // 1. Bold: **text** or __text__
      // 2. Italic: *text* or _text_
      // 3. Underline: ++text++
      
      const formattingResult: React.ReactNode[] = [];
      
      // Bold pattern: **text** or __text__
      const boldRegex = /(\*\*|__)(.*?)\1/g;
      
      // Italic pattern: *text* or _text_, but not part of bold **
      const italicRegex = /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)|(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g;
      
      // Underline pattern: ++text++
      const underlineRegex = /\+\+(.*?)\+\+/g;
      
      // Start with the input text
      const workingText = text;
      const segments: Array<{type: 'text' | 'bold' | 'italic' | 'underline', content: string, index: number}> = [];
      
      // Find all bold matches
      let boldMatch;
      while ((boldMatch = boldRegex.exec(workingText)) !== null) {
        segments.push({
          type: 'bold',
          content: boldMatch[2],
          index: boldMatch.index
        });
      }
      
      // Find all italic matches
      let italicMatch;
      while ((italicMatch = italicRegex.exec(workingText)) !== null) {
        // Get the actual text inside the * or _
        const content = italicMatch[1] || italicMatch[2];
        segments.push({
          type: 'italic',
          content,
          index: italicMatch.index
        });
      }
      
      // Find all underline matches
      let underlineMatch;
      while ((underlineMatch = underlineRegex.exec(workingText)) !== null) {
        segments.push({
          type: 'underline',
          content: underlineMatch[1],
          index: underlineMatch.index
        });
      }
      
      // If no formatting, return the text as is
      if (segments.length === 0) {
        return [text];
      }
      
      // Sort segments by their starting index
      segments.sort((a, b) => a.index - b.index);
      
      // Apply the formatting in order
      let lastProcessedIndex = 0;
      
      for (const segment of segments) {
        // Get the original matched string including the markers
        let originalMatch = '';
        if (segment.type === 'bold') {
          originalMatch = `**${segment.content}**`; // Using ** for simplicity
        } else if (segment.type === 'italic') {
          originalMatch = `*${segment.content}*`; // Using * for simplicity
        } else if (segment.type === 'underline') {
          originalMatch = `++${segment.content}++`;
        }
        
        // Add text before this formatted segment
        if (segment.index > lastProcessedIndex) {
          formattingResult.push(workingText.substring(lastProcessedIndex, segment.index));
        }
        
        // Add the formatted segment
        if (segment.type === 'bold') {
          formattingResult.push(<strong key={`bold-${segment.index}`} className="text-green-300">{segment.content}</strong>);
        } else if (segment.type === 'italic') {
          formattingResult.push(<em key={`italic-${segment.index}`} className="text-green-200">{segment.content}</em>);
        } else if (segment.type === 'underline') {
          formattingResult.push(<u key={`underline-${segment.index}`}>{segment.content}</u>);
        }
        
        lastProcessedIndex = segment.index + originalMatch.length;
      }
      
      // Add any remaining text
      if (lastProcessedIndex < workingText.length) {
        formattingResult.push(workingText.substring(lastProcessedIndex));
      }
      
      return formattingResult;
    };
    
    parts.forEach((part, index) => {
      if (part.type === 'code') {
        // Render code block
        result.push(
          <div key={`code-${index}`} className="bg-green-900/20 p-3 rounded border border-green-500/20 font-mono my-4 overflow-x-auto">
            <pre>{part.content}</pre>
          </div>
        );
      } else {
        // Parse links in text
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const textContent = part.content;
        const textParts: React.ReactNode[] = [];
        let lastTextIndex = 0;
        let linkMatch;
        
        while ((linkMatch = linkRegex.exec(textContent)) !== null) {
          // Add text before the link, applying formatting
          if (linkMatch.index > lastTextIndex) {
            const textBeforeLink = textContent.substring(lastTextIndex, linkMatch.index);
            textParts.push(...parseFormatting(textBeforeLink));
          }
          
          // Add the link
          const [, linkText, linkUrl] = linkMatch;
          textParts.push(
            <a
              key={`link-${linkMatch.index}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              {linkText}
            </a>
          );
          
          lastTextIndex = linkMatch.index + linkMatch[0].length;
        }
        
        // Add any remaining text, applying formatting
        if (lastTextIndex < textContent.length) {
          const remainingText = textContent.substring(lastTextIndex);
          textParts.push(...parseFormatting(remainingText));
        }
        
        // Split by newlines and create paragraphs
        let currentParagraph: React.ReactNode[] = [];
        const paragraphs: React.ReactNode[] = [];
        
        textParts.forEach((textPart, i) => {
          if (typeof textPart === 'string') {
            // Split by newlines
            const lines = textPart.split('\n');
            
            lines.forEach((line, lineIndex) => {
              // Add the line
              currentParagraph.push(line);
              
              // If not the last line, add a line break or start a new paragraph
              if (lineIndex < lines.length - 1) {
                // Two consecutive newlines = new paragraph
                if (line === '') {
                  if (currentParagraph.length > 0) {
                    paragraphs.push(
                      <p key={`p-${index}-${paragraphs.length}`} className="mb-4">
                        {currentParagraph}
                      </p>
                    );
                    currentParagraph = [];
                  }
                } else {
                  // Single newline = line break
                  currentParagraph.push(<br key={`br-${index}-${i}-${lineIndex}`} />);
                }
              }
            });
          } else {
            // Add React elements (like links, bold, italic, underline) directly
            currentParagraph.push(textPart);
          }
        });
        
        // Add any remaining paragraph
        if (currentParagraph.length > 0) {
          paragraphs.push(
            <p key={`p-${index}-${paragraphs.length}`} className="mb-4">
              {currentParagraph}
            </p>
          );
        }
        
        result.push(...paragraphs);
      }
    });
    
    return result;
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/blog?slug=${slug}`);
        
        if (response.ok) {
          const postData = await response.json();
          
          // The content is already a string, no need to parse it
          setPost(postData);
          
          // Track the view
          trackView(slug);
        } else if (response.status === 404) {
          setErrorMessage('Post not found.');
        } else {
          setErrorMessage('Failed to load post. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setErrorMessage('Failed to load post. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  // Function to track the view
  const trackView = async (postSlug: string) => {
    try {
      await fetch(`/api/blog/views?slug=${postSlug}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      <NavigationBar location="blog" />
      
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
                <h1 className="text-2xl font-bold text-green-300 mb-2">{post.title}.txt</h1>
                
                <div className="flex items-center text-sm mb-4">
                  <div className="text-green-500/70 mr-4">
                    {formatDate(post.date)}
                  </div>
                  
                  {post.author && (
                    <div className="text-green-500/70 mr-4">
                      By {post.author}
                    </div>
                  )}
                  
                  <div className="text-green-500/70 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {post.views?.length || 0} views
                  </div>
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
                className="prose prose-sm prose-invert prose-green max-w-none font-mono space-y-4
                           prose-headings:text-green-300 prose-a:text-green-400 prose-a:no-underline hover:prose-a:text-green-300
                           prose-code:bg-green-900/20 prose-code:text-green-300 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                           prose-pre:bg-green-900/20 prose-pre:text-green-300 prose-pre:border prose-pre:border-green-500/20
                           prose-blockquote:border-green-500 prose-blockquote:bg-green-900/20 prose-blockquote:text-green-300
                           prose-strong:text-green-300 prose-em:text-green-200
                           prose-p:mb-4 prose-p:leading-relaxed"
              >
                {parseContent(typeof post.content === 'string' ? post.content : String(post.content))}
              </div>
            </div>
          </Terminal>
        ) : null}
      </main>
      
      <Footer isBlog={true} />
    </div>
  );
} 