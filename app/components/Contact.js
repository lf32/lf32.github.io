'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Shield, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-12 sm:mb-16 max-w-2xl mx-auto text-center">
          <div className="flex justify-center">
            <span className="section-label">Contact</span>
          </div>
          <h2 className="headline text-3xl sm:text-4xl md:text-5xl mt-4">
            Get in touch
          </h2>
          <p className="mt-4 text-[var(--ramp-muted)] text-lg leading-relaxed">
            Open to collaboration, consulting, and security research discussions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-7 sm:p-10 text-center space-y-6"
          >
            <div className="space-y-4">
              <a
                href="mailto:lf32.dev@gmail.com"
                className="inline-flex items-center gap-3 text-lg sm:text-xl font-semibold text-[var(--ramp-ink)] hover:opacity-70 transition-opacity"
              >
                <span className="w-10 h-10 rounded-full bg-[var(--ramp-lime)] flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[var(--ramp-ink)]" />
                </span>
                lf32.dev@gmail.com
              </a>
              <div className="flex items-center justify-center gap-2 text-sm text-[var(--ramp-muted)]">
                <MapPin className="w-4 h-4" />
                India
              </div>
            </div>

            <div className="pt-6 border-t border-black/[0.06]">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--ramp-muted)] mb-3">
                Secure communication
              </h3>
              <div className="glass rounded-2xl p-4 font-mono text-xs sm:text-sm text-[var(--ramp-ink-soft)]">
                <div className="text-[10px] uppercase tracking-wide text-[var(--ramp-muted)] mb-2 font-sans font-semibold">
                  PGP fingerprint
                </div>
                <div className="break-all leading-relaxed">
                  1F55 7E5D F7BC BA93 FD0C 71F8 5054 D404 6EF3 7944
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
                <a
                  href="https://keys.openpgp.org/vks/v1/by-fingerprint/1F557E5DF7BCBA93FD0C71F85054D4046EF37944"
                  className="font-medium text-[var(--ramp-ink)] underline underline-offset-4 decoration-[var(--ramp-lime)] hover:opacity-70 transition-opacity"
                >
                  Download public key
                </a>
                <a
                  href="https://keys.openpgp.org/search?q=1F557E5DF7BCBA93FD0C71F85054D4046EF37944"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--ramp-muted)] hover:text-[var(--ramp-ink)] transition-colors"
                >
                  Keyserver lookup
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {[
              {
                href: 'https://github.com/lf32',
                icon: Github,
                title: 'GitHub',
                sub: 'Open source',
              },
              {
                href: 'https://linkedin.com/in/lali-akhil-raj/',
                icon: Linkedin,
                title: 'LinkedIn',
                sub: 'Network',
              },
              {
                href: 'https://hackerone.com/lf32?type=user',
                icon: Shield,
                title: 'HackerOne',
                sub: 'Research',
              },
            ].map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 flex flex-col items-center text-center gap-2"
              >
                <div className="w-10 h-10 rounded-xl bg-black/[0.04] flex items-center justify-center">
                  <link.icon className="w-5 h-5 text-[var(--ramp-ink-soft)]" />
                </div>
                <div className="font-semibold text-[var(--ramp-ink)] text-sm">{link.title}</div>
                <div className="text-xs text-[var(--ramp-muted)]">{link.sub}</div>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center pt-4"
          >
            <a
              href="mailto:lf32.dev@gmail.com?subject=Collaboration"
              className="btn-lime text-base px-8 py-3.5"
            >
              Start a conversation
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
