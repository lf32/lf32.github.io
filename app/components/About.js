'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Shield, ArrowRight } from 'lucide-react';

const achievements = [
  {
    title: 'Top 10% Security Researcher',
    platform: 'HackerOne',
    icon: Shield,
  },
  {
    title: 'Google Summer of Code',
    platform: 'NexB',
    icon: Github,
  },
  {
    title: 'Linux Kernel Developer',
    platform: 'The Linux Foundation',
    icon: Shield,
  },
];

export default function About() {
  return (
    <div className="w-full py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About</span>
          <h2 className="headline text-3xl sm:text-4xl md:text-5xl mt-4 max-w-2xl">
            Building better, safer software
          </h2>
          <p className="mt-4 text-[var(--ramp-muted)] text-lg max-w-2xl leading-relaxed">
            IIT (BHU) graduate blending modern engineering with rigorous security research.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Image + stats */}
          <motion.div
            className="lg:col-span-5 space-y-5"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card overflow-hidden p-2">
              <div className="relative aspect-[4/5] rounded-[1rem] overflow-hidden bg-[var(--ramp-cream-deep)]">
                <Image
                  src="/mebase.png"
                  alt="Lali Akhil Raj - LF32"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { v: '2+', l: 'Years' },
                { v: '25+', l: 'Projects' },
                { v: '20+', l: 'Reports' },
              ].map((s) => (
                <div key={s.l} className="glass rounded-2xl px-3 py-4 text-center">
                  <div className="text-xl font-semibold tracking-tight text-[var(--ramp-ink)]">
                    {s.v}
                  </div>
                  <div className="text-[11px] text-[var(--ramp-muted)] font-medium mt-0.5 uppercase tracking-wide">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-7 space-y-5"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-card p-7 sm:p-8 space-y-4">
              <h3 className="text-xl font-semibold tracking-tight text-[var(--ramp-ink)]">
                Background
              </h3>
              <p className="text-[var(--ramp-ink-soft)] leading-relaxed">
                Recent graduate from the Indian Institute of Technology (BHU), Varanasi,
                with a degree in Computer Science and Engineering. My academic foundation
                is complemented by hands-on experience in software development and
                cybersecurity research.
              </p>
              <p className="text-[var(--ramp-ink-soft)] leading-relaxed">
                I specialize in building secure, scalable applications with a security-first
                mindset — combining modern development practices with rigorous testing and
                vulnerability assessment.
              </p>
            </div>

            <div className="glass-card p-7 sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight text-[var(--ramp-ink)] mb-5">
                Recognition
              </h3>
              <div className="space-y-3">
                {achievements.map((a, index) => (
                  <motion.div
                    key={a.title}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-black/[0.03] border border-black/[0.04]"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[var(--ramp-lime)] flex items-center justify-center flex-shrink-0">
                      <a.icon className="w-5 h-5 text-[var(--ramp-ink)]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--ramp-ink)] text-sm sm:text-base">
                        {a.title}
                      </h4>
                      <p className="text-sm text-[var(--ramp-muted)]">{a.platform}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-card p-7 sm:p-8">
              <h4 className="text-lg font-semibold text-[var(--ramp-ink)] mb-2">
                Let&apos;s collaborate
              </h4>
              <p className="text-[var(--ramp-muted)] mb-5 text-sm sm:text-base">
                Interested in security research, product work, or open-source collaboration?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#contact" className="btn-lime">
                  Get in touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/blog" className="btn-ghost">
                  Read my work
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
