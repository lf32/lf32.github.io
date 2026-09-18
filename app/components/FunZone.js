'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Music, X, ExternalLink, Skull } from 'lucide-react';

const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

export default function FunZone() {
  const [revealed, setRevealed] = useState(false);
  const [toast, setToast] = useState(false);

  const triggerRickroll = () => {
    setRevealed(true);
    setToast(true);
    window.open(RICKROLL_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container-page">
      <div className="section-header">
        <span className="section-label">Lab</span>
        <h2 className="headline text-3xl sm:text-4xl mt-3">Free stuff (totally legit)</h2>
        <p className="mt-2 text-[var(--ramp-muted)] text-base">
          Every serious security site needs one unsupervised button.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <button
          type="button"
          onClick={triggerRickroll}
          className="glass-card p-5 sm:p-6 text-left group border-2 border-dashed !border-[var(--ramp-lime)]/50 hover:!border-[var(--ramp-lime)]"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--ramp-lime)] flex items-center justify-center mb-3">
            <Gift className="w-5 h-5 text-[var(--ramp-ink)]" />
          </div>
          <h3 className="text-base font-semibold text-[var(--ramp-ink)] mb-1">
            Claim free audit credits
          </h3>
          <p className="text-sm text-[var(--ramp-muted)] leading-relaxed">
            Limited-time offer. No CC required. Definitely not a trap.
          </p>
          <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[var(--ramp-ink)]">
            Open vault
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </button>

        <a
          href="https://github.com/lf32"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-5 sm:p-6 group"
        >
          <div className="w-10 h-10 rounded-xl bg-black/[0.05] flex items-center justify-center mb-3">
            <Skull className="w-5 h-5 text-[var(--ramp-ink-soft)]" />
          </div>
          <h3 className="text-base font-semibold text-[var(--ramp-ink)] mb-1">
            Actually free: source
          </h3>
          <p className="text-sm text-[var(--ramp-muted)] leading-relaxed">
            Public repos, no surprise chorus. Star if useful, issue if broken.
          </p>
        </a>

        <div className="glass-card p-5 sm:p-6">
          <div className="w-10 h-10 rounded-xl bg-black/[0.05] flex items-center justify-center mb-3">
            <Music className="w-5 h-5 text-[var(--ramp-ink-soft)]" />
          </div>
          <h3 className="text-base font-semibold text-[var(--ramp-ink)] mb-1">
            Incident response
          </h3>
          <p className="text-sm text-[var(--ramp-muted)] leading-relaxed">
            {revealed
              ? "You've been rickrolled. Never gonna give you up — or a fake audit coupon."
              : 'Status: green. No earworms detected. (Yet.)'}
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-[var(--ramp-muted)]">
        Tip: the green dashed card is not a vulnerability. It is a feature.
      </p>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 glass-strong rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 max-w-[min(92vw,22rem)]"
          >
            <Music className="w-4 h-4 text-[var(--ramp-lime-deep)] shrink-0" />
            <p className="text-xs sm:text-sm font-medium text-[var(--ramp-ink)]">
              Never gonna give you up
            </p>
            <button
              type="button"
              onClick={() => setToast(false)}
              className="p-1 rounded-full hover:bg-black/[0.05]"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5 text-[var(--ramp-muted)]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
