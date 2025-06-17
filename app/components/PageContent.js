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
import PGPKey from './PGPKey';

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
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.3]);
  const floatingElementsOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.2]);

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
      className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Animated background elements */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: backgroundOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: floatingElementsOpacity }}
      >
        <FloatingElements elements={floatingElements} />
      </motion.div>

      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        id="top" 
        className="min-h-screen flex items-center justify-center relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-purple-50/50 pointer-events-none" />
        <Hero />
      </motion.section>

      {/* Social Proof Section */}
      <motion.section 
        id="social-proof" 
        className="relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-transparent to-blue-50/50 pointer-events-none" />
        <SocialProof />
      </motion.section>

      {/* Blog Section */}
      <motion.section 
        id="blog" 
        className="min-h-screen flex items-center relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-transparent to-blue-50/50 pointer-events-none" />
        <Blog />
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="min-h-screen flex items-center relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-purple-50/50 pointer-events-none" />
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
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 pointer-events-none" />
        <Experience />
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className="min-h-screen flex items-center relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-transparent to-blue-50/50 pointer-events-none" />
        <Projects />
      </motion.section>

      {/* Contact & PGP Section */}
      <motion.section 
        id="contact" 
        className="relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-transparent to-blue-50/50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Contact & Security_</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with me securely using encrypted communication
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Contact />
            <PGPKey />
          </div>
        </div>
      </motion.section>
    </motion.main>
  );
} 