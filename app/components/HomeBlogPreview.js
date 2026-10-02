'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, Clock } from 'lucide-react';

function formatShortDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function HomeBlogPreview() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (!cancelled && Array.isArray(data)) {
          setPosts(data.slice(0, 3));
        }
      } catch (e) {
        console.error('Failed to load blogs', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = posts[0] || null;
  const rest = posts.slice(1);

  return (
    <div className="container-page">
      {/* Section intro */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <span className="section-label">Writing</span>
          <h2 className="headline mt-3">From the blog</h2>
          <p className="mt-2 text-[var(--pt-muted)] text-base max-w-md">
            Recent notes on security, systems, and building.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--pt-ink)] hover:opacity-70 transition-opacity self-start sm:self-auto"
        >
          Browse all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="glass-card overflow-hidden p-0">
          <div className="h-36 sm:h-40 bg-black/[0.03] animate-pulse" />
          <div className="divide-y divide-black/[0.06]">
            {[1, 2].map((i) => (
              <div key={i} className="h-16 px-5 flex items-center">
                <div className="h-3 w-2/3 bg-black/[0.05] rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && posts.length === 0 && (
        <div className="glass-card p-10 text-center">
          <BookOpen className="w-7 h-7 mx-auto text-[var(--pt-muted)] mb-2" />
          <p className="text-sm text-[var(--pt-muted)]">No posts yet.</p>
        </div>
      )}

      {/* Content */}
      {!loading && featured && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="glass-card overflow-hidden p-0"
        >
          {/* Featured lead */}
          <Link
            href={`/blog/${featured.date}`}
            className="group grid grid-cols-1 sm:grid-cols-12 gap-0 border-b border-black/[0.08]"
          >
            {/* Thumb */}
            <div className="sm:col-span-4 relative min-h-[140px] sm:min-h-[168px] bg-[var(--pt-surface)] overflow-hidden">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 30vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#e6e6e6]">
                  <span className="text-4xl font-bold text-[var(--pt-ink)]/10">
                    {featured.category?.charAt(0) || 'B'}
                  </span>
                </div>
              )}
              <div className="absolute top-3 left-3">
                <span className="inline-flex bg-[rgba(17,18,20,0.82)] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
                  Latest
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="sm:col-span-8 p-5 sm:p-6 flex flex-col justify-center min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {featured.category && (
                  <span className="text-[11px] font-semibold text-[var(--pt-ink-soft)]">
                    {featured.category}
                  </span>
                )}
                <span className="text-[11px] text-[var(--pt-muted)]">·</span>
                <time
                  dateTime={featured.date}
                  className="text-[11px] text-[var(--pt-muted)] font-medium"
                >
                  {featured.formattedDate || formatShortDate(featured.date)}
                </time>
                {featured.readTime && (
                  <>
                    <span className="text-[11px] text-[var(--pt-muted)]">·</span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-[var(--pt-muted)]">
                      <Clock className="w-3 h-3" />
                      {featured.readTime}
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-lg font-normal tracking-[-0.02em] leading-snug text-[var(--pt-ink)] group-hover:opacity-75 transition-opacity line-clamp-2 sm:text-[22px]">
                {featured.title}
              </h3>

              {featured.excerpt && (
                <p className="mt-2 text-sm text-[var(--pt-muted)] leading-relaxed line-clamp-2">
                  {featured.excerpt}
                </p>
              )}

              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--pt-ink)]">
                Read article
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>

          {/* Compact rest */}
          {rest.length > 0 && (
            <ul className="divide-y divide-black/[0.06]">
              {rest.map((post, i) => (
                <li key={post.date}>
                  <Link
                    href={`/blog/${post.date}`}
                    className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 hover:bg-black/[0.02] transition-colors"
                  >
                    <span className="w-8 shrink-0 text-[13px] tabular-nums text-[var(--pt-muted)]">
                      /{String(i + 2).padStart(2, '0')}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-0.5">
                        {post.category && (
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--pt-muted)]">
                            {post.category}
                          </span>
                        )}
                        <time
                          dateTime={post.date}
                          className="text-[10px] text-[var(--pt-muted)] sm:hidden"
                        >
                          {formatShortDate(post.date)}
                        </time>
                      </div>
                      <p className="text-sm sm:text-[15px] font-semibold text-[var(--pt-ink)] tracking-tight truncate group-hover:opacity-75 transition-opacity">
                        {post.title}
                      </p>
                    </div>

                    <time
                      dateTime={post.date}
                      className="hidden sm:block text-xs font-medium text-[var(--pt-muted)] shrink-0 tabular-nums w-24 text-right"
                    >
                      {formatShortDate(post.date)}
                    </time>

                    <ArrowUpRight className="w-4 h-4 text-[var(--pt-muted)] shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-[var(--pt-ink)] transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Footer strip */}
          <div className="px-4 sm:px-5 py-3 bg-black/[0.02] border-t border-black/[0.08] flex items-center justify-between gap-3">
            <p className="text-xs text-[var(--pt-muted)] font-medium">
              {posts.length} recent · more on the blog
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-bold text-[var(--pt-ink)] hover:opacity-70"
            >
              View archive
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
