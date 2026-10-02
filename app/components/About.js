'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const achievements = [
  { title: 'Top 10% Security Researcher', platform: 'HackerOne' },
  { title: 'Google Summer of Code', platform: 'NexB' },
  { title: 'Linux Kernel Developer', platform: 'The Linux Foundation' },
];

export default function About() {
  return (
    <div className="container-page">
      <div className="section-header">
        <span className="section-label">About</span>
        <h2 className="headline mt-3">Building better, safer software</h2>
        <p className="mt-2 text-[var(--pt-muted)] text-base sm:text-lg">
          IIT (BHU) graduate blending modern engineering with rigorous security research.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        <motion.div
          className="lg:col-span-5 space-y-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="overflow-hidden bg-[#1e2124]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--pt-surface)]">
              <Image
                src="/mebase.png"
                alt="Lali Akhil Raj - LF32"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { v: '2+', l: 'Years' },
              { v: '25+', l: 'Projects' },
              { v: '20+', l: 'Reports' },
            ].map((s) => (
              <div key={s.l} className="border border-black/10 bg-white px-2 py-3 text-center">
                <div className="text-lg font-normal tracking-[-0.03em] text-[var(--pt-ink)]">
                  {s.v}
                </div>
                <div className="mt-0.5 text-[11px] text-[var(--pt-muted)]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-7 space-y-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="glass-card p-6 sm:p-7 space-y-3">
            <h3 className="text-[22px] font-normal tracking-[-0.02em] text-[var(--pt-ink)]">
              Background
            </h3>
            <p className="text-sm sm:text-[15px] text-[var(--pt-ink-soft)] leading-relaxed">
              Recent graduate from the Indian Institute of Technology (BHU), Varanasi, with a
              degree in Computer Science and Engineering. My academic foundation is complemented
              by hands-on experience in software development and cybersecurity research.
            </p>
            <p className="text-sm sm:text-[15px] text-[var(--pt-ink-soft)] leading-relaxed">
              I specialize in building secure, scalable applications with a security-first
              mindset — combining modern development practices with rigorous testing and
              vulnerability assessment.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-7">
            <h3 className="mb-4 text-[22px] font-normal tracking-[-0.02em] text-[var(--pt-ink)]">
              Recognition
            </h3>
            <div className="space-y-2.5">
              {achievements.map((a) => (
                <div key={a.title} className="border-b border-black/10 py-3 last:border-b-0">
                  <h4 className="text-sm font-normal tracking-[-0.02em] text-[var(--pt-ink)]">{a.title}</h4>
                  <p className="text-xs text-[var(--pt-muted)]">{a.platform}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 sm:p-7">
            <h4 className="mb-1.5 text-[22px] font-normal tracking-[-0.02em] text-[var(--pt-ink)]">
              Let&apos;s collaborate
            </h4>
            <p className="text-sm text-[var(--pt-muted)] mb-4">
              Interested in security research, product work, or open-source collaboration?
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
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
  );
}
