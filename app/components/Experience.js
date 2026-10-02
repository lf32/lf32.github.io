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
        <h2 className="headline mt-3">Professional journey</h2>
        <p className="mt-2 text-[var(--pt-muted)] text-base">
          Defense research, kernel development, and open-source security tooling.
        </p>
      </div>

      <div className="border-t border-black/10">
        {experiences.map((exp, index) => (
          <article key={`${exp.title}-${exp.company}`} className="grid grid-cols-1 gap-2 border-b border-black/10 py-6 sm:grid-cols-12 sm:gap-6 sm:py-8">
            <p className="text-[13px] text-[var(--pt-muted)] sm:col-span-2">
              /{String(index + 1).padStart(2, '0')}
            </p>
            <div className="sm:col-span-7">
              <h3 className="text-[22px] font-normal tracking-[-0.02em] leading-tight text-[var(--pt-ink)] sm:text-[28px]">
                {exp.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--pt-ink-soft)]">{exp.company}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--pt-muted)]">
                {exp.description}
              </p>
            </div>
            <p className="text-sm text-[var(--pt-muted)] sm:col-span-3 sm:text-right">
              {exp.period}
              <span className="mt-1 block">{exp.location}</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
