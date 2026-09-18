'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Bookmark } from 'lucide-react';

export default function NewsStyleBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredBlog, setFeaturedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        
        if (data.length > 0) {
          setFeaturedBlog(data[0]); // First blog as featured
          setBlogs(data.slice(1, 6)); // Next 5 blogs
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <div className="space-y-12">
        {/* Header Skeleton */}
        <div className="border-b border-gray-200 pb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>

        {/* Featured Article Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-pulse">
            <div className="h-80 bg-gray-200 rounded mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Clean Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border-b border-gray-200 pb-8"
      >
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2 font-medium tracking-wide">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-amber-600 leading-tight tracking-tight">
            Latest Insights
          </h1>
          <p className="text-lg text-gray-600 mt-3 font-light">
            <span className="font-mono text-sm text-green-700">lf32@Internet~$ dd if=/dev/kmem skip=$((0xffff8100)) | strings | grep -E "^[A-F0-9]{32}$"</span>
          </p>
        </div>
      </motion.div>

      {/* Featured Article */}
      {featuredBlog && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-px bg-gray-900"></div>
              <h2 className="text-sm font-medium text-gray-900 tracking-wider uppercase">Featured</h2>
            </div>
          </div>
          
          <Link href={`/blog/${featuredBlog.date}`} className="group block">
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Featured Image */}
              {featuredBlog.image ? (
                <div className="relative h-96 lg:h-[480px] overflow-hidden">
                  <Image
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>
              ) : (
                <div className="relative h-96 lg:h-[480px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-8xl text-gray-300 font-light">
                    {featuredBlog.category?.charAt(0) || 'B'}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="space-y-6 lg:py-8">
                {/* Category */}
                {featuredBlog.category && (
                  <div className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                    {featuredBlog.category}
                  </div>
                )}

                {/* Title */}
                <h3 className="font-playfair text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                  {featuredBlog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
                  {featuredBlog.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center space-x-8 text-sm text-gray-500">
                  <time dateTime={featuredBlog.date} className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredBlog.formattedDate}</span>
                  </time>
                  {featuredBlog.readTime && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredBlog.readTime}</span>
                    </div>
                  )}
                </div>

                {/* Read More */}
                <div className="pt-4">
                  <div className="inline-flex items-center text-gray-900 font-medium group-hover:translate-x-1 transition-transform duration-200">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </motion.section>
      )}

      {/* More Articles Section */}
      {blogs.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <div className="mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-gray-900"></div>
              <h3 className="text-sm font-medium text-gray-900 tracking-wider uppercase">More Articles</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.date}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeOut" }}
                className="group"
              >
                <Link href={`/blog/${blog.date}`} className="block">
                  <div className="space-y-4">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {blog.image ? (
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-3xl text-gray-300 font-light">
                            {blog.category?.charAt(0) || 'B'}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      {/* Category */}
                      {blog.category && (
                        <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                          {blog.category}
                        </div>
                      )}

                      {/* Title */}
                      <h4 className="font-playfair text-lg font-medium text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h4>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-600 font-light leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <time dateTime={blog.date} className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{blog.formattedDate}</span>
                        </time>
                        {blog.readTime && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{blog.readTime}</span>
                          </div>
                        )}
                      </div>

                      {/* Read More */}
                      <div className="pt-2">
                        <div className="inline-flex items-center text-sm text-gray-700 font-medium group-hover:translate-x-1 transition-transform duration-200">
                          Read More
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* View All Articles Link */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </motion.section>
      )}

    </div>
  );
}