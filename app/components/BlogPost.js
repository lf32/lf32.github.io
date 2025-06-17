'use client';

import { motion, AnimatePresence } from 'framer-motion';
import MarkdownContent from './MarkdownContent';
import ShareButton from './ShareButton';
import AuthorProfile from './AuthorProfile';
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
              <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradientFromString(post.date).from} ${getGradientFromString(post.date).to} opacity-20`} />
                )}
                {post.category && (
                  <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 rounded-full">
                    {post.category}
                  </span>
                )}
              </div>

              {/* Post Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
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
                      <span>{post.readTime} min read</span>
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

// Gradient combinations for the hero section
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
  // Simple hash function to convert string to number
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Use absolute value and modulo to get index
  const index = Math.abs(hash) % gradientCombinations.length;
  return gradientCombinations[index];
};

export default function BlogPost({ blog, relatedPosts = [] }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const headerRef = useRef(null);
  const pathname = usePathname();

  // Get deterministic gradient based on blog post date
  const gradient = useMemo(() => 
    getGradientFromString(blog.date),
    [blog.date] // Only change if the blog post date changes
  );

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

  // Fetch initial likes state
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        // Fetch likes
        const likesRes = await fetch(`/api/blogs/${blog.date}/likes`);
        const { likes: currentLikes, hasLiked: userHasLiked } = await likesRes.json();
        setLikes(currentLikes);
        setHasLiked(userHasLiked);
      } catch (error) {
        console.error('Error fetching blog stats:', error);
      }
    };

    fetchInitialState();
  }, [blog.date]); // Only depend on blog.date

  // Handle like/unlike
  const handleLike = async () => {
    if (hasLiked) return; // Prevent multiple likes
    
    try {
      const res = await fetch(`/api/blogs/${blog.date}/likes`, {
        method: 'POST',
      });
      const { likes: updatedLikes, hasLiked: newHasLiked } = await res.json();
      setLikes(updatedLikes);
      setHasLiked(newHasLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

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

  // Like button animation variants
  const likeButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    liked: { 
      scale: [1, 1.2, 1],
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Calculate reading time
  const readingTime = blog.readTime || Math.ceil(blog.content.split(/\s+/).length / 200);

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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`relative w-full h-[40vh] sm:h-[50vh] min-h-[300px] sm:min-h-[400px] bg-gradient-to-br ${gradient.from} ${gradient.to} overflow-hidden`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${gradient.pattern}`} />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
          </div>

          {/* Content Container */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4 sm:mb-6"
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center text-white/90 hover:text-white transition-colors duration-200 group"
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
                  <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20">
                    {blog.category}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  {blog.title}
                </h1>
                {blog.excerpt && (
                  <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
                    {blog.excerpt}
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Article Content */}
            <article 
              className="lg:col-span-9 order-1"
              itemScope 
              itemType="https://schema.org/BlogPosting"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border border-gray-100"
              >
                {/* Reading Stats */}
                <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 bg-gray-50 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-sm text-gray-600">
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
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1.5" />
                        <span>{blog.views || 0} views</span>
                      </div>
                    </div>
                    <motion.button
                      onClick={handleBookmark}
                      className={`flex items-center gap-1.5 transition-colors duration-200 ${
                        isBookmarked 
                          ? 'text-blue-600' 
                          : 'text-gray-600 hover:text-blue-600'
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
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-100">
                  <MarkdownContent content={blog.content} />
                </div>

                {/* Tags Section */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white text-xs sm:text-sm font-medium text-gray-600 rounded-full border border-gray-200 hover:border-blue-200 hover:text-blue-600 transition-colors duration-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Engagement Section */}
                <footer className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <motion.button 
                        onClick={handleLike}
                        variants={likeButtonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        animate={hasLiked ? "liked" : "initial"}
                        className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 ${
                          hasLiked 
                            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                        }`}
                      >
                        <motion.div
                          animate={{
                            rotate: hasLiked ? [0, -10, 10, -10, 0] : 0,
                            transition: { duration: 0.5, ease: "easeOut" }
                          }}
                        >
                          <ThumbsUp className={`w-4 h-4 sm:w-5 sm:h-5 ${hasLiked ? 'fill-current' : ''}`} />
                        </motion.div>
                        <span className="text-sm sm:text-base font-medium">{likes}</span>
                      </motion.button>

                      <motion.button
                        onClick={handleBookmark}
                        className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 ${
                          isBookmarked
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-blue-600'
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
                        className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base font-medium">Print</span>
                      </button>
                    </div>
                  </div>
                </footer>
              </motion.div>

              {/* Related Posts */}
              <RelatedPosts 
                currentPost={blog} 
                posts={relatedPosts} 
              />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-3 order-2">
              <div className="sticky top-24">
                <AuthorProfile />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
} 