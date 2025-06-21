'use client';

import { motion, AnimatePresence } from 'framer-motion';
import MarkdownContent from './MarkdownContent';
import ShareButton from './ShareButton';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Tag, 
  Eye, 
  ThumbsUp, 
  Bookmark,
  Share2,
  ChevronUp,
  BookOpen,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Mail
} from 'lucide-react';
import { useEffect, useState, useRef, useMemo } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import TableOfContents from './TableOfContents';

const generateId = (text) => {
  if (!text) return '';
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

// Reading Progress Bar Component
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
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
      <motion.div
        className="h-full bg-blue-600"
        style={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
    </div>
  );
};

// Scroll to Top Button Component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-100 hover:bg-white transition-all duration-200 z-50"
        >
          <ChevronUp className="w-5 h-5 text-gray-600" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Related Posts Component
const RelatedPosts = ({ currentPost, posts }) => {
  // Filter out the current post and get posts with similar tags or category
  const relatedPosts = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    
    // First, try to find posts with matching tags
    const postsWithMatchingTags = posts.filter(post => 
      post.date !== currentPost.date && 
      post.tags?.some(tag => currentPost.tags?.includes(tag))
    );

    // If we have enough posts with matching tags, return them
    if (postsWithMatchingTags.length >= 3) {
      return postsWithMatchingTags.slice(0, 3);
    }

    // Otherwise, try to find posts with matching category
    const postsWithMatchingCategory = posts.filter(post => 
      post.date !== currentPost.date && 
      post.category === currentPost.category
    );

    // Combine both sets and remove duplicates
    const combinedPosts = [...new Set([...postsWithMatchingTags, ...postsWithMatchingCategory])];
    
    // If we still don't have enough posts, add other posts
    if (combinedPosts.length < 3) {
      const otherPosts = posts.filter(post => 
        post.date !== currentPost.date && 
        !combinedPosts.some(p => p.date === post.date)
      );
      combinedPosts.push(...otherPosts);
    }

    return combinedPosts.slice(0, 3);
  }, [currentPost, posts]);

  if (relatedPosts.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12 pt-8 border-t border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
        Related Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={`${post.date}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/blog/${post.date}`}
              className="group block h-full bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg overflow-hidden"
            >
              {/* Post Image or Gradient */}
              <div className="relative h-40 bg-gray-900">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gray-800 opacity-20`} />
                )}
                {post.category && (
                  <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-black/50 backdrop-blur-sm text-gray-200 rounded-full border border-gray-700">
                    {post.category}
                  </span>
                )}
              </div>

              {/* Post Content */}
              <div className="p-4 bg-black">
                <h3 className="font-semibold text-gray-100 group-hover:text-blue-400 group-hover:underline transition-colors duration-200 line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1.5" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function BlogPost({ blog, relatedPosts = [] }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [headings, setHeadings] = useState([]);
  const headerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (blog.content) {
      const headingLines = blog.content.split('\n').filter(line => line.match(/^#{1,6}\s/));
      const extractedHeadings = headingLines.map((line) => {
          const match = line.match(/^(#{1,6})\s(.*)/);
          if (match && match[2]) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = generateId(text);
            return { level, text, id };
          }
          return null;
      }).filter(Boolean);
      setHeadings(extractedHeadings);
    }
  }, [blog.content]);

  // Generate canonical URL
  const canonicalUrl = `https://yourdomain.com${pathname}`;

  // Generate structured data for the blog post
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage || 'https://yourdomain.com/default-og-image.jpg',
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      '@type': 'Person',
      name: blog.author || 'Lali Akhil Raj'
    },
    publisher: {
      '@type': 'Organization',
      name: 'lf32 page',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourdomain.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  };

  useEffect(() => {
    // Set current URL only once on mount
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
    
    // Intersection Observer for header visibility
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    // Scroll handler for header state
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array since we only want this to run once on mount

  // Calculate reading time
  const readingTime = blog.readTime || Math.ceil(blog.content.split(/\s+/).length / 200);

  // Handle bookmark
  const handleBookmark = async () => {
    if (isBookmarked) return; // Prevent multiple bookmarks
    
    try {
      if ('share' in navigator) {
        try {
          await navigator.share({
            title: blog.title,
            text: blog.excerpt,
            url: currentUrl
          });
        } catch (error) {
          // Ignore share cancellation
          if (error.name !== 'AbortError') {
            console.error('Error sharing:', error);
          }
          return;
        }
      }
      
      // For desktop browsers, just toggle the bookmark state
      setIsBookmarked(true);
      const timer = setTimeout(() => setIsBookmarked(false), 2000);
      return () => clearTimeout(timer); // Cleanup timeout
      
    } catch (error) {
      console.error('Error bookmarking:', error);
    }
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{`${blog.title} | Your Blog Name`}</title>
        <meta name="title" content={blog.title} />
        <meta name="description" content={blog.excerpt} />
        <meta name="keywords" content={blog.tags?.join(', ')} />
        <meta name="author" content={blog.author || 'Your Name'} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.coverImage || 'https://yourdomain.com/default-og-image.jpg'} />
        <meta property="article:published_time" content={blog.date} />
        <meta property="article:modified_time" content={blog.date} />
        <meta property="article:author" content={blog.author || 'Your Name'} />
        {blog.tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt} />
        <meta name="twitter:image" content={blog.coverImage || 'https://yourdomain.com/default-og-image.jpg'} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <ReadingProgress />
      <ScrollToTop />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="min-h-screen bg-black">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[40vh] sm:h-[50vh] min-h-[300px] sm:min-h-[400px] bg-black overflow-hidden border-b border-gray-800"
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute top-10 right-20 w-80 h-80 bg-green-400 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-5 left-10 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>

            {/* Content Container */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-4 sm:mb-6"
                >
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Blog</span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-3 sm:space-y-4"
                >
                  {blog.category && (
                    <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gray-900 text-gray-200 border border-gray-700">
                      {blog.category}
                    </span>
                  )}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                    {blog.title}
                  </h1>
                  {blog.excerpt && (
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
                      {blog.excerpt}
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Related Posts as vertical list */}
              <div className="lg:col-span-4 mt-10 lg:mt-0">
                <TableOfContents headings={headings} />
                <div className="bg-black border border-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Related Posts</h2>
                  <ul className="divide-y divide-gray-800">
                    {relatedPosts && relatedPosts.length > 0 ? (
                      relatedPosts.map((post, idx) => (
                        <li key={post.date} className="py-4 first:pt-0 last:pb-0">
                          <a href={`/blog/${post.date}`} className="block text-lg font-medium text-gray-200 hover:text-white transition-colors">
                            {post.title}
                          </a>
                          <div className="text-sm text-gray-500">
                            {post.excerpt}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {new Date(post.date).toLocaleDateString()} &middot; {post.readTime || ''}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 py-4">No related posts found.</li>
                    )}
                  </ul>
                </div>
              </div>
              {/* Main Content */}
              <div className="lg:col-span-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-black rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800"
                >
                  {/* Reading Stats */}
                  <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 bg-black border-b border-gray-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-sm text-gray-400">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1.5" />
                          <span>{readingTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1.5" />
                          <time dateTime={blog.date}>
                            {new Date(blog.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                      </div>
                      <motion.button
                        onClick={handleBookmark}
                        className={`flex items-center gap-1.5 transition-colors duration-200 ${
                          isBookmarked 
                            ? 'text-white' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          animate={{
                            rotate: isBookmarked ? [0, -10, 10, -10, 0] : 0,
                            scale: isBookmarked ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        </motion.div>
                        <span>{isBookmarked ? 'Saved!' : 'Save'}</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6 md:p-8 lg:p-10 prose prose-lg max-w-none prose-invert prose-headings:font-bold prose-headings:text-white prose-p:text-gray-100 prose-a:text-gray-100 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 text-white">
                    <MarkdownContent content={blog.content} />
                  </div>

                  {/* Tags Section */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 border-t border-gray-800 bg-black">
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, index) => (
                          <span
                            key={`${tag}-${index}`}
                            className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gray-900 text-xs sm:text-sm font-medium text-gray-400 rounded-full border border-gray-700 hover:border-gray-500 hover:text-white transition-colors duration-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Engagement Section */}
                  <footer className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 border-t border-gray-800">
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <motion.button
                          onClick={handleBookmark}
                          className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 ${
                            isBookmarked
                              ? 'bg-gray-900 text-white'
                              : 'bg-black text-gray-400 hover:bg-gray-800 hover:text-white'
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            animate={{
                              rotate: isBookmarked ? [0, -10, 10, -10, 0] : 0,
                              scale: isBookmarked ? [1, 1.2, 1] : 1
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                          </motion.div>
                          <span className="text-sm sm:text-base font-medium">{isBookmarked ? 'Saved!' : 'Save'}</span>
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-2">
                        <ShareButton url={currentUrl} />
                        <button
                          onClick={() => window.print()}
                          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-sm sm:text-base font-medium">Print</span>
                        </button>
                      </div>
                    </div>
                  </footer>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 