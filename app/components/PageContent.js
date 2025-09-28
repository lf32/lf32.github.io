'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Navbar from './Navbar';
import Blog from './Blog';
import SocialProof from './SocialProof';
import FloatingElements from './FloatingElements';
import NewsStyleBlog from './NewsStyleBlog';
import ProfileSidebar from './ProfileSidebar';

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

// Animation variants for section transitions
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1
    }
  }
};

// Floating elements configuration
const floatingElements = [
  { type: 'circle', size: 60, color: 'blue', x: '10%', y: '20%', delay: 0 },
  { type: 'square', size: 40, color: 'purple', x: '85%', y: '30%', delay: 0.2 },
  { type: 'triangle', size: 50, color: 'blue', x: '20%', y: '70%', delay: 0.4 },
  { type: 'circle', size: 30, color: 'purple', x: '75%', y: '80%', delay: 0.6 },
  { type: 'square', size: 45, color: 'blue', x: '40%', y: '40%', delay: 0.8 },
  { type: 'triangle', size: 35, color: 'purple', x: '60%', y: '60%', delay: 1 }
];

export default function PageContent() {
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.05, 0.1]);

  useEffect(() => {
    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Intersection Observer for section animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '-100px 0px'
      }
    );

    document.querySelectorAll('.animate-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.main 
      className="relative min-h-screen bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Subtle background pattern */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: backgroundOpacity }}
      >
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #f3f4f6 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} 
        />
      </motion.div>

      <Navbar />
      
      {/* News-Style Homepage */}
      <motion.section 
        className="relative z-10 pt-20 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - News Style Blog (3/4 width) */}
            <div className="lg:col-span-3">
              <NewsStyleBlog />
            </div>

            {/* Sidebar - Profile Info (1/4 width) */}
            <div className="lg:col-span-1">
              <ProfileSidebar />
            </div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="relative z-10 py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-gray-50/50 pointer-events-none" />
        <About />
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        className="relative py-20 z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white pointer-events-none" />
        <Experience />
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className="relative py-20 z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-gray-50/50 pointer-events-none" />
        <Projects />
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Contact />
      </motion.section>

      {/* Custom Styles */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </motion.main>
  );
} 