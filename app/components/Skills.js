'use client';

import { motion } from 'framer-motion';

const groups = [
  {
    title: 'Security',
    items: ['AppSec & threat modeling', 'Bug bounty', 'Supply chain', 'Pentest automation', 'PGP'],
  },
  {
    title: 'Systems',
    items: ['Linux kernel', 'Rust', 'C/C++', 'Fuzzing', 'SBOMs'],
  },
  {
    title: 'Product & web',
    items: ['Next.js', 'React', 'Node.js', 'Python', 'Go', 'PostgreSQL'],
  },
  {
    title: 'Cloud & ops',
    items: ['Docker', 'CI/CD', 'GitHub Actions', 'AWS basics', 'Observability'],
  },
];

export default function Skills() {
  return (
    <div className="container-page">
      <div className="section-header">
        <span className="section-label">Stack</span>
        <h2 className="headline text-3xl sm:text-4xl mt-3">Tools of the trade</h2>
        <p className="mt-2 text-[var(--ramp-muted)] text-base">
          A working set — depth over logo bingo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {groups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="glass-card p-5 sm:p-6"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ramp-muted)] mb-3">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--ramp-ink-soft)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--ramp-lime)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
