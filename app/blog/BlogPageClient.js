'use client';

import { useState, useMemo } from 'react';
import BlogList from '../components/BlogList';
import { Search } from 'lucide-react';
import Link from 'next/link';
import FeaturedBlogPost from '../components/FeaturedBlogPost';

const categories = ['All', 'Web Development', 'Security Research', 'Software Engineering', 'Open Source', 'Supply Chain Security', 'Malware', 'Red Teaming', 'Ransomware', 'Anime'];

export default function BlogPageClient({ initialBlogs }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBlogs = useMemo(() => {
    let result = [...initialBlogs];
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(blog => 
        blog.title?.toLowerCase().includes(query) ||
        blog.excerpt?.toLowerCase().includes(query) ||
        blog.category?.toLowerCase().includes(query) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    if (selectedCategory !== 'All') {
        result = result.filter(blog => blog.category === selectedCategory);
    }
    return result;
  }, [initialBlogs, searchQuery, selectedCategory]);
  
  const featuredBlog = useMemo(() => {
    return filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  }, [filteredBlogs]);

  const otherBlogs = useMemo(() => {
    return filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];
  }, [filteredBlogs]);


  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                &larr; Back to Home
            </Link>
        </div>
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and experiences from my journey in software development and cybersecurity.
          </p>
        </header>

        <div className="mb-8 flex justify-center flex-wrap gap-2">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium border transition-all duration-200
                        ${selectedCategory === category
                            ? 'bg-gray-800 text-white border-gray-600'
                            : 'bg-black text-gray-400 border-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-700'
                        }
                    `}
                >
                    {category}
                </button>
            ))}
        </div>

        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="block w-full pl-12 pr-4 py-3 border border-gray-800 bg-black text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
        
        <FeaturedBlogPost blog={featuredBlog} />

        <div className="flex flex-col items-center">
          <BlogList blogs={otherBlogs} viewMode="list" />
        </div>
        
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 