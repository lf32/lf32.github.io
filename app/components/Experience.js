'use client';

import { useState } from 'react';

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "Defence Research and Development Organisation | RCI",
    location: "India",
    period: "2023",
    description: "Specialized in security engineering at India's premier defense research organization, focusing on web application security assessments and real-time missile tracking systems. Built Python-based security tools and conducted comprehensive threat modeling for critical defense applications, combining cybersecurity expertise with mission-critical software development."
  },
  {
    title: "Kernel Developer Intern",
    company: "The Linux Foundation",
    location: "Remote",
    period: "2022",
    description: "Contributed to the Linux kernel ecosystem through advanced fuzzing techniques and Rust integration for Linux 6.1. Collaborated directly with kernel maintainers including Shuah Khan on kselftests infrastructure and Greg Kroah-Hartman on essential development scripts, gaining deep experience in low-level systems programming and open-source collaboration.",
  },
  {
    title: "Software Engineer Intern",
    company: "NexB, Google Summer of Code",
    location: "Remote",
    period: "2022",
    description: "Developed ScanText, a comprehensive license and copyright scanning tool for software dependency analysis. Enhanced the scancode-toolkit while researching supply chain security vulnerabilities through VulnerableCode. Discovered and responsibly disclosed critical security flaws in web applications, contributing to both open-source tooling and cybersecurity research."
  }
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

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
              <span className="text-sm font-medium text-gray-900 tracking-wider uppercase">Experience</span>
            </div>
          </div>
          <div className="text-center space-y-6">
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-gray-900 tracking-tight">
              Professional Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">
              <span className="font-mono text-sm text-green-700">lf32@debug:~$ ptrace(PTRACE_SYSCALL, pid, NULL, NULL)</span>
            </p>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 hidden md:block"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-2 w-3 h-3 bg-gray-900 rounded-full hidden md:block"></div>
                
                {/* Content */}
                <div className="md:ml-12 border-b border-gray-200 pb-8 last:border-b-0">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-3 mb-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {exp.title}
                      </h3>
                      <span className="text-sm text-gray-500 font-medium">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-lg font-medium text-gray-800">{exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.location}</p>
                  </div>

                  {/* Description */}
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">Interested in collaboration?</h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
} 