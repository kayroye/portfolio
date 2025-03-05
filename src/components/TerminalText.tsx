import React, { useState, useEffect, ReactNode } from 'react';

interface TerminalTextProps {
  children: string;
  typingSpeed?: number;
  showCursor?: boolean;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TerminalText({ 
  children, 
  typingSpeed = 30,
  showCursor = true,
  delay = 0,
  className = '',
  onComplete
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    // Reset when content changes
    setDisplayedText('');
    
    // Delay before starting typing effect
    const timeout = setTimeout(() => {
      setIsTyping(true);
      
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(children.substring(0, i + 1));
        i++;
        
        if (i >= children.length) {
          clearInterval(intervalId);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, typingSpeed);
      
      return () => clearInterval(intervalId);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [children, typingSpeed, delay, onComplete]);
  
  return (
    <div className={`font-mono ${className}`}>
      {displayedText}
      {showCursor && isTyping && (
        <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 animate-pulse"></span>
      )}
    </div>
  );
}

// For static text without typing effect
export function StaticTerminalText({ 
  children, 
  className = '',
  showPrompt = false
}: { 
  children: ReactNode;
  className?: string;
  showPrompt?: boolean;
}) {
  return (
    <div className={`font-mono ${className}`}>
      {showPrompt && <span className="text-green-500 mr-2">$</span>}
      {children}
    </div>
  );
} 