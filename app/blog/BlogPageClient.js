'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPageClient({ blogs }) {
  const hasBlogs = Array.isArray(blogs) && blogs.length > 0;
  const featured = hasBlogs ? blogs[0] : null;
  const rest = hasBlogs ? blogs.slice(1) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-6">
            <div className="mb-6">
              <Link 
                href="/" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 font-mono"
              >
                ../h0me
              </Link>
            </div>
            
            <div className="space-y-6">
              <div className="text-sm text-gray-500 font-medium tracking-wider uppercase">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[0.9] tracking-tight">
                Latest Insights
              </h1>
              <div className="w-16 h-px bg-gray-300"></div>
              <div className="space-y-3">
                <p className="font-mono text-sm text-green-600">
                  pwn@research:~$ echo 0 {`>`} /proc/sys/kernel/randomize_va_space {`&&`} gdb -q
                </p>
                <p className="text-xl text-gray-600 font-light max-w-3xl leading-relaxed">
                  Deep dive into exploits, reversing, and digital forensics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!hasBlogs && (
          <div className="text-center py-32">
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-light text-gray-900">No articles published yet</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                I'm working on some exciting content. Check back soon for insights on software development and security research.
              </p>
            </div>
          </div>
        )}

        {hasBlogs && (
          <div className="space-y-20">
            {/* Featured Article */}
            {featured && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="mb-12">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-px bg-gray-900"></div>
                    <h2 className="text-sm font-medium text-gray-900 tracking-wider uppercase">Featured</h2>
                  </div>
                </div>
                
                <Link
                  href={`/blog/${featured.date}`}
                  className="group block"
                >
                  <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Featured Image */}
                    {featured.image && (
                      <div className="relative h-96 lg:h-[480px] overflow-hidden">
                        <Image
                          src={featured.image}
                          alt={featured.title}
                          fill
                          className="object-cover transition-all duration-1000 group-hover:scale-105"
                          priority
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="space-y-6 lg:py-8">
                      {/* Category */}
                      {featured.category && (
                        <div className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                          {featured.category}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-playfair text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                        {featured.title}
                      </h3>

                      {/* Excerpt */}
                      {featured.excerpt && (
                        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
                          {featured.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center space-x-8 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span className="font-medium">LF32</span>
                        </div>
                        <time dateTime={featured.date} className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{featured.formattedDate}</span>
                        </time>
                        {featured.readTime && (
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{featured.readTime}</span>
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

            {/* More Articles */}
            {rest.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                <div className="mb-12">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-px bg-gray-900"></div>
                    <h2 className="text-sm font-medium text-gray-900 tracking-wider uppercase">Recent Articles</h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  {rest.map((blog, index) => (
                    <motion.article
                      key={blog.date}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeOut" }}
                      className="group"
                    >
                      <Link href={`/blog/${blog.date}`} className="block">
                        <div className="space-y-6">
                          {/* Image */}
                          {blog.image && (
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                            </div>
                          )}

                          {/* Content */}
                          <div className="space-y-4">
                            {/* Category */}
                            {blog.category && (
                              <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                                {blog.category}
                              </div>
                            )}

                            {/* Title */}
                            <h3 className="font-playfair text-xl lg:text-2xl font-medium text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                              {blog.title}
                            </h3>

                            {/* Excerpt */}
                            {blog.excerpt && (
                              <p className="text-sm text-gray-600 leading-relaxed font-light line-clamp-3">
                                {blog.excerpt}
                              </p>
                            )}

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
              </motion.section>
            )}

            {/* Newsletter Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="border-t border-gray-100 pt-16"
            >
              <div className="text-center space-y-8 max-w-2xl mx-auto">
                <div className="space-y-4">
                  <h3 className="font-playfair text-2xl lg:text-3xl font-medium text-gray-900">Stay in the Loop</h3>
                  <div className="w-16 h-px bg-gray-300 mx-auto"></div>
                  <p className="text-lg text-gray-600 font-light leading-relaxed">
                    Get notified when I publish new insights on software development, security research, and technology trends.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Link
                    href="mailto:lf32.dev@gmail.com?subject=Newsletter Subscription"
                    className="group inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all duration-200 hover:translate-y-[-1px] hover:shadow-lg"
                  >
                    Subscribe via Email
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </motion.section>
          </div>
        )}
      </main>
    </div>
  );
}