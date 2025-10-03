'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Shield, ArrowRight, Youtube } from 'lucide-react';

export default function Contact() {
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
              <span className="text-sm font-medium text-gray-900 tracking-wider uppercase">Contact</span>
            </div>
          </div>
          <div className="text-center space-y-6">
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-gray-900 tracking-tight">
              Get In Touch
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">
              <span className="font-mono text-sm text-blue-700">researcher@lab:~$ LD_PRELOAD=./hook.so gdb --batch --ex run --ex bt --args ./collaborate.elf</span>
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <a 
                    href="mailto:lf32.dev@gmail.com" 
                    className="text-lg text-gray-900 hover:text-blue-600 transition-colors duration-200"
                  >
                    lf32.dev@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-mono">0x496E6469612C20417369612C20456172746820</span>
                </div>
              </div>

              {/* PGP Section */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="font-playfair text-lg font-medium text-gray-900 mb-4">Secure Communication</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded font-mono text-sm text-gray-700">
                    <div className="text-center space-y-2">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">PGP Key Fingerprint</div>
                      <div className="break-all">4A2B 8C9D 1E3F 5A6B 7C8D 9E0F 1A2B 3C4D 5E6F 7A8B</div>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-6 text-sm">
                    <a
                      href="/pgp-key.asc"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      Download Public Key
                    </a>
                    <a
                      href="https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x4A2B8C9D1E3F5A6B7C8D9E0F1A2B3C4D5E6F7A8B"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      Keyserver Lookup
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Professional Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-8 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <a
                  href="https://github.com/lf32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-3 p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Github className="w-8 h-8 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">GitHub</div>
                    <div className="text-sm text-gray-600">Open Source Projects</div>
                  </div>
                </a>
                <a
                  href="https://linkedin.com/in/lf32/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-3 p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Linkedin className="w-8 h-8 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">LinkedIn</div>
                    <div className="text-sm text-gray-600">Professional Network</div>
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/@0xlf32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-3 p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Youtube className="w-8 h-8 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">YouTube</div>
                    <div className="text-sm text-gray-600">Security Content</div>
                  </div>
                </a>
                <a
                  href="https://hackerone.com/lf32?type=user"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-3 p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Shield className="w-8 h-8 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">HackerOne</div>
                    <div className="text-sm text-gray-600">Security Research</div>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center pt-8 border-t border-gray-200"
            >
              <p className="text-gray-600 mb-6">
                Open to collaboration, consulting opportunities, and security research discussions.
              </p>
              <a
                href="mailto:lf32.dev@gmail.com?subject=Supply Chain Security Discussion"
                className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}