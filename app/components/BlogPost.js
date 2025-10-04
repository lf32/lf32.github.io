'use client';

import { motion, AnimatePresence } from 'framer-motion';
import MarkdownContent from './MarkdownContent';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2,
  ArrowRight
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Reading Progress Component
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const element = document.documentElement;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const progress = (element.scrollTop / totalHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-100 z-50">
      <motion.div
        className="h-full bg-gray-900"
        style={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
    </div>
  );
};

// Social Share Component
const SocialShare = ({ title, url, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={className}>
      <button
        onClick={copyLink}
        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
      >
        {copied ? 'Link Copied!' : 'Share Link'}
      </button>
    </div>
  );
};

// Related Posts Component
const RelatedPosts = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="pt-12">
        <h3 className="text-2xl font-medium text-gray-900 mb-8">Related Articles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.slice(0, 2).map((post) => (
            <Link 
              key={post.date} 
              href={`/blog/${post.date}`}
              className="group block"
            >
              <article className="space-y-6">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {post.image ? (
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-3xl text-gray-300 font-light">
                        {post.category?.charAt(0) || 'B'}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Category */}
                  {post.category && (
                    <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                      {post.category}
                    </div>
                  )}
                  
                  {/* Title */}
                  <h4 className="font-playfair text-xl font-medium text-gray-900 leading-[1.3] tracking-[-0.01em] group-hover:text-gray-700 transition-colors duration-300">
                    {post.title}
                  </h4>
                  
                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 leading-[1.6] tracking-[-0.005em] line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  
                  {/* Meta */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500 pt-2">
                    <time dateTime={post.date} className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </time>
                    {post.readTime && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function BlogPost({ blog, relatedPosts = [] }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const readingTime = blog.readTime || `${Math.ceil(blog.content.split(/\s+/).length / 200)} min read`;

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-white">
        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <header className="py-12 border-b border-gray-200">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Back to Blog Link */}
              <div className="mb-6">
                <Link 
                  href="/blog" 
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-mono"
                >
                  ../bl0g
                </Link>
              </div>

              {/* Date */}
              <div className="text-sm text-gray-500 font-medium tracking-wider uppercase">
                {new Date(blog.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>

              {/* Title */}
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-[1.1] tracking-[-0.02em]">
                {blog.title}
              </h1>

              {/* Horizontal Line */}
              <div className="w-16 h-px bg-gray-300"></div>

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-xl text-gray-600 font-light max-w-3xl leading-[1.6] tracking-[-0.01em]">
                  {blog.excerpt}
                </p>
              )}

              {/* Meta & Social */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {blog.category && (
                    <span className="text-blue-600 font-semibold uppercase tracking-[0.1em] text-xs">
                      {blog.category}
                    </span>
                  )}
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime}</span>
                  </div>
                </div>
                
                <SocialShare title={blog.title} url={currentUrl} />
              </div>

            </motion.div>
          </header>

          {/* Featured Image */}
          {blog.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="py-12"
            >
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="py-12"
          >
            <div className="prose prose-lg prose-gray max-w-none
              prose-headings:font-playfair prose-headings:text-gray-900 prose-headings:font-medium prose-headings:tracking-[-0.01em] prose-headings:leading-[1.2]
              prose-p:text-gray-700 prose-p:leading-[1.7] prose-p:text-lg prose-p:tracking-[-0.01em]
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:transition-colors prose-a:duration-200
              prose-strong:text-gray-900 prose-strong:font-medium
              prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:leading-[1.6]
              prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-gray-900 prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4
              prose-img:rounded-none prose-img:shadow-sm
              prose-hr:border-gray-200 prose-hr:my-8
              prose-ul:text-gray-700 prose-ol:text-gray-700 prose-ul:leading-[1.6] prose-ol:leading-[1.6]
              prose-li:text-gray-700 prose-li:leading-[1.6]">
              <MarkdownContent content={blog.content} />
            </div>
          </motion.div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="py-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span 
                    key={`${tag}-${index}`} 
                    className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Share this article</h3>
                <p className="text-gray-600">Found this helpful? Share it with others.</p>
              </div>
              <SocialShare title={blog.title} url={currentUrl} />
            </div>
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />

          {/* Navigation */}
          <div className="my-10 py-12 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link
                href="/blog"
                className="text-blue-600 hover:text-blue-700 font-mono transition-colors duration-200"
              >
                ../bl0g
              </Link>
              
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-mono transition-colors duration-200"
              >
                ../../h0me
              </Link>
            </div>
          </div>

          {/* Copyright Footer */}
          <footer className="border-t border-gray-200 py-8">
            <div className="text-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} LF32. All rights reserved.
              </p>
            </div>
          </footer>
        </article>

        {/* Watermark */}
        <div className="fixed bottom-4 right-4 z-50 opacity-20 pointer-events-none">
          <span className="text-gray-400 text-sm font-mono tracking-wider">lf32</span>
        </div>
      </div>
    </>
  );
}