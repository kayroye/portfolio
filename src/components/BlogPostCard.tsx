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
}

export default function BlogPostCard({
  title,
  excerpt,
  date,
  slug,
  categories = [],
  coverImage
}: BlogPostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link href={`/blog/posts/${slug}`} className="block">
      <div className="border border-green-500/30 rounded-md p-4 bg-black/50 hover:border-green-500/70 transition-colors">
        <div className="flex flex-col">
          {coverImage && (
            <div className="relative w-full h-40 mb-3 overflow-hidden">
              <Image
                src={coverImage}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded border border-green-500/20"
              />
            </div>
          )}
          
          <div className="font-mono text-xs text-green-500/70 mb-1">{formattedDate}</div>
          
          <h3 className="text-green-400 text-lg font-semibold font-mono mb-2">{title}</h3>
          
          <p className="text-green-300/80 mb-3 font-mono text-sm">{excerpt}</p>
          
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
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
          
          <div className="mt-2 text-green-500 font-mono text-sm hover:underline">
            Read more →
          </div>
        </div>
      </div>
    </Link>
  );
} 