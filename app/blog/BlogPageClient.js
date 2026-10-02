'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, User, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

function BlogFooter() {
  return (
    <footer className="relative z-10 border-t border-black/[0.08] py-10 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium tracking-[-0.02em] text-[var(--pt-ink)]">LF32</span>
          </div>
          <p className="text-sm text-[var(--pt-muted)]">
            © {new Date().getFullYear()} Lali Akhil Raj. All rights reserved.
          </p>
          <Link
            href="/"
            className="text-sm font-medium text-[var(--pt-muted)] hover:text-[var(--pt-ink)] transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function BlogPageClient({ blogs }) {
  const hasBlogs = Array.isArray(blogs) && blogs.length > 0;
  const featured = hasBlogs ? blogs[0] : null;
  const rest = hasBlogs ? blogs.slice(1) : [];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="ambient-bg" aria-hidden="true" />

      <Navbar />

      {/* Hero */}
      <header className="relative z-10 pt-32 sm:pt-36 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl space-y-6"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--pt-muted)] hover:text-[var(--pt-ink)] transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              Back home
            </Link>

            <p className="section-label">Writing</p>

            <h1 className="headline-lg">
              Latest insights
            </h1>

            <p className="text-lg sm:text-xl text-[var(--pt-muted)] leading-relaxed max-w-2xl">
              Deep dives into security research, supply chain risks, systems programming,
              and building software that holds up under pressure.
            </p>

            {hasBlogs && (
              <p className="text-sm font-medium text-[var(--pt-ink-soft)]">
                {blogs.length} article{blogs.length === 1 ? '' : 's'}
              </p>
            )}
          </motion.div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {!hasBlogs && (
          <div className="glass-card p-12 sm:p-16 text-center max-w-lg mx-auto">
            <BookOpen className="mx-auto mb-5 h-6 w-6 text-[var(--pt-muted)]" />
            <h2 className="mb-2 text-[22px] font-normal tracking-[-0.02em] text-[var(--pt-ink)]">
              No articles yet
            </h2>
            <p className="text-[var(--pt-muted)] text-sm leading-relaxed">
              Working on new writing. Check back soon for notes on security and engineering.
            </p>
          </div>
        )}

        {hasBlogs && (
          <div className="space-y-16 sm:space-y-20">
            {/* Featured */}
            {featured && (
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
              >
                <div className="mb-6">
                  <span className="section-label">Featured</span>
                </div>

                <Link href={`/blog/${featured.date}`} className="group block">
                  <article className="glass-card overflow-hidden p-0 sm:p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[380px] bg-[var(--pt-surface)] overflow-hidden">
                        {featured.image ? (
                          <Image
                            src={featured.image}
                            alt={featured.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#e6e6e6]">
                            <span className="text-6xl font-bold text-[var(--pt-ink)]/10">
                              {featured.category?.charAt(0) || 'B'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-7 sm:p-9 lg:p-10 flex flex-col justify-center space-y-5">
                        {featured.category && (
                          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--pt-muted)]">
                            {featured.category}
                          </span>
                        )}

                        <h2 className="headline group-hover:opacity-80 transition-opacity">
                          {featured.title}
                        </h2>

                        {featured.excerpt && (
                          <p className="text-[var(--pt-muted)] leading-relaxed line-clamp-3 sm:line-clamp-4">
                            {featured.excerpt}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--pt-muted)]">
                          <span className="inline-flex items-center gap-1.5 font-medium">
                            <User className="w-3.5 h-3.5" />
                            LF32
                          </span>
                          <time dateTime={featured.date} className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {featured.formattedDate}
                          </time>
                          {featured.readTime && (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {featured.readTime}
                            </span>
                          )}
                        </div>

                        <div className="pt-1">
                          <span className="inline-flex items-center text-sm font-semibold text-[var(--pt-ink)] group-hover:gap-2.5 gap-1.5 transition-all">
                            Read article
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.section>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="mb-8">
                  <span className="section-label">Recent</span>
                  <h2 className="headline mt-3">More articles</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((blog, index) => (
                    <motion.article
                      key={blog.date}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.05 * index }}
                    >
                      <Link href={`/blog/${blog.date}`} className="group block h-full">
                        <div className="glass-card h-full overflow-hidden p-0 flex flex-col">
                          <div className="relative h-44 bg-[var(--pt-surface)] overflow-hidden">
                            {blog.image ? (
                              <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-[#e6e6e6]">
                                <span className="text-4xl font-bold text-[var(--pt-ink)]/10">
                                  {blog.category?.charAt(0) || 'B'}
                                </span>
                              </div>
                            )}
                            {blog.category && (
                              <div className="absolute top-3 left-3">
                                <span className="inline-flex bg-[rgba(17,18,20,0.82)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                                  {blog.category}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="p-5 sm:p-6 flex flex-col flex-grow">
                            <h3 className="text-lg font-normal tracking-[-0.02em] leading-tight text-[var(--pt-ink)] mb-2 line-clamp-2 group-hover:opacity-75 transition-opacity">
                              {blog.title}
                            </h3>

                            {blog.excerpt && (
                              <p className="text-sm text-[var(--pt-muted)] leading-relaxed line-clamp-3 mb-4 flex-grow">
                                {blog.excerpt}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-3 border-t border-black/[0.08] text-xs text-[var(--pt-muted)]">
                              <div className="flex items-center gap-3">
                                <time dateTime={blog.date} className="inline-flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {blog.formattedDate}
                                </time>
                                {blog.readTime && (
                                  <span className="inline-flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {blog.readTime}
                                  </span>
                                )}
                              </div>
                              <span className="inline-flex items-center gap-1 font-semibold text-[var(--pt-ink)]">
                                Read
                                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}

          </div>
        )}
      </main>

      <BlogFooter />
    </div>
  );
}
