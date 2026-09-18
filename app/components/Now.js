'use client';

import { motion } from 'framer-motion';
import { MapPin, Briefcase, BookOpen, FlaskConical } from 'lucide-react';

const items = [
  {
    icon: Briefcase,
    label: 'Work',
    value: 'Stealth / building in security & AI risk',
  },
  {
    icon: FlaskConical,
    label: 'Research',
    value: 'Supply chain threats, secure defaults, kernel-adjacent tooling',
  },
  {
    icon: BookOpen,
    label: 'Writing',
    value: 'Blog posts on attacks, accelerators, and hard-earned lessons',
  },
  {
    icon: MapPin,
    label: 'Based',
    value: 'India · remote-friendly',
  },
];

export default function Now() {
  return (
    <div className="container-page">
      <div className="section-header">
        <span className="section-label">Now</span>
        <h2 className="headline text-3xl sm:text-4xl mt-3">What I&apos;m up to</h2>
        <p className="mt-2 text-[var(--ramp-muted)] text-base">
          A living snapshot — more useful than a dusty bio.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="glass-card p-5 flex gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--ramp-lime)] flex items-center justify-center shrink-0">
              <item.icon className="w-4 h-4 text-[var(--ramp-ink)]" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ramp-muted)] mb-0.5">
                {item.label}
              </p>
              <p className="text-sm font-medium text-[var(--ramp-ink)] leading-snug">
                {item.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
