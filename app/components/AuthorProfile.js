import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';
import Image from 'next/image';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/lf32',
    color: 'hover:text-gray-900'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/lf32',
    color: 'hover:text-blue-700'
  },
  {
    name: 'Website',
    icon: Globe,
    url: 'https://lf32.dev',
    color: 'hover:text-blue-600'
  }
];

const AuthorProfile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex flex-col items-center text-center">
        {/* Author Image */}
        <div className="relative w-24 h-24 mb-4">
          <Image
            src="/mebase.png"
            alt="LF32"
            fill
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 96px, 96px"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-2 ring-blue-100 ring-offset-2" />
        </div>

        {/* Author Info */}
        <h2 className="text-xl font-bold text-gray-900 mb-1">Lali Akhil Raj</h2>
        <p className="text-blue-600 font-medium mb-2">Software Engineer & Security Researcher</p>
        
        {/* Bio */}
        <p className="text-gray-600 text-sm mb-4 max-w-xs">
          Passionate about building secure and scalable software solutions. 
          Specializing in web development, security research, and open source.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-500 transition-colors duration-200 ${link.color}`}
              aria-label={`Visit ${link.name} profile`}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorProfile; 