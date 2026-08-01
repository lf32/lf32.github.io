'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const cardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function BlogList({ blogs, viewMode = 'grid' }) {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <>
      {blogs.map((blog, index) => (
        <motion.article
          key={blog.date}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: index * 0.05 }}
          className="group h-full"
        >
          <Link href={`/blog/${blog.date}`} className="block h-full">
            {viewMode === 'grid' ? (
              <div className="glass-card h-full overflow-hidden p-0 flex flex-col">
                <div className="relative h-40 bg-[var(--ramp-cream-deep)] overflow-hidden">
                  {blog.image ? (
                    <>
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 2}
                      />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/[0.03] to-[var(--ramp-lime)]/20">
                      <span className="text-4xl font-bold text-[var(--ramp-ink)]/10">
                        {blog.category?.charAt(0) || 'B'}
                      </span>
                    </div>
                  )}
                  {blog.category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/80 backdrop-blur-md text-[var(--ramp-ink)] border border-white/60">
                        {blog.category}
                      </span>
                    </div>
                  )}
                  {blog.readTime && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/50 backdrop-blur-md text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        {blog.readTime}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-grow p-5">
                  <h2 className="text-lg font-semibold tracking-tight text-[var(--ramp-ink)] mb-2 line-clamp-2 group-hover:opacity-75 transition-opacity">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-[var(--ramp-muted)] mb-3 line-clamp-2 flex-grow">
                    {blog.excerpt}
                  </p>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-black/[0.04] text-[var(--ramp-ink-soft)]"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 2 && (
                        <span className="text-[11px] text-[var(--ramp-muted)]">
                          +{blog.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/[0.05] text-xs text-[var(--ramp-muted)]">
                    <time dateTime={blog.date} className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {blog.formattedDate}
                    </time>
                    <span className="inline-flex items-center gap-1 font-semibold text-[var(--ramp-ink)]">
                      Read
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-4 sm:p-5 flex items-center gap-5">
                {blog.image && (
                  <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative overflow-hidden rounded-xl">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="96px"
                    />
                  </div>
                )}
                <div className="flex-grow min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold text-[var(--ramp-ink)] mb-1 group-hover:opacity-75 transition-opacity line-clamp-1">
                    {blog.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--ramp-muted)] mb-1.5">
                    {blog.category && (
                      <span className="font-semibold text-[var(--ramp-ink-soft)]">
                        {blog.category}
                      </span>
                    )}
                    <time dateTime={blog.date}>{blog.formattedDate}</time>
                    {blog.readTime && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blog.readTime}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--ramp-muted)] line-clamp-1">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="flex-shrink-0 hidden sm:flex items-center font-semibold text-sm text-[var(--ramp-ink)]">
                  Read
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            )}
          </Link>
        </motion.article>
      ))}
    </>
  );
}
