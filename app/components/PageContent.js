'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Github,
  Terminal,
  Lock,
  Cpu,
  Sparkles,
} from 'lucide-react';
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

const trustLogos = [
  'IIT BHU',
  'Linux Foundation',
  'Google Summer of Code',
  'HackerOne',
  'DRDO · RCI',
  'NexB',
];

const stats = [
  { value: '20+', label: 'Security reports' },
  { value: '25+', label: 'Projects shipped' },
  { value: 'Top 10%', label: 'HackerOne' },
  { value: '2+', label: 'Years building' },
];

const featureCards = [
  {
    icon: Shield,
    title: 'Security research',
    desc: 'Bug bounty, threat modeling, and responsible disclosure across web and supply chain.',
  },
  {
    icon: Terminal,
    title: 'Systems & kernel',
    desc: 'Linux kernel contributions, fuzzing, and low-level tooling with the Foundation.',
  },
  {
    icon: Cpu,
    title: 'Secure software',
    desc: 'Shipping resilient apps with a security-first mindset from design to deploy.',
  },
];

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
  const { scrollYProgress } = useScroll();

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

      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] progress-lime origin-left z-[60] pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar />

      {/* Hero */}
      <section id="top" className="relative z-10 pt-28 sm:pt-32 pb-14 sm:pb-20">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-sm font-medium text-[var(--ramp-ink-soft)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--ramp-lime-deep)]" />
                Software engineer · Security researcher
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="headline text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem]"
              >
                Build secure systems.
                <br />
                <span className="relative inline-block">
                  Ship with clarity.
                  <span
                    className="absolute left-0 right-0 bottom-1 h-2.5 -z-10 rounded-sm"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--ramp-lime) 0%, rgba(210,243,76,0.25) 100%)',
                    }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-base sm:text-lg text-[var(--ramp-muted)] max-w-xl leading-relaxed"
              >
                I&apos;m Lali Akhil Raj — building resilient software and researching
                vulnerabilities across web, supply chain, and systems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-wrap items-center gap-3"
              >
                <Link href="#contact" className="btn-lime">
                  Get in touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/blog" className="btn-ghost">
                  Read the blog
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1"
              >
                {stats.map((s) => (
                  <div key={s.label} className="glass rounded-2xl px-3.5 py-3">
                    <div className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--ramp-ink)]">
                      {s.value}
                    </div>
                    <div className="text-[11px] text-[var(--ramp-muted)] mt-0.5 font-medium leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Profile visual — contained, no overflow chaos */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="relative max-w-md mx-auto lg:max-w-none"
              >
                <div className="glass-strong rounded-[1.5rem] p-3 sm:p-4">
                  <div className="relative aspect-[4/5] rounded-[1.1rem] overflow-hidden bg-[var(--ramp-cream-deep)]">
                    <Image
                      src="/mebase.png"
                      alt="Lali Akhil Raj"
                      fill
                      className="object-cover object-center"
                      priority
                      sizes="(max-width: 1024px) 90vw, 380px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white font-semibold text-lg tracking-tight">
                        Lali Akhil Raj
                      </p>
                      <p className="text-white/75 text-sm">LF32 · India</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-2 -right-1 sm:right-2 glass-strong rounded-2xl px-3.5 py-2.5 shadow-md z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[var(--ramp-lime)] flex items-center justify-center">
                      <Lock className="w-3.5 h-3.5 text-[var(--ramp-ink)]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--ramp-ink)]">Security-first</p>
                      <p className="text-[10px] text-[var(--ramp-muted)]">Design → ship</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-2 left-2 glass-dark rounded-2xl px-3.5 py-2.5 shadow-lg z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                      <Github className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Open source</p>
                      <p className="text-[10px] text-white/60">Kernel · GSoC · tooling</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="relative z-10 py-6 border-y border-black/[0.06]">
        <div className="container-page mb-4">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ramp-muted)]">
            Collaborated with & recognized by
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="flex animate-marquee w-max gap-2.5 px-4">
            {[...trustLogos, ...trustLogos].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="glass rounded-full px-5 py-2 text-sm font-semibold text-[var(--ramp-ink-soft)] whitespace-nowrap"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container-page">
          <div className="section-header">
            <span className="section-label">What I do</span>
            <h2 className="headline text-3xl sm:text-4xl mt-3">
              Research. Build. Harden.
            </h2>
            <p className="mt-3 text-[var(--ramp-muted)] text-base sm:text-lg leading-relaxed">
              From kernel internals to production apps — a full-stack security mindset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass-card p-6 sm:p-7"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--ramp-lime)] flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-[var(--ramp-ink)]" />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-[var(--ramp-ink)] mb-1.5">
                  {card.title}
                </h3>
                <p className="text-sm text-[var(--ramp-muted)] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
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

      <footer className="relative z-10 border-t border-black/[0.06] py-8 mt-2">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--ramp-ink)] text-[var(--ramp-lime)] text-[10px] font-bold">
              LF
            </span>
            <span className="text-sm font-semibold text-[var(--ramp-ink)]">LF32</span>
          </div>
          <p className="text-sm text-[var(--ramp-muted)]">
            © {new Date().getFullYear()} Lali Akhil Raj. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/lf32"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ramp-muted)] hover:text-[var(--ramp-ink)] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <Link
              href="/blog"
              className="text-sm font-medium text-[var(--ramp-muted)] hover:text-[var(--ramp-ink)] transition-colors"
            >
              Blog
            </Link>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--ramp-muted)] hover:text-[var(--ramp-ink)] transition-colors"
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
