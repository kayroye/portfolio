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
  const [hasCompleted, setHasCompleted] = useState(false);
  
  useEffect(() => {
    // Skip if already completed
    if (hasCompleted) return;
    
    // Reset when content changes
    setDisplayedText('');
    
    // Delay before starting typing effect
    const timeout = setTimeout(() => {
      setIsTyping(true);
      
      // Split text into words (including spaces, punctuation, and special characters)
      // This regex captures words, spaces, newlines, and punctuation as separate entities
      const words = children.match(/(\S+|\s+)/g) || [];
      
      let currentText = '';
      let wordIndex = 0;
      
      const intervalId = setInterval(() => {
        if (wordIndex < words.length) {
          // Add the next word to displayed text
          currentText += words[wordIndex];
          setDisplayedText(currentText);
          wordIndex++;
        } else {
          // All words displayed
          clearInterval(intervalId);
          setIsTyping(false);
          setHasCompleted(true);
          if (onComplete) onComplete();
        }
      }, typingSpeed * 2); // Slightly longer delay between words
      
      return () => clearInterval(intervalId);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [children, typingSpeed, delay, onComplete, hasCompleted]);
  
  // Process the displayed text to handle both newlines and &nbsp; tags
  const processText = () => {
    // First split by newlines
    const lines = displayedText.split('\n');
    
    return lines.map((line, lineIndex, lineArray) => {
      // Replace &nbsp; with actual non-breaking spaces
      const processedLine = line.replace(/&nbsp;/g, '\u00A0');
      
      return (
        <React.Fragment key={lineIndex}>
          {processedLine}
          {/* Add line break between lines, but not after the last line */}
          {lineIndex < lineArray.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };
  
  return (
    <div className={`font-mono ${className}`}>
      {processText()}
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
  // Process text if children is a string
  const processText = (text: string) => {
    // First split by newlines
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex, lineArray) => {
      // Replace &nbsp; with actual non-breaking spaces
      const processedLine = line.replace(/&nbsp;/g, '\u00A0');
      
      return (
        <React.Fragment key={lineIndex}>
          {processedLine}
          {/* Add line break between lines, but not after the last line */}
          {lineIndex < lineArray.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  const formattedContent = typeof children === 'string' 
    ? processText(children)
    : children;

  return (
    <div className={`font-mono ${className}`}>
      {showPrompt && <span className="text-green-500 mr-2">$</span>}
      {formattedContent}
    </div>
  );
} 