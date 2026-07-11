'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Shield, Mail, MapPin, ArrowRight } from 'lucide-react';

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

export default function About() {
  return (
    <div className="w-full py-20 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
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
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-gray-900"></div>
              <span className="text-sm font-medium text-gray-900 tracking-wider uppercase">About</span>
            </div>
          </div>
          <div className="text-center space-y-6">
            <h2 className="font-playfair text-4xl md:text-5xl font-medium text-gray-900 tracking-tight">
              Engineering Secure Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              <span className="font-mono text-sm text-gray-800">root@exploit:~# objdump -d /proc/self/exe | grep -A 5 main | awk {`{print $3}`}</span>
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column - Image */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Professional Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden bg-gray-100">
                <Image
                  src="/mebase.png"
                  alt="Lali Akhil Raj - LF32"
                  fill
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
              {/* Simple caption */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 font-light">
                  Lali Akhil Raj, Software Engineer & Security Researcher
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-light text-gray-900">2+</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Years</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-gray-900">25+</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-gray-900">20+</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Security Reports</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            className="lg:col-span-7 space-y-12"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Background */}
            <div className="space-y-6">
              <h3 className="font-playfair text-2xl font-medium text-gray-900">Background</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Recent graduate from the Indian Institute of Technology (BHU), Varanasi, 
                  with a degree in Computer Science and Engineering. My academic foundation 
                  has been complemented by practical experience in both software development 
                  and cybersecurity research.
                </p>
                <p>
                  I specialize in building secure, scalable applications while maintaining 
                  a security-first mindset. My approach combines modern development practices 
                  with rigorous security testing and vulnerability assessment.
                </p>
              </div>
            </div>


            {/* Recognition */}
            <div className="space-y-6">
              <h3 className="font-playfair text-2xl font-medium text-gray-900">Recognition</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    className="flex items-start space-x-4 py-4 border-b border-gray-100 last:border-b-0"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <achievement.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.platform}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <motion.div
              className="pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Let's Collaborate</h4>
                <p className="text-gray-600">
                  Interested in discussing security research, development projects, or potential collaborations?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="#contact"
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors duration-200"
                  >
                    Get In Touch
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Read My Work
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .gradient-text {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
} 