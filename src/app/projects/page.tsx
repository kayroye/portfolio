'use client';

import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import TerminalText from '@/components/TerminalText';
import { StaticTerminalText } from '@/components/TerminalText';

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
      title: "AI-Powered Task Manager",
      description: "A task management application that uses machine learning to prioritize and categorize tasks based on user behavior patterns.",
      technologies: ["React", "Node.js", "TensorFlow.js", "MongoDB"],
      link: "https://github.com/username/ai-task-manager",
      image: "/images/project1.jpg"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product management, shopping cart, payment processing, and order tracking.",
      technologies: ["Next.js", "Express", "PostgreSQL", "Stripe API"],
      link: "https://github.com/username/ecommerce-platform",
      image: "/images/project2.jpg"
    },
    {
      id: 3,
      title: "Real-time Collaboration Tool",
      description: "A collaborative workspace that allows teams to work together in real-time on documents, code, and design files.",
      technologies: ["Vue.js", "Socket.io", "Redis", "AWS"],
      link: "https://github.com/username/collab-tool",
      image: "/images/project3.jpg"
    },
    {
      id: 4,
      title: "Personal Finance Dashboard",
      description: "A dashboard for tracking personal finances, including expense categorization, budget planning, and financial goal setting.",
      technologies: ["React", "D3.js", "Firebase", "Plaid API"],
      link: "https://github.com/username/finance-dashboard",
      image: "/images/project4.jpg"
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
              <TerminalText 
                typingSpeed={25} 
                onComplete={() => setTypingDone(true)}
              >
                # Projects
                
                Here are some of the projects I&apos;ve worked on. Each project represents a unique challenge and solution.
                
                Use the commands below to explore my portfolio or click on a project to view more details.
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
                <Terminal title="Project Commands">
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-black/40 border border-green-500/30 rounded">
                        <div className="font-bold text-green-300 mb-1">sort --by-tech</div>
                        <div className="text-sm text-green-400">
                          Sort projects by technology stack
                        </div>
                      </div>
                      
                      <div className="p-3 bg-black/40 border border-green-500/30 rounded">
                        <div className="font-bold text-green-300 mb-1">filter --frontend</div>
                        <div className="text-sm text-green-400">
                          Show only frontend projects
                        </div>
                      </div>
                      
                      <div className="p-3 bg-black/40 border border-green-500/30 rounded">
                        <div className="font-bold text-green-300 mb-1">filter --backend</div>
                        <div className="text-sm text-green-400">
                          Show only backend projects
                        </div>
                      </div>
                      
                      <div className="p-3 bg-black/40 border border-green-500/30 rounded">
                        <div className="font-bold text-green-300 mb-1">filter --fullstack</div>
                        <div className="text-sm text-green-400">
                          Show only full-stack projects
                        </div>
                      </div>
                    </div>
                  </div>
                </Terminal>
              </div>
            )}
            
            {showProjects && (
              <div className="mt-6">
                <Terminal title="GitHub Stats">
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="text-lg font-bold text-green-300">30+</div>
                        <div className="text-sm text-green-500">Repositories</div>
                      </div>
                      
                      <div className="mb-4 md:mb-0">
                        <div className="text-lg font-bold text-green-300">500+</div>
                        <div className="text-sm text-green-500">Contributions</div>
                      </div>
                      
                      <div className="mb-4 md:mb-0">
                        <div className="text-lg font-bold text-green-300">15+</div>
                        <div className="text-sm text-green-500">Open Source Projects</div>
                      </div>
                      
                      <div>
                        <div className="text-lg font-bold text-green-300">5+</div>
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