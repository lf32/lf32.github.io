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
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">About Me_</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A passionate software engineer and security researcher focused on creating secure and innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Image */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-2xl transform rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-2xl transform -rotate-3" />
              <div className="relative w-full h-full">
                <Image
                  src="/mebase.png"
                  alt="About Me"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Bio */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">Bio</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  I recently graduated from Indian Institute of Technology (BHU), Varanasi in Computer Science and Engineering. 
                  My journey in technology has been driven by a passion for both development and security.
                </p>
                <p>
                  With a strong foundation in software engineering and a keen eye for security, I specialize in building 
                  robust applications while ensuring they meet the highest security standards. My experience spans across 
                  full-stack development, security research, and system architecture.
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">Key Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    className="glass rounded-xl p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 bg-${achievement.color.split('-')[1]}-50 rounded-lg`}>
                        <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-sm text-gray-600">{achievement.platform}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Card - Moved here */}
            <motion.div
              className="glass rounded-2xl p-6 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">Hyderabad, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:lf32.dev@gmail.com" className="text-gray-900 hover:text-blue-600 transition-colors">
                    lf32.dev@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                <Link 
                  href="https://linkedin.com/in/lf32-dev/" 
                  target="_blank" 
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link 
                  href="https://github.com/lf32" 
                  target="_blank" 
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link 
                  href="https://hackerone.com/lf32?type=user" 
                  target="_blank" 
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                >
                  <Shield className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span className="relative z-10 font-semibold">Let's Work Together</span>
                <ArrowRight className="relative z-10 w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
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