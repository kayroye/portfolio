'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [hostname, setHostname] = useState<string>('');
  const [subdomain, setSubdomain] = useState<string>('');

  useEffect(() => {
    // Get the hostname from the window object
    const currentHostname = window.location.hostname;
    setHostname(currentHostname);
    
    // Extract subdomain using the same regex pattern as in middleware
    const subdomainMatch = currentHostname.match(/^([^.]+)\./);
    const extractedSubdomain = subdomainMatch ? subdomainMatch[1] : 'none';
    setSubdomain(extractedSubdomain);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Subdomain Debug Page</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Hostname:</h2>
          <code className="bg-gray-200 p-2 rounded block">{hostname}</code>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Detected Subdomain:</h2>
          <code className="bg-gray-200 p-2 rounded block">{subdomain}</code>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold mb-2">How Routing Works:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>No subdomain or www:</strong> Routes to /app directory</li>
          <li><strong>blog subdomain:</strong> Routes to /blog directory</li>
          <li><strong>Other subdomains:</strong> Default Next.js behavior</li>
        </ul>
      </div>
    </div>
  );
} 