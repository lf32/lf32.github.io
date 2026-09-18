'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Shield, ArrowRight } from 'lucide-react';

const achievements = [
  { title: 'Top 10% Security Researcher', platform: 'HackerOne', icon: Shield },
  { title: 'Google Summer of Code', platform: 'NexB', icon: Github },
  { title: 'Linux Kernel Developer', platform: 'The Linux Foundation', icon: Shield },
];

export default function About() {
  return (
    <div className="container-page">
      <div className="section-header">
        <span className="section-label">About</span>
        <h2 className="headline text-3xl sm:text-4xl mt-3">Building better, safer software</h2>
        <p className="mt-2 text-[var(--ramp-muted)] text-base sm:text-lg">
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

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { v: '2+', l: 'Years' },
              { v: '25+', l: 'Projects' },
              { v: '20+', l: 'Reports' },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl px-2 py-3 text-center">
                <div className="text-lg font-semibold tracking-tight text-[var(--ramp-ink)]">
                  {s.v}
                </div>
                <div className="text-[10px] text-[var(--ramp-muted)] font-medium mt-0.5 uppercase tracking-wide">
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
            <h3 className="text-lg font-semibold tracking-tight text-[var(--ramp-ink)]">
              Background
            </h3>
            <p className="text-sm sm:text-[15px] text-[var(--ramp-ink-soft)] leading-relaxed">
              Recent graduate from the Indian Institute of Technology (BHU), Varanasi, with a
              degree in Computer Science and Engineering. My academic foundation is complemented
              by hands-on experience in software development and cybersecurity research.
            </p>
            <p className="text-sm sm:text-[15px] text-[var(--ramp-ink-soft)] leading-relaxed">
              I specialize in building secure, scalable applications with a security-first
              mindset — combining modern development practices with rigorous testing and
              vulnerability assessment.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-7">
            <h3 className="text-lg font-semibold tracking-tight text-[var(--ramp-ink)] mb-4">
              Recognition
            </h3>
            <div className="space-y-2.5">
              {achievements.map((a) => (
                <div
                  key={a.title}
                  className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.03] border border-black/[0.04]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--ramp-lime)] flex items-center justify-center flex-shrink-0">
                    <a.icon className="w-4 h-4 text-[var(--ramp-ink)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--ramp-ink)] text-sm">{a.title}</h4>
                    <p className="text-xs text-[var(--ramp-muted)]">{a.platform}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 sm:p-7">
            <h4 className="text-base font-semibold text-[var(--ramp-ink)] mb-1.5">
              Let&apos;s collaborate
            </h4>
            <p className="text-sm text-[var(--ramp-muted)] mb-4">
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
