'use client';

import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, LayoutGrid, List } from 'lucide-react';

export default function BlogPageClient({ blogs }) {
  const [view, setView] = useState("grid");

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[30vh] sm:h-[40vh] min-h-[200px] sm:min-h-[300px] bg-black overflow-hidden border-b border-gray-800 flex items-center">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-10 right-20 w-80 h-80 bg-green-400 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-5 left-10 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 group mb-4"
            >
              <span className="mr-2">&larr;</span>
              <span>Back to Home</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-2">Blog</h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">Insights, tutorials, and experiences from my journey in software development and cybersecurity.</p>
          </div>
        </div>
      </div>

      {/* Polished View Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex justify-center">
        <div className="relative flex items-center bg-gray-900 border border-gray-800 rounded-full shadow-lg w-fit px-1 py-1 min-w-[180px]" style={{width: 240}}>
          {/* Sliding indicator - always 50% width, left-0 for grid, left-1/2 for list */}
          <span
            className={`absolute top-1 left-0 h-10 w-1/2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg transition-transform duration-300 ease-in-out z-0 ${view === "grid" ? 'translate-x-0' : 'translate-x-full'}`}
            style={{
              transform: view === "grid" ? 'translateX(0)' : 'translateX(0%)',
              width: '50%',
              transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)'
            }}
            aria-hidden="true"
          />
          <button
            className={`relative z-10 px-6 py-2 flex items-center gap-2 text-base font-semibold rounded-full focus:outline-none transition-all duration-200 ${view === "grid" ? "text-white scale-105" : "text-gray-400 hover:text-white"}`}
            onClick={() => setView("grid")}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            style={{width: '120px'}}
          >
            <LayoutGrid className={`w-5 h-5 transition-transform duration-300 ${view === "grid" ? 'scale-110 text-white' : 'text-gray-400'}`} />
            Grid
          </button>
          <button
            className={`relative z-10 px-6 py-2 flex items-center gap-2 text-base font-semibold rounded-full focus:outline-none transition-all duration-200 ${view === "list" ? "text-white scale-105" : "text-gray-400 hover:text-white"}`}
            onClick={() => setView("list")}
            aria-label="List view"
            aria-pressed={view === "list"}
            style={{width: '120px'}}
          >
            <List className={`w-5 h-5 transition-transform duration-300 ${view === "list" ? 'scale-110 text-white' : 'text-gray-400'}`} />
            List
          </button>
        </div>
      </div>

      {/* Blog List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.date}
                href={`/blog/${blog.date}`}
                className="group block h-full bg-black rounded-xl border border-gray-800 hover:border-blue-400 transition-all duration-300 hover:shadow-lg overflow-hidden"
              >
                {/* Post Image or Gradient */}
                <div className="relative h-40 bg-gray-900">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-800 opacity-20" />
                  )}
                  {blog.category && (
                    <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-black/50 text-gray-200 rounded-full border border-gray-700">
                      {blog.category}
                    </span>
                  )}
                </div>
                {/* Post Content */}
                <div className="p-4 bg-black">
                  <h3 className="font-semibold text-gray-100 group-hover:text-blue-400 group-hover:underline transition-colors duration-200 line-clamp-2 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      <time dateTime={blog.date}>{blog.formattedDate}</time>
                    </div>
                    {blog.readTime && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5" />
                        <span>{blog.readTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.date}
                href={`/blog/${blog.date}`}
                className="group flex flex-col md:flex-row bg-black rounded-xl border border-gray-800 hover:border-blue-400 transition-all duration-300 hover:shadow-lg overflow-hidden"
              >
                {/* Post Image or Gradient */}
                <div className="relative w-full md:w-64 h-40 md:h-48 flex-shrink-0 bg-gray-900">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-800 opacity-20" />
                  )}
                  {blog.category && (
                    <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-black/50 text-gray-200 rounded-full border border-gray-700">
                      {blog.category}
                    </span>
                  )}
                </div>
                {/* Post Content */}
                <div className="p-4 bg-black flex flex-col justify-center w-full">
                  <h3 className="font-semibold text-gray-100 group-hover:text-blue-400 group-hover:underline transition-colors duration-200 text-lg md:text-2xl mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 line-clamp-2 mb-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      <time dateTime={blog.date}>{blog.formattedDate}</time>
                    </div>
                    {blog.readTime && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5" />
                        <span>{blog.readTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 