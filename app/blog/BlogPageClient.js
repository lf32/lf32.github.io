'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';

export default function BlogPageClient({ blogs }) {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[25vh] sm:h-[30vh] min-h-[180px] sm:min-h-[220px] bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden border-b border-gray-200 flex items-center">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-10 right-20 w-80 h-80 bg-green-400 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-5 left-10 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
        <div className="relative z-10 h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-2xl">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 group mb-3"
            >
              <span className="mr-2">&larr;</span>
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">Blog</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl">Insights, tutorials, and experiences from my journey in software development and cybersecurity.</p>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col gap-4">
          {blogs.map((blog) => (
            <Link
              key={blog.date}
              href={`/blog/${blog.date}`}
              className="group flex flex-col sm:flex-row bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md overflow-hidden"
            >
              {/* Post Image or Gradient */}
              <div className="relative w-full sm:w-48 h-32 sm:h-24 flex-shrink-0 bg-gray-100">
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 opacity-20" />
                )}
                {blog.category && (
                  <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-white/90 text-gray-700 rounded-full border border-gray-300">
                    {blog.category}
                  </span>
                )}
              </div>
              
              {/* Post Content */}
              <div className="p-4 sm:p-5 flex flex-col justify-center flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 group-hover:underline transition-colors duration-200 text-lg sm:text-xl line-clamp-2 flex-1">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 flex-shrink-0">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <time dateTime={blog.date}>{blog.formattedDate}</time>
                    </div>
                    {blog.readTime && (
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{blog.readTime}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-0">
                  {blog.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Empty state */}
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No blog posts found.</div>
            <p className="text-gray-500 text-sm mt-2">Check back later for new content.</p>
          </div>
        )}
      </div>
    </div>
  );
} 