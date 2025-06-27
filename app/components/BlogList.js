'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

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
        return (
          <motion.article
            key={blog.date}
            variants={variants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className={`group transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-800 shadow-xl hover:scale-[1.025] hover:border-blue-400'
                : 'border-b border-gray-800 last:border-b-0 bg-gray-900 rounded-xl shadow-md hover:scale-[1.01]'
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
                      <div className={`relative h-40 ${blog.image ? '' : 'bg-gray-800'}`}>
                      {blog.image ? (
                        <>
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 2}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-blue-900 text-6xl font-bold opacity-10">
                              {blog.category?.charAt(0) || 'B'}
                            </div>
                          </div>
                        </>
                      )}
                      {/* Category Badge */}
                      {blog.category && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-900 text-white border border-blue-700 shadow-md">
                            {blog.category}
                          </span>
                        </div>
                      )}
                      {/* Reading Time Badge */}
                      {blog.readTime && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-800 text-blue-200 border border-blue-700 shadow-md">
                            <Clock className="w-4 h-4 mr-1.5 text-blue-300" />
                            {blog.readTime}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Content Area */}
                    <div className="flex flex-col flex-grow p-5">
                      {/* Title */}
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-200 line-clamp-2 drop-shadow">
                        {blog.title}
                      </h2>
                      {/* Excerpt */}
                      <p className="text-base text-gray-200 mb-3 line-clamp-2 font-medium">
                        {blog.excerpt}
                      </p>
                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {blog.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900 text-white shadow"
                            >
                              {tag}
                            </span>
                          ))}
                          {blog.tags.length > 2 && (
                            <span className="text-xs text-blue-300">
                              +{blog.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                      {/* Meta Information */}
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-800">
                        <div className="flex items-center gap-3 text-sm text-blue-200">
                          <time dateTime={blog.date} className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {blog.formattedDate}
                          </time>
                        </div>
                        <div className="flex items-center text-blue-300 text-base font-semibold">
                          Read
                          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View Card
                  <div className="py-5 px-3 flex items-center gap-6 bg-gray-900 rounded-xl shadow-md hover:bg-gray-800 transition-all duration-200">
                    {/* Thumbnail Image */}
                    {blog.image && (
                      <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden rounded-xl shadow-lg">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                          sizes="96px"
                        />
                      </div>
                    )}
                    {/* Main Content */}
                    <div className="flex-grow min-w-0">
                      {/* Title */}
                      <h2 className="text-lg font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
                        {blog.title}
                      </h2>
                      {/* Meta Information */}
                      <div className="flex items-center gap-3 text-sm text-blue-200 mb-2">
                        {blog.category && (
                          <span className="text-blue-300 font-medium">
                            {blog.category}
                          </span>
                        )}
                        <time dateTime={blog.date}>
                          {blog.formattedDate}
                        </time>
                        {blog.readTime && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-pink-300" />
                            {blog.readTime}
                          </div>
                        )}
                      </div>
                      {/* Excerpt */}
                      <p className="text-base text-gray-200 mb-2 line-clamp-1 font-medium">
                        {blog.excerpt}
                      </p>
                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {blog.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs text-white bg-blue-900 shadow"
                            >
                              {tag}
                            </span>
                          ))}
                          {blog.tags.length > 2 && (
                            <span className="text-xs text-blue-300">
                              +{blog.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {/* Read More */}
                    <div className="flex-shrink-0 flex items-center">
                      <div className="text-blue-300 text-base font-semibold">
                        Read
                        <ArrowRight className="w-4 h-4 ml-1 inline-block transform group-hover:translate-x-1 transition-transform" />
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