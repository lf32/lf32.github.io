'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

// Gradient combinations for the blog cards
const gradientCombinations = [
  {
    from: 'from-blue-600',
    to: 'to-purple-700',
    pattern: 'from-white via-transparent to-transparent'
  },
  {
    from: 'from-indigo-600',
    to: 'to-pink-600',
    pattern: 'from-white via-transparent to-transparent'
  },
  {
    from: 'from-emerald-600',
    to: 'to-teal-700',
    pattern: 'from-white via-transparent to-transparent'
  },
  {
    from: 'from-violet-600',
    to: 'to-fuchsia-600',
    pattern: 'from-white via-transparent to-transparent'
  },
  {
    from: 'from-rose-600',
    to: 'to-orange-500',
    pattern: 'from-white via-transparent to-transparent'
  },
  {
    from: 'from-cyan-600',
    to: 'to-blue-700',
    pattern: 'from-white via-transparent to-transparent'
  }
];

// Function to get a deterministic gradient based on a string
const getGradientFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const index = Math.abs(hash) % gradientCombinations.length;
  return gradientCombinations[index];
};

// Animation variants for card hover
const cardVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

// Animation variants for card content
const contentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Animation variants for header gradient
const headerVariants = {
  initial: { opacity: 0.8 },
  hover: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setBlogs(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 relative overflow-hidden" id="blog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Blog_</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Insights, tutorials, and experiences from my journey in cybersecurity and software development
            </p>
          </div>

          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                {/* Card Header Skeleton */}
                <div className="h-40 sm:h-48 bg-gray-200 animate-pulse" />
                
                {/* Card Content Skeleton */}
                <div className="p-4 sm:p-6">
                  {/* Category Badge Skeleton */}
                  <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse mb-4" />
                  
                  {/* Title Skeleton */}
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-3" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-3/4" />
                  
                  {/* Excerpt Skeleton */}
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-5/6" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-4/6" />
                  
                  {/* Meta Information Skeleton */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-20 relative overflow-hidden" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Blog_</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tutorials, and experiences from my journey in cybersecurity and software development
          </p>
        </motion.div>

        {/* Latest Blog Posts Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {blogs.map((blog, index) => {
              // Get deterministic gradient for this blog post
              const gradient = getGradientFromString(blog.date);

              return (
                <motion.article
                  key={blog.date}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  onHoverStart={() => setHoveredCard(blog.date)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 hover:border-blue-100"
                  style={{
                    zIndex: hoveredCard === blog.date ? 10 : 1
                  }}
                >
                  <Link href={`/blog/${blog.date}`} className="block h-full">
                    {/* Card Header with Image or Gradient */}
                    <motion.div 
                      variants={headerVariants}
                      className={`relative h-40 sm:h-48 overflow-hidden ${blog.image ? '' : `bg-gradient-to-br ${gradient.from} ${gradient.to}`}`}
                    >
                      {blog.image ? (
                        <>
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 2}
                          />
                          <motion.div 
                            className="absolute inset-0 bg-black/10"
                            whileHover={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                            transition={{ duration: 0.3 }}
                          />
                        </>
                      ) : (
                        <>
                          {/* Gradient background with pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${gradient.pattern}`} />
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
                          </div>
                          <motion.div 
                            className="absolute inset-0 bg-black/10"
                            whileHover={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <div className="text-white text-4xl sm:text-5xl font-bold opacity-10">
                              {blog.category?.charAt(0) || 'B'}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </motion.div>

                    {/* Card Content */}
                    <motion.div 
                      variants={contentVariants}
                      className="p-4 sm:p-6 h-full flex flex-col"
                    >
                      {/* Category Badge */}
                      {blog.category && (
                        <motion.div 
                          className="mb-3 sm:mb-4"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            {blog.category}
                          </span>
                        </motion.div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 flex-grow line-clamp-2 sm:line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 border-t border-gray-100 pt-3 sm:pt-4 mt-auto space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                            <time dateTime={blog.date}>{blog.formattedDate}</time>
                          </div>
                          {blog.readTime && (
                            <div className="flex items-center">
                              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                              <span>{blog.readTime}</span>
                            </div>
                          )}
                        </div>
                        <motion.div 
                          className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          Read More
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View All Blogs Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-sm sm:text-base"
            >
              View All Posts
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog; 