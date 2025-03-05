import React, { useState, useRef, FormEvent } from 'react';
import { BlogPost } from '@/utils/blog';
import { uploadMedia } from '@/utils/blog';
import Terminal from './Terminal';
import { StaticTerminalText } from './TerminalText';

interface BlogPostFormProps {
  initialData?: Partial<BlogPost>;
  onSubmit: (post: BlogPost) => Promise<boolean>;
  isEditing?: boolean;
}

export default function BlogPostForm({ 
  initialData, 
  onSubmit, 
  isEditing = false 
}: BlogPostFormProps) {
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0],
    categories: [],
    ...initialData
  });
  
  const [newCategory, setNewCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    initialData?.coverImage || null
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddCategory = () => {
    if (newCategory.trim() && !post.categories?.includes(newCategory.trim())) {
      setPost(prev => ({
        ...prev,
        categories: [...(prev.categories || []), newCategory.trim()]
      }));
      setNewCategory('');
    }
  };
  
  const handleRemoveCategory = (category: string) => {
    setPost(prev => ({
      ...prev,
      categories: prev.categories?.filter(c => c !== category) || []
    }));
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    if (!post.slug) {
      setErrorMessage('Please set a slug before uploading an image.');
      return;
    }
    
    try {
      const url = await uploadMedia(file, post.slug);
      if (url) {
        setUploadedImage(url);
        setPost(prev => ({ ...prev, coverImage: url }));
        setSuccessMessage('Image uploaded successfully.');
      } else {
        setErrorMessage('Failed to upload image.');
      }
    } catch {
      setErrorMessage('Error uploading image.');
    }
  };
  
  const generateSlug = () => {
    if (!post.title) return;
    
    const slug = post.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    setPost(prev => ({ ...prev, slug }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!post.title || !post.content || !post.excerpt || !post.slug) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await onSubmit(post as BlogPost);
      
      if (success) {
        setSuccessMessage(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
        if (!isEditing) {
          // Reset form for new post creation
          setPost({
            title: '',
            content: '',
            excerpt: '',
            date: new Date().toISOString().split('T')[0],
            categories: [],
          });
          setUploadedImage(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      } else {
        setErrorMessage('Failed to save post. Please try again.');
      }
    } catch {
      setErrorMessage('An error occurred while saving the post.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Terminal title={isEditing ? 'Edit Post' : 'Create New Post'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-2 bg-red-900/30 text-red-400 border border-red-500/30 rounded mb-4">
            <StaticTerminalText>{errorMessage}</StaticTerminalText>
          </div>
        )}
        
        {successMessage && (
          <div className="p-2 bg-green-900/30 text-green-400 border border-green-500/30 rounded mb-4">
            <StaticTerminalText>{successMessage}</StaticTerminalText>
          </div>
        )}
        
        <div>
          <label htmlFor="title" className="block text-green-400 mb-1">
            <StaticTerminalText showPrompt>Title:</StaticTerminalText>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title || ''}
            onChange={handleChange}
            className="w-full p-2 bg-black border border-green-500/30 rounded text-green-400 font-mono focus:border-green-500 focus:outline-none"
            required
          />
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="slug" className="block text-green-400 mb-1">
              <StaticTerminalText showPrompt>Slug:</StaticTerminalText>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="slug"
                name="slug"
                value={post.slug || ''}
                onChange={handleChange}
                className="flex-1 p-2 bg-black border border-green-500/30 rounded text-green-400 font-mono focus:border-green-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={generateSlug}
                className="px-3 py-2 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50"
              >
                Generate
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="date" className="block text-green-400 mb-1">
              <StaticTerminalText showPrompt>Date:</StaticTerminalText>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={post.date || ''}
              onChange={handleChange}
              className="w-full p-2 bg-black border border-green-500/30 rounded text-green-400 font-mono focus:border-green-500 focus:outline-none"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="excerpt" className="block text-green-400 mb-1">
            <StaticTerminalText showPrompt>Excerpt:</StaticTerminalText>
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={post.excerpt || ''}
            onChange={handleChange}
            rows={2}
            className="w-full p-2 bg-black border border-green-500/30 rounded text-green-400 font-mono focus:border-green-500 focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-green-400 mb-1">
            <StaticTerminalText showPrompt>Content (Markdown):</StaticTerminalText>
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content || ''}
            onChange={handleChange}
            rows={10}
            className="w-full p-2 bg-black border border-green-500/30 rounded text-green-400 font-mono focus:border-green-500 focus:outline-none"
            required
          />
        </div>
        
        <div>
          <div className="block text-green-400 mb-1">
            <StaticTerminalText showPrompt>Categories:</StaticTerminalText>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories?.map((category, index) => (
              <div 
                key={index} 
                className="flex items-center px-2 py-1 bg-green-900/30 text-green-400 rounded"
              >
                <span className="font-mono text-sm">{category}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category)}
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add a category"
              className="flex-1 p-2 bg-black border border-green-500/30 rounded text-green-400 font-mono focus:border-green-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="px-3 py-2 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50"
            >
              Add
            </button>
          </div>
        </div>
        
        <div>
          <div className="block text-green-400 mb-1">
            <StaticTerminalText showPrompt>Cover Image:</StaticTerminalText>
          </div>
          {uploadedImage && (
            <div className="mb-2">
              <div className="relative w-full h-40 overflow-hidden border border-green-500/30 rounded">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={uploadedImage} 
                  alt="Cover" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="block w-full text-green-400 mt-2"
          />
          <div className="text-green-500/70 text-xs mt-1 font-mono">
            Note: Upload image after setting the post slug.
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-green-900/30 text-green-400 border border-green-500/30 rounded hover:bg-green-900/50 font-mono cursor-pointer ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting 
              ? 'Saving...' 
              : isEditing 
                ? 'Update Post' 
                : 'Create Post'
            }
          </button>
        </div>
      </form>
    </Terminal>
  );
} 