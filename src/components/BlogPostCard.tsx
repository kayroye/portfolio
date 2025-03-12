import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  categories?: string[];
  coverImage?: string;
  viewCount?: number;
}

export default function BlogPostCard({
  title,
  excerpt,
  date,
  slug,
  categories = [],
  coverImage,
  viewCount = 0
}: BlogPostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link href={`/blog/posts/${slug}`} className="block h-full">
      <div className="border border-green-500/30 rounded-md p-4 bg-black/50 hover:border-green-500/70 transition-colors h-[250px] flex flex-col">
        <div className="flex flex-col h-full">
          {coverImage && (
            <div className="relative w-full h-40 mb-3 overflow-hidden flex-shrink-0">
              <Image
                src={coverImage}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded border border-green-500/20"
              />
            </div>
          )}
          
          <div className="flex justify-between items-center mb-1 flex-shrink-0">
            <div className="font-mono text-xs text-green-500/70">{formattedDate}</div>
            <div className="font-mono text-xs text-green-500/70 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {viewCount}
            </div>
          </div>
          
          <h3 className="text-green-400 text-lg font-semibold font-mono mb-2 flex-shrink-0 line-clamp-2">{title}</h3>
          
          <p className="text-green-300/80 mb-3 font-mono text-sm flex-grow overflow-hidden line-clamp-4">{excerpt}</p>
          
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto mb-2 flex-shrink-0">
              {categories.map((category, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-sm font-mono"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          
          <div className="mt-auto text-green-500 font-mono text-sm hover:underline flex-shrink-0">
            Read more →
          </div>
        </div>
      </div>
    </Link>
  );
} 