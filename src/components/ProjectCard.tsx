import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  technologies,
  projectUrl,
  githubUrl
}: ProjectCardProps) {
  return (
    <div className="border border-green-500/30 rounded-md p-4 bg-black/50 hover:border-green-500/70 transition-colors">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-green-400 text-lg font-semibold font-mono">{title}</h3>
          <div className="flex gap-2">
            {githubUrl && (
              <Link 
                href={githubUrl}
                className="text-green-500 hover:text-green-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-mono text-sm">[GitHub]</span>
              </Link>
            )}
            {projectUrl && (
              <Link 
                href={projectUrl}
                className="text-green-500 hover:text-green-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-mono text-sm">[Live]</span>
              </Link>
            )}
          </div>
        </div>
        
        {imageSrc && (
          <div className="relative w-full h-40 mb-3 overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded border border-green-500/20"
            />
          </div>
        )}
        
        <p className="text-green-300/80 mb-3 font-mono text-sm">{description}</p>
        
        <div className="mt-auto">
          <div className="font-mono text-xs text-green-500/70 mb-1">Technologies:</div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-sm font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 