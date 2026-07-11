'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Star, 
  ArrowRight
} from 'lucide-react';

const projects = [
  {
    title: "Secure Code Review Platform",
    description: "A collaborative platform for secure code reviews with automated vulnerability detection and real-time collaboration features for development teams.",
    image: "https://images.unsplash.com/photo-1567583789793-87f44f80ab61",
    tags: ["React", "Node.js", "Docker", "Security"],
    github: "https://github.com/lf32/code-review-platform",
    demo: "https://demo.code-review.com",
    featured: true,
    year: "2023"
  },
  {
    title: "Threat Intelligence Dashboard",
    description: "Real-time threat intelligence dashboard that aggregates security data from multiple sources with automated monitoring and alert systems.",
    image: "https://images.unsplash.com/photo-1567583789793-87f44f80ab61",
    tags: ["Python", "React", "Elasticsearch", "Security"],
    github: "https://github.com/lf32/threat-dashboard",
    demo: "https://demo.threat-dashboard.com",
    featured: true,
    year: "2023"
  },
  {
    title: "Automated Penetration Testing Tool",
    description: "Comprehensive automated penetration testing framework that integrates multiple security tools for vulnerability assessment and reporting.",
    image: "https://images.unsplash.com/photo-1567583789793-87f44f80ab61",
    tags: ["Python", "Security", "Automation", "Docker"],
    github: "https://github.com/lf32/auto-pentest",
    demo: null,
    featured: false,
    year: "2022"
  },
  {
    title: "Supply Chain Security Scanner",
    description: "Advanced tool for analyzing software dependencies and detecting supply chain vulnerabilities in open source packages.",
    image: "https://images.unsplash.com/photo-1567583789793-87f44f80ab61",
    tags: ["Go", "Security", "CLI", "SBOM"],
    github: "https://github.com/lf32/supply-chain-scanner",
    demo: null,
    featured: false,
    year: "2022"
  }
];

export default function Projects() {
  return (
    <div className="w-full py-20 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-3">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Clean Header */}
        <div className="mb-16">
          <div className="mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-gray-900"></div>
              <span className="text-sm font-medium text-gray-900 tracking-wider uppercase">Projects</span>
            </div>
          </div>
          <div className="text-center space-y-6">
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-gray-900 tracking-tight">
              Selected Work
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">
              <span className="font-mono text-sm text-red-700">exploit@pwn:~$ mmap(NULL, 0x1000, PROT_READ|PROT_WRITE, MAP_ANONYMOUS|MAP_PRIVATE, -1, 0)</span>
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group space-y-4"
              >
                {/* Title and Year */}
                <div className="flex items-baseline space-x-3">
                  <h3 className="font-playfair text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-500 font-medium">
                    {project.year}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed font-light text-sm">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-600 bg-gray-100 px-2 py-1 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center space-x-4 text-sm">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">More on GitHub</h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Additional projects and contributions can be found on my GitHub profile.
            </p>
            <div className="flex justify-center pt-4">
              <a
                href="https://github.com/lf32"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Visit GitHub Profile
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}