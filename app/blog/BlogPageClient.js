'use client';

import { useState, useEffect, useMemo } from 'react';
import BlogList from '../components/BlogList';
import { Search, Filter, Clock, TrendingUp, Calendar, ChevronDown, ArrowLeft, Tag, Bookmark, Share2, Eye } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
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
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 gradient-text">lf32's Blog_</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Insights, tutorials, and experiences from my journey in software development and cybersecurity
          </p>

          {/* Search and Filter Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, content, or tags..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <Filter className="h-4 w-4" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>

          {/* Filters Section */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8"
              >
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => toggleCategory(category.name)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedCategories.includes(category.name)
                            ? `bg-${category.color}-100 text-${category.color}-700 border-2 border-${category.color}-200`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <span>{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort and View Controls */}
                <div className="flex items-center justify-center gap-4">
                  <div className="relative">
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Filter className="h-4 w-4" />
                      <span>Sort by</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isFilterOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                        >
                          {sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSortBy(option.value);
                                setIsFilterOpen(false);
                              }}
                              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                                sortBy === option.value ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <option.icon className="h-4 w-4" />
                                <div>
                                  <div className="font-medium">{option.label}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors duration-200 ${
                        viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      aria-label="Grid view"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors duration-200 ${
                        viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      aria-label="List view"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || searchQuery) && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {selectedCategories.map(category => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {category}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              ))}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-gray-900"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-gray-500 mt-6">
            {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recently Viewed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyViewed.slice(0, 3).map(blog => (
                <Link
                  key={blog.date}
                  href={`/blog/${blog.date}`}
                  className="group block bg-white rounded-lg border border-gray-100 p-4 hover:border-blue-200 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <Bookmark className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
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
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'}>
          <BlogList blogs={filteredBlogs} viewMode={viewMode} />
        </div>

        {/* No Results State */}
        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="mb-4">
              <Search className="w-12 h-12 text-gray-400 mx-auto" />
            </div>
            <p className="text-gray-600 mb-4">No articles found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
} 