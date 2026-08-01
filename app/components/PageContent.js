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

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20, mass: 1 },
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

export default function PageContent() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Ambient cream + orbs */}
      <div className="ambient-bg" aria-hidden="true">
        <div
          className="orb"
          style={{
            width: 420,
            height: 420,
            top: '40%',
            right: '5%',
            background: 'radial-gradient(circle, rgba(255,200,160,0.35) 0%, transparent 70%)',
          }}
        />
        <div
          className="orb"
          style={{
            width: 360,
            height: 360,
            top: '70%',
            left: '30%',
            background: 'radial-gradient(circle, rgba(210,243,76,0.25) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] progress-lime origin-left z-[60] pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="top" className="relative z-10 pt-32 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Copy */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-sm font-medium text-[var(--ramp-ink-soft)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--ramp-lime-deep)]" />
                Software engineer · Security researcher
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="headline text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
              >
                Build secure systems.
                <br />
                <span className="relative inline-block">
                  Ship with clarity.
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-3 -z-10 opacity-80"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--ramp-lime) 0%, rgba(210,243,76,0.2) 100%)',
                      borderRadius: 4,
                    }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="text-lg sm:text-xl text-[var(--ramp-muted)] max-w-xl leading-relaxed font-normal"
              >
                I&apos;m Lali Akhil Raj — building resilient software and researching
                vulnerabilities across web, supply chain, and systems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
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

              {/* Mini stats strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4"
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="glass rounded-2xl px-4 py-3.5 text-center sm:text-left"
                  >
                    <div className="text-xl font-semibold tracking-tight text-[var(--ramp-ink)]">
                      {s.value}
                    </div>
                    <div className="text-xs text-[var(--ramp-muted)] mt-0.5 font-medium">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Floating glass visual stack */}
            <div className="lg:col-span-5 relative h-[420px] sm:h-[480px] lg:h-[520px]">
              {/* Main profile card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-4 sm:inset-x-8 top-6 glass-strong rounded-[1.75rem] p-5 sm:p-6 animate-float-slow shadow-xl shadow-black/[0.06]"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--ramp-cream-deep)]">
                  <Image
                    src="/mebase.png"
                    alt="Lali Akhil Raj"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 1024px) 80vw, 360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-semibold text-lg tracking-tight">
                      Lali Akhil Raj
                    </p>
                    <p className="text-white/75 text-sm">LF32 · India</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating status chip */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="absolute top-2 right-0 sm:right-2 glass-strong rounded-2xl px-4 py-3 shadow-lg animate-float z-10"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--ramp-lime)] flex items-center justify-center">
                    <Lock className="w-4 h-4 text-[var(--ramp-ink)]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--ramp-ink)]">Security-first</p>
                    <p className="text-[11px] text-[var(--ramp-muted)]">Design → ship</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating achievement chip */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="absolute bottom-8 left-0 sm:left-2 glass-dark rounded-2xl px-4 py-3 shadow-xl animate-float-delayed z-10"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <Github className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Open source</p>
                    <p className="text-[11px] text-white/60">Kernel · GSoC · tooling</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust marquee ────────────────────────────────────── */}
      <section className="relative z-10 py-8 border-y border-black/[0.05]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-5">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ramp-muted)]">
            Collaborated with & recognized by
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="flex animate-marquee w-max gap-3 px-4">
            {[...trustLogos, ...trustLogos].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="glass rounded-full px-6 py-2.5 text-sm font-semibold text-[var(--ramp-ink-soft)] whitespace-nowrap"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature cards ────────────────────────────────────── */}
      <section className="relative z-10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="section-label mb-4">What I do</span>
            <h2 className="headline text-3xl sm:text-4xl md:text-5xl mt-4">
              Research. Build. Harden.
            </h2>
            <p className="mt-4 text-[var(--ramp-muted)] text-lg leading-relaxed">
              From kernel internals to production apps — a full-stack security mindset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-7 sm:p-8"
              >
                <div className="w-11 h-11 rounded-2xl bg-[var(--ramp-lime)] flex items-center justify-center mb-5">
                  <card.icon className="w-5 h-5 text-[var(--ramp-ink)]" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-[var(--ramp-ink)] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[var(--ramp-muted)] leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <motion.section
        id="about"
        className="relative z-10 py-8 sm:py-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <About />
      </motion.section>

      {/* ── Experience ───────────────────────────────────────── */}
      <motion.section
        id="experience"
        className="relative z-10 py-8 sm:py-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <Experience />
      </motion.section>

      {/* ── Projects ─────────────────────────────────────────── */}
      <motion.section
        id="projects"
        className="relative z-10 py-8 sm:py-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <Projects />
      </motion.section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <motion.section
        id="contact"
        className="relative z-10 py-8 sm:py-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <Contact />
      </motion.section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-black/[0.06] py-10 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
