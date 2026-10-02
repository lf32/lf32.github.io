'use client';

const items = [
  {
    label: 'Work',
    value: 'Stealth / building in security & AI risk',
  },
  {
    label: 'Research',
    value: 'Supply chain threats, secure defaults, kernel-adjacent tooling',
  },
  {
    label: 'Writing',
    value: 'Blog posts on attacks, accelerators, and hard-earned lessons',
  },
  {
    label: 'Based',
    value: 'India · remote-friendly',
  },
];

export default function Now() {
  return (
    <div className="container-page">
      <div className="section-header">
        <span className="section-label">Now</span>
        <h2 className="headline mt-3">What I&apos;m up to</h2>
        <p className="mt-2 text-[var(--pt-muted)] text-base">
          A living snapshot — more useful than a dusty bio.
        </p>
      </div>

      <div className="grid grid-cols-1 border-t border-black/10 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="border-b border-black/10 py-5 pr-6 sm:py-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--pt-muted)]">
              {item.label}
            </p>
            <p className="mt-1.5 text-lg font-normal leading-snug tracking-[-0.02em] text-[var(--pt-ink)]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
