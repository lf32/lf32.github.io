'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Secure Code Review Platform',
    description:
      'A collaborative platform for secure code reviews with automated vulnerability detection and real-time collaboration for development teams.',
    tags: ['React', 'Node.js', 'Docker', 'Security'],
    github: 'https://github.com/lf32/code-review-platform',
    demo: 'https://demo.code-review.com',
    year: '2023',
  },
  {
    title: 'Threat Intelligence Dashboard',
    description:
      'Real-time threat intelligence dashboard aggregating security data from multiple sources with automated monitoring and alerts.',
    tags: ['Python', 'React', 'Elasticsearch', 'Security'],
    github: 'https://github.com/lf32/threat-dashboard',
    demo: 'https://demo.threat-dashboard.com',
    year: '2023',
  },
  {
    title: 'Automated Penetration Testing Tool',
    description:
      'Automated penetration testing framework integrating multiple security tools for vulnerability assessment and reporting.',
    tags: ['Python', 'Security', 'Automation', 'Docker'],
    github: 'https://github.com/lf32/auto-pentest',
    demo: null,
    year: '2022',
  },
  {
    title: 'Supply Chain Security Scanner',
    description:
      'Tool for analyzing software dependencies and detecting supply chain vulnerabilities in open source packages.',
    tags: ['Go', 'Security', 'CLI', 'SBOM'],
    github: 'https://github.com/lf32/supply-chain-scanner',
    demo: null,
    year: '2022',
  },
];

export default function Projects() {
  return (
    <div className="container-page">
      <div className="section-header">
        <span className="section-label">Projects</span>
        <h2 className="headline text-3xl sm:text-4xl mt-3">Selected work</h2>
        <p className="mt-2 text-[var(--ramp-muted)] text-base">
          Security platforms, intelligence tooling, and open-source scanners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="glass-card p-5 sm:p-6 flex flex-col h-full"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[var(--ramp-ink)]">
                {project.title}
              </h3>
              <span className="text-[11px] font-semibold text-[var(--ramp-muted)] bg-black/[0.04] px-2 py-1 rounded-full flex-shrink-0">
                {project.year}
              </span>
            </div>

            <p className="text-sm text-[var(--ramp-ink-soft)] leading-relaxed flex-grow mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-[var(--ramp-ink-soft)] bg-black/[0.04] border border-black/[0.04] px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm pt-3 border-t border-black/[0.05]">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--ramp-ink-soft)] hover:text-[var(--ramp-ink)] transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-[var(--ramp-ink-soft)] hover:text-[var(--ramp-ink)] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 text-center glass rounded-2xl px-5 py-5 max-w-lg mx-auto">
        <h3 className="text-base font-semibold text-[var(--ramp-ink)]">More on GitHub</h3>
        <p className="text-sm text-[var(--ramp-muted)] mt-1 mb-3">
          Additional projects and contributions on my profile.
        </p>
        <a
          href="https://github.com/lf32"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-semibold text-[var(--ramp-ink)] hover:opacity-70"
        >
          Visit GitHub
          <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
}
