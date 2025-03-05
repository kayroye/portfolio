'use client';

import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import TerminalText from '@/components/TerminalText';
import { StaticTerminalText } from '@/components/TerminalText';

export default function About() {
  const [typingDone, setTypingDone] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  
  // After intro is typed, show the skills section
  useEffect(() => {
    if (typingDone) {
      const timer = setTimeout(() => {
        setShowSkills(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [typingDone]);
  
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      <NavigationBar location="about" />
      
      <main className="flex-1 container mx-auto p-4">
        <Terminal title="about.sh | ~/about" className="mb-6">
          <div className="p-4">
            <div className="mb-4">
                <div className="mt-6"># About Me</div>
              <TerminalText 
                typingSpeed={25} 
                onComplete={() => setTypingDone(true)}
              >
                I&apos;m Kalan Roye, a software developer with a passion for creating elegant solutions to complex problems.&nbsp;
                
                With a background in computer science and several years of experience working with a variety of technologies, I specialize in full-stack development, AI integration, and building scalable applications.&nbsp;
                
                When I&apos;m not coding, you can find me catching up on the latest tech news, contributing to open-source projects, or hiking in the summer.
              </TerminalText>
            </div>
            
            {typingDone && (
              <div className="mt-6">
                <StaticTerminalText showPrompt>cat skills.json</StaticTerminalText>
              </div>
            )}
            
            {showSkills && (
              <div className="mt-4 p-4 bg-black/40 border border-green-500/30 rounded">
                <pre className="text-green-400 overflow-x-auto">
{`{
  "languages": [
    "JavaScript/TypeScript",
    "Python",
    "Java",
    "C",
    "Verse"
  ],
  "frontend": [
    "React",
    "Next.js",
    "HTML/CSS",
    "Tailwind CSS"
  ],
  "backend": [
    "Node.js",
    "GraphQL",
    "FastAPI"
  ],
  "databases": [
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Supabase",
    "Firebase"
  ],
  "devOps": [
    "Docker",
    "AWS",
    "Google Cloud",
    "CI/CD",
    "Git",
    "Linux"
  ],
  "AI": [
    "OpenAI API",
    "ComfyUI",
    "Ollama"
  ]
}`}
                </pre>
              </div>
            )}
            
            {showSkills && (
              <div className="mt-6">
                <Terminal title="Experience">
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-green-300">Full-Stack Developer @ Unifor</h3>
                      <div className="text-sm text-green-500 mb-2">December 2024 - January 2025</div>
                      <p className="text-green-400">
                        Revamped Unifor District 300&apos;s website to be more user-friendly and accessible using React, Next.js, and Tailwind CSS.
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-green-300">Data Analyst @ Regional Municipality of Halton</h3>
                      <div className="text-sm text-green-500 mb-2">June 2024 - August 2024</div>
                      <p className="text-green-400">
                        Transformed and migrated 311 operational data, automated classification, configured Salesforce environments, designed executive-level reports/dashboards, and led the creation of Halton Region&apos;s first AI chatbot prototype.
                      </p>
                    </div>
                  </div>
                </Terminal>
              </div>
            )}
            
            {showSkills && (
              <div className="mt-6">
                <Terminal title="Education">
                  <div className="p-4">
                    <div>
                      <h3 className="text-lg font-bold text-green-300">Bachelor of Science - Honours Specialization in Computer Science</h3>
                      <div className="text-sm text-green-500 mb-2">Western University, 2023 - Present</div>
                      <p className="text-green-400">
                        Relevant Courses: Data Structures and Algorithms, Software Tools and Systems Programming, Computer Systems Architecture.
                      </p>
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