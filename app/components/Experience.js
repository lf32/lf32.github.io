'use client';

import { useState } from 'react';

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "Defence Research and Development Organisation | RCI",
    location: "Hyderabad, India",
    period: "May 2023 - July 2023",
    description: [
      "Led security assessments and penetration testing for web applications and APIs",
      "Developed a Python desktop app for real-time missile tracking from UDP data streams",
      "Conducted threat modeling and risk assessments for new features and products",
      "Collaborated with development teams to implement secure coding practices"
    ],
    technologies: ["Python", "Linux", "Desktop", "Docker"]
  },
  {
    title: "Kernel Developer Intern",
    company: "The Linux Foundation",
    location: "Remote",
    period: "Sept 2022 - Nov 2022",
    description: [
      "Kernel fuzzing throughout the process of development",
      "Collaborated with Ms. Shuah Khan on Linux kernel kselftests driver and Rust for Linux 6.1",
      "Worked on performance optimization and bug fixes",
      "Contributed to vital GitHub scripts under Greg Kroah-Hartman’s guidance"
    ],
    technologies: ["Linux Kernel", "Syzcaller", "Git", "Exploitation"]
  },
  {
    title: "Software Engineer Intern",
    company: "NexB, Google Summer of Code",
    location: "Remote",
    period: "May 2022 - Sept 2022",
    description: [
      "Developed ScanText for scanning files for licenses, copyrights, and visualizing dependencies",
      "Discovered and reported critical security vulnerabilities in web applications",
      "Enhanced scancode-toolkit and studied Supply Chain Attacks via VulnerableCode",
      "Contributed to security research and knowledge sharing"
    ],
    technologies: ["Web Development", "Vulnerability Assessment", "Report Writing"]
  }
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">Experience_</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A journey through my professional experience and growth in software development and security
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Navigation */}
          <div className="lg:col-span-1 relative z-20">
            <div className="glass rounded-xl p-6 space-y-4">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all relative z-20 ${
                    activeIndex === index
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'hover:bg-gray-50 border-transparent text-gray-700'
                  } border`}
                >
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Experience Details */}
          <div className="lg:col-span-2 relative z-10">
            <div className="glass rounded-xl p-8">
              {experiences[activeIndex] && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {experiences[activeIndex].title}
                    </h3>
                    <div className="flex items-center text-gray-600 mt-2">
                      <span className="mr-4">{experiences[activeIndex].company}</span>
                      <span className="mx-2">•</span>
                      <span>{experiences[activeIndex].location}</span>
                    </div>
                    <p className="text-blue-600 font-medium mt-1">
                      {experiences[activeIndex].period}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Key Responsibilities:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {experiences[activeIndex].description.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experiences[activeIndex].technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm border border-gray-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
