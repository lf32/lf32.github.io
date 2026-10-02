'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What are you focused on right now?',
    a: 'Secure software, AI-assisted risk assessment, and research that turns into real product decisions. Also writing when something is worth documenting.',
  },
  {
    q: 'Are you open to work or collaboration?',
    a: 'Yes — especially security engineering, research collaborations, and early-stage product work with a security spine. Reach out via email or LinkedIn.',
  },
  {
    q: 'Do you do consulting or security reviews?',
    a: 'Selectively. If you have a scoped problem (threat model, review, supply-chain posture), email a short brief and timeline.',
  },
  {
    q: 'Where should I start on the blog?',
    a: 'Start with the latest post on the blog index, or anything tagged supply chain / security if you care about dependency risk.',
  },
  {
    q: 'How do I contact you securely?',
    a: 'Email is fine for most things. For sensitive material, use my PGP key (linked in Contact / Elsewhere) and include your public key.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="container-page">
      <div className="section-header">
        <span className="section-label">FAQ</span>
        <h2 className="headline mt-3">Quick answers</h2>
        <p className="mt-2 text-[var(--pt-muted)] text-base">
          The questions people ask before they email.
        </p>
      </div>

      <div className="max-w-3xl space-y-2.5">
        {faqs.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.q} className="glass-row overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left"
                aria-expanded={open}
              >
                <span className="font-semibold text-[var(--pt-ink)] text-sm sm:text-[15px] pr-2">
                  {item.q}
                </span>
                <span className="shrink-0 text-[var(--pt-muted)]">
                  {open ? (
                    <Minus className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 sm:px-5 pb-4 text-sm text-[var(--pt-muted)] leading-relaxed -mt-1">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
