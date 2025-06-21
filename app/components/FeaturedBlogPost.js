'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function FeaturedBlogPost({ blog }) {
  if (!blog) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Link href={`/blog/${blog.date}`} className="group block border border-gray-800 bg-black transition-all duration-300 hover:border-gray-700">
        {blog.image && (
          <div className="relative h-64 w-full">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <div className="p-6">
          <p className="text-sm text-blue-400 mb-2 font-semibold">Featured Post</p>
          <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors">
            {blog.title}
          </h2>
          <p className="text-gray-400 mb-4 line-clamp-2">{blog.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <time dateTime={blog.date} className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                {blog.formattedDate}
              </time>
              {blog.readTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {blog.readTime}
                </div>
              )}
            </div>
            <div className="flex items-center text-gray-300 font-medium">
              Read More
              <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 