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
    <div className="w-full py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <span className="section-label">Projects</span>
          <h2 className="headline text-3xl sm:text-4xl md:text-5xl mt-4">
            Selected work
          </h2>
          <p className="mt-4 text-[var(--ramp-muted)] text-lg leading-relaxed">
            Security platforms, intelligence tooling, and open-source scanners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="glass-card p-6 sm:p-7 flex flex-col h-full group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-semibold tracking-tight text-[var(--ramp-ink)] group-hover:opacity-80 transition-opacity">
                  {project.title}
                </h3>
                <span className="text-xs font-semibold text-[var(--ramp-muted)] bg-black/[0.04] px-2.5 py-1 rounded-full flex-shrink-0">
                  {project.year}
                </span>
              </div>

              <p className="text-sm text-[var(--ramp-ink-soft)] leading-relaxed flex-grow mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-[var(--ramp-ink-soft)] bg-black/[0.04] border border-black/[0.04] px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm pt-1 border-t border-black/[0.05]">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-[var(--ramp-ink-soft)] hover:text-[var(--ramp-ink)] transition-colors pt-4"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[var(--ramp-ink-soft)] hover:text-[var(--ramp-ink)] transition-colors pt-4"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center glass rounded-3xl px-6 py-8 max-w-xl mx-auto">
          <h3 className="text-lg font-semibold text-[var(--ramp-ink)]">More on GitHub</h3>
          <p className="text-sm text-[var(--ramp-muted)] mt-2 mb-4 max-w-md mx-auto">
            Additional projects and contributions on my GitHub profile.
          </p>
          <a
            href="https://github.com/lf32"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-semibold text-[var(--ramp-ink)] hover:opacity-70 transition-opacity"
          >
            Visit GitHub
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
