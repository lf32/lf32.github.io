'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Shield, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <div className="container-page">
      <div className="section-header mx-auto text-center !max-w-xl">
        <div className="flex justify-center mb-1">
          <span className="section-label">Contact</span>
        </div>
        <h2 className="headline text-3xl sm:text-4xl mt-3">Get in touch</h2>
        <p className="mt-2 text-[var(--ramp-muted)] text-base">
          Open to collaboration, consulting, and security research discussions.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 sm:p-8 text-center space-y-5"
        >
          <a
            href="mailto:lf32.dev@gmail.com"
            className="inline-flex items-center gap-3 text-base sm:text-lg font-semibold text-[var(--ramp-ink)] hover:opacity-70 transition-opacity"
          >
            <span className="w-9 h-9 rounded-full bg-[var(--ramp-lime)] flex items-center justify-center">
              <Mail className="w-4 h-4 text-[var(--ramp-ink)]" />
            </span>
            lf32.dev@gmail.com
          </a>
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--ramp-muted)]">
            <MapPin className="w-4 h-4" />
            India
          </div>

          <div className="pt-5 border-t border-black/[0.06]">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ramp-muted)] mb-2">
              Secure communication
            </h3>
            <div className="glass rounded-xl p-3.5 font-mono text-[11px] sm:text-xs text-[var(--ramp-ink-soft)]">
              <div className="text-[10px] uppercase tracking-wide text-[var(--ramp-muted)] mb-1.5 font-sans font-semibold">
                PGP fingerprint
              </div>
              <div className="break-all leading-relaxed">
                1F55 7E5D F7BC BA93 FD0C 71F8 5054 D404 6EF3 7944
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm">
              <a
                href="https://keys.openpgp.org/vks/v1/by-fingerprint/1F557E5DF7BCBA93FD0C71F85054D4046EF37944"
                className="font-medium text-[var(--ramp-ink)] underline underline-offset-4 decoration-[var(--ramp-lime)] hover:opacity-70"
              >
                Download public key
              </a>
              <a
                href="https://keys.openpgp.org/search?q=1F557E5DF7BCBA93FD0C71F85054D4046EF37944"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--ramp-muted)] hover:text-[var(--ramp-ink)]"
              >
                Keyserver lookup
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { href: 'https://github.com/lf32', icon: Github, title: 'GitHub', sub: 'Open source' },
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
              className="glass-card p-4 flex flex-col items-center text-center gap-1.5"
            >
              <div className="w-9 h-9 rounded-xl bg-black/[0.04] flex items-center justify-center">
                <link.icon className="w-4 h-4 text-[var(--ramp-ink-soft)]" />
              </div>
              <div className="font-semibold text-[var(--ramp-ink)] text-sm">{link.title}</div>
              <div className="text-[11px] text-[var(--ramp-muted)]">{link.sub}</div>
            </a>
          ))}
        </div>

        <div className="text-center pt-2">
          <a
            href="mailto:lf32.dev@gmail.com?subject=Collaboration"
            className="btn-lime text-base px-7"
          >
            Start a conversation
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
