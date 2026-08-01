'use client';

const experiences = [
  {
    title: 'Software Engineer Intern',
    company: 'Defence Research and Development Organisation | RCI',
    location: 'India',
    period: '2023',
    description:
      "Specialized in security engineering at India's premier defense research organization, focusing on web application security assessments and real-time missile tracking systems. Built Python-based security tools and conducted comprehensive threat modeling for critical defense applications.",
  },
  {
    title: 'Kernel Developer Intern',
    company: 'The Linux Foundation',
    location: 'Remote',
    period: '2022',
    description:
      'Contributed to the Linux kernel ecosystem through advanced fuzzing techniques and Rust integration for Linux 6.1. Collaborated with kernel maintainers including Shuah Khan on kselftests and Greg Kroah-Hartman on essential development scripts.',
  },
  {
    title: 'Software Engineer Intern',
    company: 'NexB, Google Summer of Code',
    location: 'Remote',
    period: '2022',
    description:
      'Developed ScanText, a license and copyright scanning tool for software dependency analysis. Enhanced scancode-toolkit while researching supply chain security through VulnerableCode. Discovered and responsibly disclosed critical security flaws.',
  },
];

export default function Experience() {
  return (
    <div className="container-page">
      <div className="section-header">
        <span className="section-label">Experience</span>
        <h2 className="headline text-3xl sm:text-4xl mt-3">Professional journey</h2>
        <p className="mt-2 text-[var(--ramp-muted)] text-base">
          Defense research, kernel development, and open-source security tooling.
        </p>
      </div>

      <div className="relative max-w-3xl">
        <div className="absolute left-[1.05rem] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--ramp-lime)] via-black/10 to-transparent hidden sm:block" />

        <div className="space-y-3 sm:space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="relative sm:pl-12">
              <div className="absolute left-2.5 top-6 w-2.5 h-2.5 rounded-full bg-[var(--ramp-lime)] border-2 border-white shadow-sm hidden sm:block z-10" />

              <article className="glass-card p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[var(--ramp-ink)]">
                    {exp.title}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--ramp-lime)]/40 text-[var(--ramp-ink)]">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--ramp-ink-soft)]">{exp.company}</p>
                <p className="text-xs text-[var(--ramp-muted)] mb-3">{exp.location}</p>
                <p className="text-sm text-[var(--ramp-ink-soft)] leading-relaxed">
                  {exp.description}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
