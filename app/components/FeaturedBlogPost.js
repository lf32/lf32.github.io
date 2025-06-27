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
      className="mb-14"
    >
      <Link href={`/blog/${blog.date}`} className="group block relative rounded-3xl border-2 border-gray-800 bg-gray-900 shadow-2xl transition-all duration-300 hover:scale-[1.025] hover:border-blue-400 overflow-hidden">
        {blog.image && (
          <div className="relative h-72 w-full overflow-hidden rounded-t-3xl">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>
        )}
        <div className="p-8 relative z-10">
          <p className="text-sm text-blue-400 mb-2 font-semibold tracking-widest uppercase">Featured Post</p>
          <h2 className="text-4xl font-extrabold text-white mb-4 group-hover:text-blue-200 transition-colors drop-shadow-lg">
            {blog.title}
          </h2>
          <p className="text-lg text-gray-200 mb-6 line-clamp-3 font-medium drop-shadow-sm">{blog.excerpt}</p>
          <div className="flex items-center justify-between text-base text-gray-300">
            <div className="flex items-center gap-6">
              <time dateTime={blog.date} className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                {blog.formattedDate}
              </time>
              {blog.readTime && (
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-pink-400" />
                  {blog.readTime}
                </div>
              )}
            </div>
            <div className="flex items-center text-blue-300 font-bold text-lg group-hover:text-pink-300 transition-colors">
              Read More
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 