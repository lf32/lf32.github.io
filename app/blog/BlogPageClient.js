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
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 gradient-text">lf32's Blog_</h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6">
            Insights, tutorials, and experiences from my journey in software development and cybersecurity
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const isSelected = selectedCategories.includes(category.name);
                    return (
                      <button
                        key={category.name}
                        onClick={() => toggleCategory(category.name)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200
                          ${isSelected
                            ? `bg-${category.color}-50 text-${category.color}-700 border-${category.color}-200 shadow-sm`
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300'}
                        `}
                        style={{ lineHeight: 1.2 }}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                        {isSelected && (
                          <span
                            className="ml-1 flex items-center justify-center w-4 h-4 rounded-full hover:bg-opacity-80 transition-colors duration-200"
                            style={{ background: 'transparent' }}
                            onClick={e => { e.stopPropagation(); toggleCategory(category.name); }}
                            aria-label={`Remove ${category.name}`}
                          >
                            <svg className="w-3 h-3 text-${category.color}-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort Controls */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Sort by
                </h3>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 border ${
                        sortBy === option.value 
                          ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm' 
                          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <option.icon className="h-4 w-4" />
                      <span className="flex-1">{option.label}</span>
                      {sortBy === option.value && (
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 || searchQuery) && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Active Filters
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(category => (
                      <span
                        key={category}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-200 font-medium"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {category}
                        <button
                          onClick={() => toggleCategory(category)}
                          className="ml-1 p-0.5 hover:bg-blue-100 rounded-full transition-colors duration-200"
                          aria-label={`Remove ${category}`}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs border border-gray-200 font-medium">
                        <Search className="w-3 h-3" />
                        "{searchQuery}"
                        <button
                          onClick={() => setSearchQuery('')}
                          className="ml-1 p-0.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
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
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs text-gray-600 hover:text-gray-800 font-medium bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition-all duration-200"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Results Count */}
              <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Blog List */}
          <div className="lg:col-span-3">
            {/* Recently Viewed Section */}
            {recentlyViewed.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Recently Viewed</h2>
                <div className="space-y-2">
                  {recentlyViewed.slice(0, 3).map(blog => (
                    <Link
                      key={blog.date}
                      href={`/blog/${blog.date}`}
                      className="group block bg-gray-50 rounded-lg border border-gray-100 p-3 hover:border-blue-200 transition-colors duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                          <Bookmark className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1 text-sm">
                            {blog.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(blog.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Blog List */}
            <div className="space-y-2">
              <BlogList blogs={filteredBlogs} viewMode="list" />
            </div>

            {/* No Results State */}
            {filteredBlogs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="mb-3">
                  <Search className="w-8 h-8 text-gray-400 mx-auto" />
                </div>
                <p className="text-gray-600 mb-3 text-sm">No articles found matching your criteria</p>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 