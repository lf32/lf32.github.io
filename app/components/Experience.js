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
    <div className="w-full py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <span className="section-label">Experience</span>
          <h2 className="headline text-3xl sm:text-4xl md:text-5xl mt-4">
            Professional journey
          </h2>
          <p className="mt-4 text-[var(--ramp-muted)] text-lg leading-relaxed">
            Defense research, kernel development, and open-source security tooling.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline rail */}
          <div className="absolute left-[1.15rem] top-3 bottom-3 w-px bg-gradient-to-b from-[var(--ramp-lime)] via-black/10 to-transparent hidden sm:block" />

          <div className="space-y-5">
            {experiences.map((exp, index) => (
              <div key={index} className="relative sm:pl-12">
                <div className="absolute left-2.5 top-7 w-3 h-3 rounded-full bg-[var(--ramp-lime)] border-2 border-white shadow-sm hidden sm:block z-10" />

                <article className="glass-card p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold tracking-tight text-[var(--ramp-ink)]">
                      {exp.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--ramp-lime)]/40 text-[var(--ramp-ink)]">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[15px] font-medium text-[var(--ramp-ink-soft)]">
                    {exp.company}
                  </p>
                  <p className="text-sm text-[var(--ramp-muted)] mb-4">{exp.location}</p>
                  <p className="text-sm sm:text-[15px] text-[var(--ramp-ink-soft)] leading-relaxed">
                    {exp.description}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center glass rounded-3xl px-6 py-8 max-w-xl mx-auto">
          <h3 className="text-lg font-semibold text-[var(--ramp-ink)]">
            Interested in collaboration?
          </h3>
          <p className="text-sm text-[var(--ramp-muted)] mt-2 max-w-md mx-auto">
            Always open to discussing new opportunities and exciting projects.
          </p>
        </div>
      </div>
    </div>
  );
}
