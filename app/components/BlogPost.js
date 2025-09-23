'use client';

import { motion, AnimatePresence } from 'framer-motion';
import MarkdownContent from './MarkdownContent';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Bookmark,
  ExternalLink,
} from 'lucide-react';
import { useEffect, useState, useRef, useMemo } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
// TableOfContents removed from layout
import { Playfair_Display } from 'next/font/google';
import { Inter } from 'next/font/google';
import { Source_Serif_4 } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', weight: ['400','500','600','700','800','900'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const sourceSerif = Source_Serif_4({ subsets: ['latin'], weight: ['400','600','700'] });

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
    <div className="fixed top-0 left-0 w-full h-1 bg-black/10 z-50">
      <motion.div
        className="h-full bg-black"
        style={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
    </div>
  );
};

// Related Posts (kept minimal)
const RelatedPosts = ({ currentPost, posts }) => {
  const relatedPosts = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    const postsWithMatchingTags = posts.filter(post => 
      post.date !== currentPost.date && 
      post.tags?.some(tag => currentPost.tags?.includes(tag))
    );
    if (postsWithMatchingTags.length >= 3) return postsWithMatchingTags.slice(0, 3);
    const postsWithMatchingCategory = posts.filter(post => 
      post.date !== currentPost.date && 
      post.category === currentPost.category
    );
    const combinedPosts = [...new Set([...postsWithMatchingTags, ...postsWithMatchingCategory])];
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
    <div className="mt-16 pt-8 border-t border-black/10">
      <h2 className="font-serif text-2xl text-black mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedPosts.map((post) => (
          <Link
            key={post.date}
            href={`/blog/${post.date}`}
            className="group block h-full bg-white border border-black/10 hover:border-black/30 transition-colors overflow-hidden"
          >
            <div className="relative h-40 bg-black/5">
              {post.image ? (
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-black/5" />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-serif text-lg text-black group-hover:underline underline-offset-4 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-black/70 line-clamp-2 mt-2">{post.excerpt}</p>
              <div className="mt-3 text-xs text-black/60 flex items-center gap-3">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                {post.readTime && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function BlogPost({ blog, relatedPosts = [] }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [headings, setHeadings] = useState([]);
  const [showStickyBar, setShowStickyBar] = useState(false);
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

  const canonicalUrl = `https://yourdomain.com${pathname}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      const onScroll = () => {
        setShowStickyBar(window.scrollY > 180);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, []);

  const readingTime = blog.readTime || Math.ceil(blog.content.split(/\s+/).length / 200);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <>
      <Head>
        <title>{`${blog.title} | Your Blog Name`}</title>
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <ReadingProgress />

      {/* Subtle lf32 watermark - bottom right */}
      <div aria-hidden className="fixed right-4 bottom-4 z-10 pointer-events-none select-none">
        <span className="font-mono tracking-widest text-3xl sm:text-4xl text-black/10">lf32</span>
      </div>

      {/* Sticky reading bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-b border-black/10"
          >
            <div className={`${inter.variable} ${playfair.variable} max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2`}> 
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-serif text-base sm:text-lg truncate">{blog.title}</div>
                  <div className="text-xs text-black/60 flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{readingTime}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleCopyLink} className={`text-xs underline underline-offset-4 ${copied ? 'text-black' : 'text-black/60 hover:text-black'}`}>{copied ? 'Link copied' : 'Article link'}</button>
                  <button onClick={() => window.print()} className="text-xs text-black/60 hover:text-black underline underline-offset-4">Print</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`${inter.variable} ${playfair.variable} min-h-screen bg-white text-black`}>
        {/* Article Header */}
        <header className="border-b border-black/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-4">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black underline underline-offset-4">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
            </div>
            {blog.category && (
              <span className="text-xs tracking-wide uppercase text-black/60">{blog.category}</span>
            )}
            <h1 ref={headerRef} className={`${playfair.className} text-4xl md:text-5xl leading-tight mt-2`}>
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="mt-4 text-lg text-black/70">{blog.excerpt}</p>
            )}
            <div className="mt-4 text-sm text-black/60 flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{readingTime}</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <button onClick={handleCopyLink} className={`inline-flex items-center gap-2 ${copied ? 'text-black' : 'text-black/60 hover:text-black'} underline underline-offset-4`}>
                <ExternalLink className="w-4 h-4" /> {copied ? 'Link copied' : 'Article link'}
              </button>
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 text-black/60 hover:text-black underline underline-offset-4">
                <ExternalLink className="w-4 h-4" /> Print
              </button>
            </div>
          </div>
        </header>

        {/* Article Body centered; TOC removed */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <article>
            <div className="">
              <div className={`${sourceSerif.className} prose prose-lg max-w-none prose-headings:${playfair.className} prose-headings:tracking-tight prose-headings:text-black prose-p:text-black/80 prose-a:text-black prose-a:underline hover:prose-a:text-black/80 prose-blockquote:border-black/20 prose-img:rounded-none prose-img:max-h-[60vh] prose-img:w-full prose-img:h-auto prose-img:object-contain prose-img:mx-auto prose-hr:border-black/10`}>
                <MarkdownContent content={blog.content} />
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-black/10">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span key={`${tag}-${index}`} className="px-3 py-1 text-xs tracking-wide uppercase bg-black/5 text-black">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related */}
            <RelatedPosts currentPost={blog} posts={relatedPosts} />
          </article>
        </main>

        
      </div>
    </>
  );
} 