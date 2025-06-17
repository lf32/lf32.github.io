'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  },
  hover: {
    y: -4,
    transition: { duration: 0.2 }
  }
};

const listCardVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  },
  hover: {
    x: 2,
    transition: { duration: 0.2 }
  }
};

export default function BlogList({ blogs, viewMode = 'grid' }) {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  const variants = viewMode === 'grid' ? cardVariants : listCardVariants;

  return (
    <>
      {blogs.map((blog, index) => {
        // Get deterministic gradient for this blog post
        const gradient = getGradientFromString(blog.date);

        return (
          <motion.article
            key={blog.date}
            variants={variants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className={`group ${
              viewMode === 'grid'
                ? 'bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300'
                : 'border-b border-gray-100 last:border-b-0'
            }`}
          >
            <div className="relative">
              <Link 
                href={`/blog/${blog.date}`} 
                className="block h-full"
              >
                {viewMode === 'grid' ? (
                  // Grid View Card
                  <div className="flex flex-col h-full">
                      {/* Header Area with Image or Gradient */}
                      <div className={`relative h-40 ${blog.image ? '' : `bg-gradient-to-br ${gradient.from} ${gradient.to}`}`}>
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <>
                            {/* Gradient background with pattern */}
                            <div className="absolute inset-0 opacity-10">
                              <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${gradient.pattern}`} />
                              <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
                            </div>
                          <div className="absolute inset-0 bg-black/10" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-white text-6xl font-bold opacity-5 transform group-hover:scale-110 transition-transform duration-300">
                              {blog.category?.charAt(0) || 'B'}
                            </div>
                          </div>
                        </>
                      )}
                      
                      {/* Category Badge */}
                      {blog.category && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-blue-700 shadow-sm">
                            {blog.category}
                          </span>
                        </div>
                      )}
                      
                      {/* Reading Time Badge */}
                      {blog.readTime && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
                            <Clock className="w-4 h-4 mr-1.5" />
                            {blog.readTime}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col flex-grow p-5">
                      {/* Title */}
                      <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {blog.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {blog.excerpt}
                      </p>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {blog.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                          {blog.tags.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{blog.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Meta Information */}
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <time dateTime={blog.date} className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            {blog.formattedDate}
                          </time>
                        </div>
                        <div className="flex items-center text-blue-600 text-sm font-medium">
                          Read
                          <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View Card
                  <div className="py-4">
                    <div className="flex items-start gap-4">
                      {/* Thumbnail Image */}
                      {blog.image && (
                        <div className="flex-shrink-0 w-24 h-24 relative rounded-lg overflow-hidden">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                      )}
                      
                      {/* Main Content */}
                      <div className="flex-grow min-w-0">
                        {/* Title */}
                        <h2 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h2>

                        {/* Meta Information */}
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                          {blog.category && (
                            <span className="text-blue-600 font-medium">
                              {blog.category}
                            </span>
                          )}
                          <time dateTime={blog.date}>
                            {blog.formattedDate}
                          </time>
                          {blog.readTime && (
                            <div className="flex items-center">
                              <Clock className="w-3.5 h-3.5 mr-1" />
                              {blog.readTime}
                            </div>
                          )}
                        </div>

                        {/* Excerpt */}
                        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                          {blog.excerpt}
                        </p>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {blog.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs text-gray-600 bg-gray-50"
                              >
                                {tag}
                              </span>
                            ))}
                            {blog.tags.length > 2 && (
                              <span className="text-xs text-gray-400">
                                +{blog.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Read More */}
                      <div className="flex-shrink-0 flex items-center">
                        <div className="text-blue-600 text-sm font-medium">
                          Read
                          <ArrowRight className="w-3.5 h-3.5 ml-1 inline-block transform group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          </motion.article>
        );
      })}
    </>
  );
} 