'use client';

import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import TerminalText from '@/components/TerminalText';
import { StaticTerminalText } from '@/components/TerminalText';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function Projects() {
  const [typingDone, setTypingDone] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  // After intro is typed, show the projects
  useEffect(() => {
    if (typingDone) {
      const timer = setTimeout(() => {
        setShowProjects(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [typingDone]);
  
  const projects = [
    {
      id: 1,
      title: "Conclave",
      description: "A real-time chat application that allows users to chat in groups with each other and large language models.",
      technologies: ["React.js", "Next.js", "Vercel AI SDK", "Firebase", "Socket.io"],
      link: "https://github.com/kayroye/Conclave",
      image: "/images/conclave.png"
    },
    {
      id: 2,
      title: "Portfolio and Blog",
      description: "This portfolio website you are currently viewing. I also have a blog where I write about my experiences and thoughts on various topics. Check it out at /blog!",
      technologies: ["React.js", "Next.js", "Redis", "Vercel"],
      link: "https://github.com/kayroye/portfolio",
      image: "/images/portfolio.png"
    },
    {
      id: 3,
      title: "Prova",
      description: "A web tool allowing you to interact with API endpoints via a chat interface, powered by OpenAI.",
      technologies: ["React.js", "Next.js", "OpenAI API", "Supabase"],
      link: "https://github.com/kayroye/Prova",
      image: "/images/prova.png"
    },
    {
      id: 4,
      title: "J.Y.N.E",
      description: "Just Your Neighbourhood Executable - A versatile Discord bot built with Discord.js that could do almost anything.",
      technologies: ["Discord.js", "Node.js", "OpenAI API", "MongoDB", "Stable Diffusion", "NLTK", "FFMPEG"],
      link: "https://github.com/kayroye/JYNE",
      image: "/images/jyne.png"
    }
  ];
  
  const handleProjectSelect = (id: number) => {
    setSelectedProject(id === selectedProject ? null : id);
  };
  
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      <NavigationBar location="projects" />
      
      <main className="flex-1 container mx-auto p-4">
        <Terminal title="projects.sh | ~/projects" className="mb-6">
          <div className="p-4">
            <div className="mb-4">
              <div className="mt-6">
                # Projects
              </div>
              <TerminalText 
                typingSpeed={15} 
                onComplete={() => setTypingDone(true)}
              > 
                Here are some of the projects I&apos;ve worked on either in my free time or as part of a larger assignment. Feel free to click on any to view more details. Each project&apos;s code is available on GitHub.
              </TerminalText>
            </div>
            
            {typingDone && (
              <div className="mt-6">
                <StaticTerminalText showPrompt>ls -la ./projects</StaticTerminalText>
              </div>
            )}
            
            {showProjects && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    className={`
                      p-4 bg-black/40 border border-green-500/30 rounded cursor-pointer
                      hover:bg-green-900/20 transition-colors
                      ${selectedProject === project.id ? 'bg-green-900/30 border-green-500/50' : ''}
                    `}
                    onClick={() => handleProjectSelect(project.id)}
                  >
                    <h3 className="text-lg font-bold text-green-300">{project.title}</h3>
                    <div className="text-sm text-green-500 mb-2">
                      {project.technologies.join(" • ")}
                    </div>
                    
                    {selectedProject === project.id && (
                      <div className="mt-3 border-t border-green-500/30 pt-3">
                        <p className="text-green-400 mb-3">
                          {project.description}
                        </p>
                        <AspectRatio ratio={16 / 9}>
                          <Image src={project.image} alt={project.title} fill className="object-cover" />
                        </AspectRatio>
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-300 hover:underline inline-flex items-center"
                        >
                          View Project
                          <span className="ml-1">→</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {showProjects && (
              <div className="mt-6">
                <Terminal title="GitHub Stats">
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="text-lg font-bold text-green-300">9+</div>
                        <div className="text-sm text-green-500">Repositories</div>
                      </div>
                      
                      <div className="mb-4 md:mb-0">
                        <div className="text-lg font-bold text-green-300">250+</div>
                        <div className="text-sm text-green-500">Contributions</div>
                      </div>
                      
                      <div className="mb-4 md:mb-0">
                        <div className="text-lg font-bold text-green-300">3</div>
                        <div className="text-sm text-green-500">Open Source Projects</div>
                      </div>
                      
                      <div>
                        <div className="text-lg font-bold text-green-300">8+</div>
                        <div className="text-sm text-green-500">Years Coding</div>
                      </div>
                    </div>
                  </div>
                </Terminal>
              </div>
            )}
          </div>
        </Terminal>
      </main>
      
      <Footer />
    </div>
  );
} 