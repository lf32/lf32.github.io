'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, Github } from 'lucide-react';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Navbar from './Navbar';
import HomeBlogPreview from './HomeBlogPreview';
import Skills from './Skills';
import Now from './Now';
import Elsewhere from './Elsewhere';
import FAQ from './FAQ';
import FunZone from './FunZone';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const topics = [
  { label: 'Security', href: '#about' },
  { label: 'Systems', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Writing', href: '#writing' },
  { label: 'Now', href: '#now' },
];

const HERO_LINES = ["I'm Lali Akhil Raj.", 'I read, then I build.'];

function HeroHeadline() {
  return (
    <h1 className="hero-title relative z-10 px-6 text-center" style={{ opacity: 0.3 }}>
      {HERO_LINES.map((line) => (
        <span key={line} className="block whitespace-nowrap">
          {line}
        </span>
      ))}
    </h1>
  );
}

function Section({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.section>
  );
}

export default function PageContent() {
  useEffect(() => {
    const handler = (e) => {
      const anchor = e.currentTarget;
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener('click', handler));
    return () => anchors.forEach((a) => a.removeEventListener('click', handler));
  }, []);

  return (
    <main className="page-shell">
      <div className="ambient-bg" aria-hidden="true" />

      <Navbar />

      <section id="top" className="relative z-10 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#111214]">
        <Image
          src="/images/car.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.62)_100%)]" />
        <HeroHeadline />
        <a
          href="#stories"
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[13px] text-white/90 sm:bottom-8"
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
          Scroll to Explore
        </a>
      </section>

      <section id="stories" className="relative z-10 scroll-mt-24 bg-[#f3f3f3] pb-8 pt-8 sm:pb-12 sm:pt-10">
        <div className="container-page">
          <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
            {topics.map((topic) => (
              <a key={topic.label} href={topic.href} className="pt-chip">
                {topic.label}
              </a>
            ))}
            <Link href="#projects" className="pt-see ml-auto">
              See all
            </Link>
          </div>

          <Link href="#experience" className="story-card">
            <Image
              src="/standing.png"
              alt=""
              fill
              className="object-cover object-[center_18%]"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),transparent_42%)]" />
            <div className="story-label">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">
                Security
              </p>
              <p className="story-title flex items-center gap-2">
                Research. Build. Harden.
                <span aria-hidden="true">↗</span>
              </p>
            </div>
          </Link>

          <p className="mt-8 max-w-2xl text-lg leading-snug text-[var(--pt-ink)] sm:text-xl">
            I&apos;m Lali Akhil Raj — building resilient software and researching
            vulnerabilities across web, supply chain, and systems.
          </p>
          <p className="mt-3 text-sm text-[var(--pt-muted)]">
            20+ security reports · 25+ projects shipped · Top 10% HackerOne · 2+ years building
          </p>
        </div>
      </section>

      <Section id="now">
        <Now />
      </Section>

      <Section id="about">
        <About />
      </Section>

      <Section id="skills">
        <Skills />
      </Section>

      <Section id="experience">
        <Experience />
      </Section>

      <Section id="projects">
        <Projects />
      </Section>

      <Section id="writing">
        <HomeBlogPreview />
      </Section>

      <Section id="elsewhere">
        <Elsewhere />
      </Section>

      <Section id="faq">
        <FAQ />
      </Section>

      <Section id="lab">
        <FunZone />
      </Section>

      <Section id="contact">
        <Contact />
      </Section>

      <footer className="relative z-10 border-t border-black/[0.08] py-8 mt-2">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium tracking-[-0.02em] text-[var(--pt-ink)]">LF32</span>
          </div>
          <p className="text-sm text-[var(--pt-muted)]">
            © {new Date().getFullYear()} Lali Akhil Raj. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/lf32"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pt-muted)] hover:text-[var(--pt-ink)] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <Link
              href="/blog"
              className="text-sm font-medium text-[var(--pt-muted)] hover:text-[var(--pt-ink)] transition-colors"
            >
              Blog
            </Link>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--pt-muted)] hover:text-[var(--pt-ink)] transition-colors"
              title="Important legal document"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
