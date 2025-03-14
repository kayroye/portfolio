'use client';

import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import TerminalText from '@/components/TerminalText';
import { StaticTerminalText } from '@/components/TerminalText';
import Script from 'next/script';


export default function Contact() {
  const [typingDone, setTypingDone] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // After intro is typed, show the contact info
  useEffect(() => {
    if (typingDone) {
      const timer = setTimeout(() => {
        setShowContactInfo(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [typingDone]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare mailto URL with form data
    const subject = `Message from ${formData.name} via Portfolio Site`;
    const body = `${formData.message}`;
    const mailtoUrl = `mailto:hello@kalanroye.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open mail client
    window.location.href = mailtoUrl;
    
    // Show success message
    setFormStatus('success');
    
    // Reset form after delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setFormStatus('idle');
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      <Script id="schema-contact" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Kalan Roye",
            "description": "Get in touch with Kalan Roye for freelance work, job opportunities, or just to say hello.",
            "mainEntity": {
              "@type": "Person",
              "name": "Kalan Roye",
              "email": "hello@kalanroye.com",
              "jobTitle": "Software Developer",
              "url": "https://kalanroye.com",
              "sameAs": [
                "https://github.com/kayroye",
                "https://linkedin.com/in/kalan-roye",
                "https://x.com/kaywritescode"
              ]
            }
          }
        `}
      </Script>
      
      <NavigationBar location="contact" />
      
      <main className="flex-1 container mx-auto p-4">
        <h1 className="sr-only">Contact Kalan Roye</h1>
        <section aria-label="Contact Information">
          <Terminal title="contact.sh | ~/contact" className="mb-6">
            <div className="p-4">
              <div className="mb-4">
                <header>
                  <h2 className="mt-6">
                    # Contact Information
                  </h2>
                </header>
                <TerminalText 
                  typingSpeed={15} 
                  onComplete={() => setTypingDone(true)}
                >
                  I&apos;m always open to new opportunities, collaborations, or just a friendly chat about the latest tech.
                  
                  Feel free to reach out through any of the channels below or use the contact form to send me a message directly.
                </TerminalText>
              </div>
              
              {typingDone && (
                <div className="mt-6">
                  <StaticTerminalText showPrompt>cat contact_info.txt</StaticTerminalText>
                </div>
              )}
              
              {showContactInfo && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-black/40 border border-green-500/30 rounded">
                    <h3 className="text-lg font-bold text-green-300 mb-4">Contact Details</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-green-500">Email</div>
                        <a href="mailto:hello@kalanroye.com" className="text-green-300 hover:underline">
                          hello@kalanroye.com
                        </a>
                      </div>
                      
                      <div>
                        <div className="text-sm text-green-500">Location</div>
                        <div className="text-green-300">Toronto, ON</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-green-500">Open To</div>
                        <div className="text-green-300">Freelance, Full-Time, and Internship Opportunities</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-md font-bold text-green-300 mb-3">Social Links</h4>
                      <div className="flex space-x-4">
                        <a 
                          href="https://github.com/kayroye" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300"
                          aria-label="Visit Kalan Roye's GitHub profile"
                        >
                          GitHub
                        </a>
                        <a 
                          href="https://linkedin.com/in/kalan-roye" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300"
                          aria-label="Connect with Kalan Roye on LinkedIn"
                        >
                          LinkedIn
                        </a>
                        <a 
                          href="https://x.com/kaywritescode" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300"
                          aria-label="Follow Kalan Roye on X (formerly Twitter)"
                        >
                          X (formerly Twitter)
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-black/40 border border-green-500/30 rounded">
                    <h3 className="text-lg font-bold text-green-300 mb-4">Send a Message</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm text-green-500 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-black border border-green-500/30 rounded p-2 text-green-300 focus:border-green-500 focus:outline-none"
                          aria-required="true"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm text-green-500 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-black border border-green-500/30 rounded p-2 text-green-300 focus:border-green-500 focus:outline-none"
                          aria-required="true"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm text-green-500 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full bg-black border border-green-500/30 rounded p-2 text-green-300 focus:border-green-500 focus:outline-none resize-none"
                          aria-required="true"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="px-4 py-2 bg-green-900/30 text-green-300 border border-green-500/30 rounded hover:bg-green-900/50 transition-colors disabled:opacity-50"
                        aria-label="Send message to Kalan Roye"
                      >
                        {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                      </button>
                      
                      {formStatus === 'success' && (
                        <div className="text-green-300 mt-2" role="alert">
                          Message sent successfully! Don&apos;t forget to click send! I&apos;ll get back to you soon.
                        </div>
                      )}
                      
                      {formStatus === 'error' && (
                        <div className="text-red-400 mt-2" role="alert">
                          There was an error sending your message. Please try again.
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              )}
              
              {showContactInfo && (
                <section aria-label="Contact Commands" className="mt-6">
                  <Terminal title="Contact Commands">
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-black/40 border border-green-500/30 rounded">
                          <div className="font-bold text-green-300 mb-1">schedule --meeting</div>
                          <div className="text-sm text-green-400">
                            Schedule a virtual meeting
                          </div>
                        </div>
                        
                        <div className="p-3 bg-black/40 border border-green-500/30 rounded">
                          <div className="font-bold text-green-300 mb-1">download --resume</div>
                          <div className="text-sm text-green-400">
                            Download my resume as PDF
                          </div>
                        </div>
                        
                        <div className="p-3 bg-black/40 border border-green-500/30 rounded">
                          <div className="font-bold text-green-300 mb-1">connect --linkedin</div>
                          <div className="text-sm text-green-400">
                            Connect with me on LinkedIn
                          </div>
                        </div>
                        
                        <div className="p-3 bg-black/40 border border-green-500/30 rounded">
                          <div className="font-bold text-green-300 mb-1">view --availability</div>
                          <div className="text-sm text-green-400">
                            Check my current availability
                          </div>
                        </div>
                      </div>
                    </div>
                  </Terminal>
                </section>
              )}
            </div>
          </Terminal>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 