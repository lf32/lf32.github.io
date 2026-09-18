'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Shield,
  FileText,
  KeyRound,
  ExternalLink,
  Mail,
} from 'lucide-react';

const links = [
  {
    name: 'GitHub',
    href: 'https://github.com/lf32',
    desc: 'Code, kernels, and experiments',
    icon: Github,
  },
  {
    name: 'HackerOne',
    href: 'https://hackerone.com/lf32?type=user',
    desc: 'Security research profile',
    icon: Shield,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/lali-akhil-raj/',
    desc: 'Professional network',
    icon: Linkedin,
  },
  {
    name: 'Blog',
    href: '/blog',
    desc: 'Long-form notes & deep dives',
    icon: FileText,
    internal: true,
  },
  {
    name: 'PGP key',
    href: 'https://keys.openpgp.org/vks/v1/by-fingerprint/1F557E5DF7BCBA93FD0C71F85054D4046EF37944',
    desc: 'Secure communication',
    icon: KeyRound,
  },
  {
    name: 'Email',
    href: 'mailto:lf32.dev@gmail.com',
    desc: 'lf32.dev@gmail.com',
    icon: Mail,
  },
];

export default function Elsewhere() {
  return (
    <div className="container-page">
      <div className="section-header">
        <span className="section-label">Elsewhere</span>
        <h2 className="headline text-3xl sm:text-4xl mt-3">Find me online</h2>
        <p className="mt-2 text-[var(--ramp-muted)] text-base">
          Profiles, keys, and places I actually show up.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map((link, i) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
          >
            <a
              href={link.href}
              {...(!link.internal && !link.href.startsWith('mailto:')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="glass-card p-4 sm:p-5 flex items-start gap-3.5 group h-full"
            >
              <div className="w-10 h-10 rounded-xl bg-black/[0.04] flex items-center justify-center shrink-0 group-hover:bg-[var(--ramp-lime)]/45 transition-colors">
                <link.icon className="w-4 h-4 text-[var(--ramp-ink-soft)]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[var(--ramp-ink)] text-sm">
                    {link.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-[var(--ramp-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-[var(--ramp-muted)] mt-0.5">{link.desc}</p>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
