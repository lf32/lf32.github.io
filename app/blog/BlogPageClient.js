'use client';

import { useState, useEffect, useMemo } from 'react';
import BlogList from '../components/BlogList';
import { Search, Filter, Clock, TrendingUp, Calendar, ChevronDown, ArrowLeft, Tag, Bookmark, Share2, Eye, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';

// Categories with their respective colors and icons
const categories = [
  { name: 'Web Development', color: 'blue', icon: '🌐' },
  { name: 'Security Research', color: 'green', icon: '🔒' },
  { name: 'Software Engineering', color: 'purple', icon: '💻' },
  { name: 'Open Source', color: 'orange', icon: '📦' },
  { name: 'Supply Chain Security', color: 'red', icon: '🔗' },
  { name: 'Malware', color: 'yellow', icon: '🦠' },
  { name: 'Red Teaming', color: 'pink', icon: '🎯' },
  { name: 'Ransomware', color: 'indigo', icon: '💰' },
  { name: 'Anime', color: 'cyan', icon: '🎌' }
];

// Sort options with improved labels
const sortOptions = [
  { value: 'date-desc', label: 'Newest First', icon: Calendar },
  { value: 'date-asc', label: 'Oldest First', icon: Clock },
  { value: 'readtime', label: 'Reading Time', icon: TrendingUp }
];

export default function BlogPageClient({ initialBlogs }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('date-desc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load recently viewed posts from localStorage
  useEffect(() => {
    const viewed = localStorage.getItem('recentlyViewedPosts');
    if (viewed) {
      setRecentlyViewed(JSON.parse(viewed));
    }
  }, []);

  // Filter and sort blogs with improved performance
  const filteredBlogs = useMemo(() => {
    let result = [...initialBlogs];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(blog => 
        blog.title?.toLowerCase().includes(query) ||
        blog.excerpt?.toLowerCase().includes(query) ||
        blog.category?.toLowerCase().includes(query) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(blog =>
        selectedCategories.includes(blog.category)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'readtime':
        result.sort((a, b) => {
          const aTime = parseInt(a.readTime) || 0;
          const bTime = parseInt(b.readTime) || 0;
          return aTime - bTime;
        });
        break;
    }

    return result;
  }, [initialBlogs, searchQuery, selectedCategories, sortBy]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSortBy('date-desc');
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Blog</h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-4">Insights, tutorials, and experiences from my journey in software development and cybersecurity.</p>
          <div className="border-b border-gray-800" />
        </header>
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="block w-full pl-9 pr-3 py-2 border border-gray-800 rounded-lg bg-black text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                >
                  ×
                </button>
              )}
            </div>
            {/* Categories */}
            <div className="flex flex-wrap gap-2 ml-2">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.name);
                return (
                  <button
                    key={category.name}
                    onClick={() => toggleCategory(category.name)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200
                      ${isSelected
                        ? 'bg-gray-800 text-white border-gray-600'
                        : 'bg-black text-gray-400 border-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-700'}
                    `}
                    style={{ lineHeight: 1.2 }}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Sort */}
          <div className="flex gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1.5 rounded text-xs font-medium border transition-all duration-200
                  ${sortBy === option.value 
                    ? 'bg-gray-800 text-white border-gray-600' 
                    : 'bg-black text-gray-400 border-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-700'}
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        {/* Active Filters */}
        {(selectedCategories.length > 0 || searchQuery) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedCategories.map(category => (
              <span
                key={category}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-white rounded-full text-xs border border-gray-600 font-medium"
              >
                {category}
                <button
                  onClick={() => toggleCategory(category)}
                  className="ml-1 p-0.5 hover:bg-gray-700 rounded-full transition-colors duration-200"
                  aria-label={`Remove ${category}`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-900 text-white rounded-full text-xs border border-gray-700 font-medium">
                <Search className="w-3 h-3" />
                "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-1 p-0.5 hover:bg-gray-700 rounded-full transition-colors duration-200"
                  aria-label="Remove search filter"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {(selectedCategories.length > 0 || searchQuery) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs text-gray-400 hover:text-white font-medium bg-gray-900 hover:bg-gray-800 rounded-full border border-gray-700 transition-all duration-200"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear all
              </button>
            )}
          </div>
        )}
        {/* Blog List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogList blogs={filteredBlogs} viewMode="grid" />
        </div>
        {/* No Results State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-8 h-8 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-3 text-lg">No articles found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="text-gray-400 hover:text-white font-medium text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 