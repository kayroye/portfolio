import React, { ReactNode } from 'react';

interface TerminalProps {
  children: ReactNode;
  title?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function Terminal({ 
  children, 
  title = 'kayroye.com', 
  fullScreen = false, 
  className = '' 
}: TerminalProps) {
  return (
    <div 
      className={`
        bg-black text-green-400 border border-green-500/30 rounded-md overflow-hidden
        shadow-lg font-mono flex flex-col
        ${fullScreen ? 'h-screen w-screen' : 'w-full'}
        ${className}
      `}
    >
      {/* Terminal Header */}
      <div className="px-4 py-2 bg-black border-b border-green-500/30 flex items-center">
        <div className="flex gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-sm font-medium text-green-400">{title}</div>
      </div>
      
      {/* Terminal Content */}
      <div className="flex-1 p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
} 