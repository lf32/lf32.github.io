'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Star, 
  Shield, 
  Code, 
  Zap,
  ArrowRight
} from 'lucide-react';

const projects = [
  {
    title: "Secure Code Review Platform",
    description: "A collaborative platform for secure code reviews with automated vulnerability detection.",
    image: "https://images.unsplash.com/photo-1567583789793-87f44f80ab61",
    tags: ["React", "Node.js", "Docker", "Security"],
    github: "https://github.com/lf32/code-review-platform",
    demo: "https://demo.code-review.com",
    featured: true,
    stats: {
      stars: 85,
      forks: 30,
      issues: 8
    },
    highlights: [
      "CI/CD integration",
      "Real-time collaboration",
      "Automated security checks"
    ]
  },
  {
    title: "Threat Intelligence Dashboard",
    description: "Real-time threat intelligence dashboard that aggregates and analyzes security data.",
    image: "https://images.unsplash.com/photo-1567583789793-87f44f80ab61",
    tags: ["Python", "React", "Elasticsearch", "Security"],
    github: "https://github.com/lf32/threat-dashboard",
    demo: "https://demo.threat-dashboard.com",
    featured: true,
    stats: {
      stars: 150,
      forks: 60,
      issues: 15
    },
    highlights: [
      "Real-time threat monitoring",
      "Data visualization",
      "Automated alerts"
    ]
  },
  {
    title: "Automated Penetration Testing Tool",
    description: "An automated penetration testing tool that combines multiple security tools.",
    image: "https://images.unsplash.com/photo-1567583789793-87f44f80ab61",
    tags: ["Python", "Security", "Automation", "Docker"],
    github: "https://github.com/lf32/auto-pentest",
    demo: null,
    featured: false,
    stats: {
      stars: 95,
      forks: 35,
      issues: 10
    },
    highlights: [
      "Automated vulnerability scanning",
      "Comprehensive reporting",
      "Tool integration"
    ]
  }
];

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-50">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="space-y-2 mb-4">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{project.stats.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <Code className="w-4 h-4" />
            <span>{project.stats.forks}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>{project.stats.issues}</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm">View Code</span>
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section className="w-full py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of my work in software development and security research
          </p>
        </motion.div>

        {/* Under Progress Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg text-center"
        >
          <p className="text-blue-700 flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            <span>This section is currently under progress as I'm finalizing which projects to showcase.</span>
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 