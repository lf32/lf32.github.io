'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { Playfair_Display } from 'next/font/google';
import { Inter } from 'next/font/google';
import { Source_Serif_4 } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', weight: ['400','500','600','700','800','900'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const sourceSerif = Source_Serif_4({ subsets: ['latin'], weight: ['400','600','700'] });

export default function BlogPageClient({ blogs }) {
  const hasBlogs = Array.isArray(blogs) && blogs.length > 0;
  const featured = hasBlogs ? blogs[0] : null;
  const rest = hasBlogs ? blogs.slice(1) : [];

  return (
    <div className={`${inter.variable} ${playfair.variable} min-h-screen bg-white text-black`}>
      {/* Header */}
      <header className="border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex items-baseline justify-between">
            <Link href="/" className="text-sm sm:text-base text-black/60 hover:text-black underline underline-offset-4">
              Home
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight">lf32's Blog</h1>
            <div className="w-10" />
          </div>
          <p className="mt-3 max-w-2xl text-black/60 text-sm sm:text-base">
            Reporting, notes, and essays on software and security.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {!hasBlogs && (
          <div className="text-center py-20 text-black/50">No articles yet.</div>
        )}

        {hasBlogs && (
          <>
            {/* Featured lead spanning 2 columns on large screens */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              <div className="lg:col-span-2">
                <Link
                  href={`/blog/${featured.date}`}
                  className="group block border border-black/10 overflow-hidden bg-white"
                  aria-label={`Read featured: ${featured.title}`}
                >
                  <div className="relative w-full h-48 sm:h-56 md:h-64 bg-black/5">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-black/5" />
                    )}
                  </div>
                  <div className={`p-4 sm:p-5 md:p-6 ${sourceSerif.className}`}>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-black/60">
                      <time dateTime={featured.date} className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />{featured.formattedDate}
                      </time>
                      {featured.readTime && (
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{featured.readTime}</span>
                      )}
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl leading-tight mt-2 sm:mt-3 group-hover:underline underline-offset-4">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-black/75">
                        {featured.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </div>

              {/* Top sidebar stack of 2 smaller stories (if available) */}
              <div className="flex flex-col gap-5">
                {rest.slice(0, 2).map((b) => (
                  <Link
                    key={b.date}
                    href={`/blog/${b.date}`}
                    className="group border border-black/10 overflow-hidden bg-white"
                  >
                    <div className="relative w-full h-28 bg-black/5">
                      {b.image ? (
                        <Image src={b.image} alt={b.title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-black/5" />
                      )}
                    </div>
                    <div className={`p-3 ${sourceSerif.className}`}>
                      <h3 className="font-serif text-lg leading-snug group-hover:underline underline-offset-4">
                        {b.title}
                      </h3>
                      <p className="mt-1 text-sm text-black/70 line-clamp-2">{b.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Flowing cards grid for the rest */}
            {rest.slice(2).length > 0 && (
              <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {rest.slice(2).map((b) => (
                  <Link
                    key={b.date}
                    href={`/blog/${b.date}`}
                    className="group flex flex-col border border-black/10 overflow-hidden bg-white"
                  >
                    <div className="relative w-full h-28 bg-black/5">
                      {b.image ? (
                        <Image src={b.image} alt={b.title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-black/5" />
                      )}
                    </div>
                    <div className={`p-3 ${sourceSerif.className}`}>
                      <h3 className="font-serif text-base sm:text-lg leading-snug group-hover:underline underline-offset-4 line-clamp-2">
                        {b.title}
                      </h3>
                      <p className="mt-1 text-sm text-black/70 line-clamp-2">{b.excerpt}</p>
                      <div className="mt-2 text-xs text-black/60 flex items-center gap-2">
                        <time dateTime={b.date} className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{b.formattedDate}</time>
                        {b.readTime && <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{b.readTime}</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
} 