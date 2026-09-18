'use client';

import { motion } from 'framer-motion';
import MarkdownContent from './MarkdownContent';
import Navbar from './Navbar';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Clock,
  Calendar,
  ArrowRight,
  Link2,
  Check,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const element = document.documentElement;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight <= 0) return;
      setProgress((element.scrollTop / totalHeight) * 100);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-black/[0.04] z-[60] pointer-events-none">
      <motion.div
        className="h-full progress-lime"
        style={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 30 }}
      />
    </div>
  );
};

const SocialShare = ({ url, className = '' }) => {
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
    <button
      type="button"
      onClick={copyLink}
      className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
        copied
          ? 'text-[var(--ramp-ink)]'
          : 'text-[var(--ramp-muted)] hover:text-[var(--ramp-ink)]'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-[var(--ramp-lime-deep)]" />
          Copied
        </>
      ) : (
        <>
          <Link2 className="w-4 h-4" />
          Copy link
        </>
      )}
    </button>
  );
};

const RelatedPosts = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="mt-16 sm:mt-20">
      <div className="mb-8">
        <span className="section-label">Keep reading</span>
        <h3 className="headline text-2xl sm:text-3xl mt-3">Related articles</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.slice(0, 2).map((post) => (
          <Link
            key={post.date}
            href={`/blog/${post.date}`}
            className="group block h-full"
          >
            <article className="glass-card h-full overflow-hidden p-0 flex flex-col">
              <div className="relative h-44 bg-[var(--ramp-cream-deep)] overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/[0.03] to-[var(--ramp-lime)]/20">
                    <span className="text-4xl font-bold text-[var(--ramp-ink)]/10">
                      {post.category?.charAt(0) || 'B'}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-grow space-y-3">
                {post.category && (
                  <span className="inline-flex self-start px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--ramp-lime)]/40 text-[var(--ramp-ink)]">
                    {post.category}
                  </span>
                )}

                <h4 className="text-lg font-semibold tracking-tight text-[var(--ramp-ink)] leading-snug group-hover:opacity-75 transition-opacity line-clamp-2">
                  {post.title}
                </h4>

                {post.excerpt && (
                  <p className="text-sm text-[var(--ramp-muted)] leading-relaxed line-clamp-2 flex-grow">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-3 text-xs text-[var(--ramp-muted)] pt-2 border-t border-black/[0.05]">
                  <time dateTime={post.date} className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  {post.readTime && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  )}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function BlogPost({ blog, relatedPosts = [] }) {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const readingTime =
    blog.readTime ||
    `${Math.ceil((blog.content || '').split(/\s+/).filter(Boolean).length / 200)} min read`;

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <ReadingProgress />

      <div className="relative min-h-screen overflow-x-hidden">
        <div className="ambient-bg" aria-hidden="true">
          <div
            className="orb"
            style={{
              width: 400,
              height: 400,
              top: '8%',
              right: '-5%',
              background: 'radial-gradient(circle, rgba(210,243,76,0.28) 0%, transparent 70%)',
            }}
          />
          <div
            className="orb"
            style={{
              width: 340,
              height: 340,
              bottom: '20%',
              left: '-8%',
              background: 'radial-gradient(circle, rgba(180,200,255,0.25) 0%, transparent 70%)',
            }}
          />
        </div>

        <Navbar />

        <article className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">
          {/* Header */}
          <header className="mb-10 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-6"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ramp-muted)] hover:text-[var(--ramp-ink)] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All articles
              </Link>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--ramp-muted)]">
                  {blog.category && (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[var(--ramp-lime)]/50 text-[var(--ramp-ink)]">
                      {blog.category}
                    </span>
                  )}
                  <time dateTime={blog.date} className="inline-flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {formattedDate}
                  </time>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {readingTime}
                  </span>
                </div>
                <SocialShare url={currentUrl} />
              </div>

              <h1 className="headline text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08]">
                {blog.title}
              </h1>

              {blog.excerpt && (
                <p className="text-lg sm:text-xl text-[var(--ramp-muted)] leading-relaxed max-w-2xl">
                  {blog.excerpt}
                </p>
              )}

              <div className="flex items-center gap-3 pt-1">
                <div className="glass rounded-full pl-1.5 pr-4 py-1.5 flex items-center gap-2.5">
                  <Image
                    src="/images/0xlf32.jpg"
                    alt="Lali Akhil Raj"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-[var(--ramp-ink)]">
                      Lali Akhil Raj
                    </p>
                    <p className="text-[11px] text-[var(--ramp-muted)]">LF32</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </header>

          {/* Featured image */}
          {blog.image && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-10 sm:mb-12"
            >
              <div className="glass-card overflow-hidden p-1.5 sm:p-2">
                <div className="relative h-64 sm:h-80 md:h-[420px] rounded-[1rem] overflow-hidden bg-[var(--ramp-cream-deep)]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="glass-strong rounded-[1.5rem] p-6 sm:p-9 md:p-11"
          >
            <div className="blog-content prose-ramp max-w-none">
              <MarkdownContent content={blog.content} />
            </div>
          </motion.div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full bg-black/[0.04] border border-black/[0.05] text-[var(--ramp-ink-soft)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="mt-10 glass-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-[var(--ramp-ink)] mb-1">
                Share this article
              </h3>
              <p className="text-sm text-[var(--ramp-muted)]">
                Found this useful? Pass it along.
              </p>
            </div>
            <SocialShare url={currentUrl} className="btn-ghost !py-2.5 !px-4" />
          </div>

          <RelatedPosts posts={relatedPosts} />

          {/* Nav */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <Link href="/blog" className="btn-ghost justify-center sm:justify-start">
              <ArrowLeft className="w-4 h-4" />
              All articles
            </Link>
            <Link href="/" className="btn-lime justify-center sm:justify-start">
              Back home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        <footer className="relative z-10 border-t border-black/[0.06] py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--ramp-ink)] text-[var(--ramp-lime)] text-[10px] font-bold">
                  LF
                </span>
                <span className="text-sm font-semibold text-[var(--ramp-ink)]">LF32</span>
              </div>
              <p className="text-sm text-[var(--ramp-muted)]">
                © {new Date().getFullYear()} Lali Akhil Raj. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
