'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Shield, ArrowRight, Star, Code, Zap, Calendar, Clock, Eye } from 'lucide-react';

const roles = [
  "Software Engineer",
  "App Inventor",
  "Mad Technologist",
  "Problem Solver"
];

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
    href: 'https://linkedin.com/in/lf32/',
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

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    // Fetch latest blogs
    const fetchLatestBlogs = async () => {
      try {
        const blogsResponse = await fetch('/api/blogs');
        const blogsData = await blogsResponse.json();
        const blogs = blogsData.slice(0, 3); // Get latest 3 blogs
        setLatestBlogs(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column - Personal Info */}
          <motion.div 
            className="lg:col-span-7 space-y-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Intro Text */}
            <div className="space-y-6">
              <motion.div 
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100/50 shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Star className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Collaborate for OSS</span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-8">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-blue-100/50 shadow-xl ring-4 ring-white">
                      <Image
                        src="/mebase.png"
                        alt="Lali Akhil Raj"
                        fill
                        sizes="(max-width: 768px) 5rem, (max-width: 1024px) 6rem, 7rem"
                        className="object-cover object-center"
                        priority
                        quality={100}
                        onError={(e) => {
                          console.error('Error loading mebase.png, trying fallback images...');
                          const fallbacks = ['/standing.png', '/profile.jpg', '/p1.png'];
                          let currentIndex = 0;
                          
                          const tryNextFallback = () => {
                            if (currentIndex < fallbacks.length) {
                              e.target.src = fallbacks[currentIndex];
                              currentIndex++;
                              e.target.onerror = tryNextFallback;
                            } else {
                              console.error('All fallback images failed to load');
                              e.target.src = '/profile.jpg';
                            }
                          };
                          
                          tryNextFallback();
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                    </div>
                    <div className="space-y-2">
                      <span className="block text-gray-800">Hi, I'm</span>
                      <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        lf32_
                      </span>
                    </div>
                  </div>
                </motion.h1>

                <motion.div 
                  className="h-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.h2
                    key={currentRole}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl md:text-2xl text-gray-600 font-medium"
                  >
                    {roles[currentRole]}
                  </motion.h2>
                </motion.div>

                <motion.p 
                  className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Passionate about using technology to solve real-world problems and create meaningful experiences.
                </motion.p>
              </div>
            </div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="#contact"
                className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 font-semibold">Reach Out</span>
                <ArrowRight className="relative z-10 w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#projects"
                className="group relative inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span className="relative z-10 font-semibold">View Projects</span>
                <ArrowRight className="relative z-10 w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ y: -15, x: 4, zIndex: 50, transition: { duration: 0.3, ease: "easeOut" } }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <link.icon className={`w-6 h-6 text-gray-600 transition-colors duration-300 ${link.color}`} />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                      {link.stats}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Latest Blog Posts */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
              </div>
              <Link 
                href="/blog"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative h-[850px]">
                {latestBlogs.map((blog, index) => (
                  <motion.article
                    key={blog.date}
                    className="group absolute w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100"
                    style={{
                      top: `${index * 60}px`,
                      right: isMobile ? '0px' : `${index * 20}px`,
                      zIndex: latestBlogs.length - index,
                      transform: `translateY(${index * -18}px)`,
                    }}
                    whileHover={{ 
                      y: -15,
                      x: isMobile ? 0 : 4,
                      zIndex: 50,
                      transition: { 
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }}
                  >
                    <Link href={`/blog/${blog.date}`} className="block">
                      <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-4xl font-bold opacity-10 transform group-hover:scale-110 transition-transform duration-300">
                            {blog.category?.charAt(0) || 'B'}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        {blog.category && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 mb-3">
                            {blog.category}
                          </span>
                        )}
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <time dateTime={blog.date}>{blog.formattedDate}</time>
                            </div>
                            {blog.readTime && (
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{blog.readTime}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-500">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-200 rounded-full p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-blue-600 rounded-full mx-auto"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
} 