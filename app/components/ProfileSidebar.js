'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Shield, Mail, MapPin, ArrowRight, Star, Calendar, Clock, Eye, Briefcase } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/lf32',
    icon: Github,
    color: 'hover:text-gray-900',
    stats: '1.2k+ Contributions'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/lali-akhil-raj/',
    icon: Linkedin,
    color: 'hover:text-blue-600',
    stats: '500+ Connections'
  },
  {
    name: 'HackerOne',
    href: 'https://hackerone.com/lf32?type=user',
    icon: Shield,
    color: 'hover:text-green-600',
    stats: '20+ Valid Reports'
  }
];

const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "Projects Completed", value: "25+" },
  { label: "Security Reports", value: "20+" }
];

const achievements = [
  {
    title: "Top 10% Security Researcher",
    platform: "HackerOne",
    icon: Shield,
    color: "text-green-600"
  },
  {
    title: "Google Summer of Code",
    platform: "NexB",
    icon: Github,
    color: "text-blue-600"
  },
  {
    title: "Linux Kernel Developer",
    platform: "The Linux Foundation",
    icon: Shield,
    color: "text-purple-600"
  }
];

export default function ProfileSidebar() {
  return (
    <div className="sticky top-8 space-y-12">
      {/* Author Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-playfair text-lg font-medium text-gray-900 tracking-wide">About the Author</h3>
        </div>

        {/* Profile Image & Info */}
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src="/images/0xlf32.jpg"
                alt="LF32 - Lali Akhil Raj"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-medium text-gray-900">Lali Akhil Raj</h4>
              <p className="text-sm text-gray-700 font-medium">Legionnaire</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 font-light leading-relaxed">
            Passionate about AAI.
          </p>

          {/* Location & Contact */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span>Stealth Mode</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <a href="mailto:lf32.dev@gmail.com" className="hover:text-gray-900 transition-colors">
                lf32.dev@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>India</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 pt-2">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
                whileHover={{ y: -1 }}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 italic border-l-2 border-gray-200">
          <span className="font-medium text-gray-600">Current Focus:</span> AAI, AI-powered security, and AI-powered risk assessment.
        </div>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-playfair text-lg font-medium text-gray-900 tracking-wide">Experience</h4>
        </div>
        
        <div className="space-y-6">
          {stats.map((stat, index) => (
            <div key={stat.label} className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-600 font-light">{stat.label}</span>
                <span className="text-lg font-medium text-gray-900">{stat.value}</span>
              </div>
              <div className="text-xs text-gray-500 italic">
                {index === 0 ? "Building secure applications" : 
                 index === 1 ? "From web apps to security tools" : 
                 "Disclosed vulnerabilities"}
              </div>
            </div>
          ))}
        </div>

      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-playfair text-lg font-medium text-gray-900 tracking-wide">Recognition</h4>
        </div>
        
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={achievement.title} className="space-y-1">
              <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
              <p className="text-xs text-gray-600 font-light">{achievement.platform}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="pt-6 border-t border-gray-200"
      >
        <Link
          href="#contact"
          className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors duration-200"
        >
          Get In Touch
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </motion.div>
    </div>
  );
}
