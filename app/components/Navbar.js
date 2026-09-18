'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Shield } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const isBlogRoute = pathname?.startsWith('/blog');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(isBlogRoute ? 'blog' : 'top');

  useEffect(() => {
    if (isBlogRoute) {
      setActiveSection('blog');
      const onScroll = () => setIsScrolled(window.scrollY > 24);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      if (window.scrollY < 100) {
        setActiveSection('top');
        return;
      }

      const sections = [
        'about',
        'skills',
        'experience',
        'projects',
        'writing',
        'elsewhere',
        'faq',
        'lab',
        'contact',
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBlogRoute]);

  const navLinks = isBlogRoute
    ? [
        { href: '/', label: 'Home', id: 'home' },
        { href: '/blog', label: 'Blog', id: 'blog' },
        { href: '/#about', label: 'About', id: 'about' },
        { href: '/#projects', label: 'Projects', id: 'projects' },
      ]
    : [
        { href: '#top', label: 'Home', id: 'top' },
        { href: '#about', label: 'About', id: 'about' },
        { href: '#writing', label: 'Writing', id: 'writing' },
        { href: '#projects', label: 'Projects', id: 'projects' },
        { href: '/blog', label: 'Blog', id: 'blog' },
      ];

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const logoHref = isBlogRoute ? '/' : '#top';
  const logoClick = isBlogRoute ? undefined : scrollToTop;
  const contactHref = isBlogRoute ? '/#contact' : '#contact';

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4"
      >
        <nav
          className={`mx-auto max-w-5xl rounded-full transition-all duration-300 ${
            isScrolled
              ? 'glass-strong shadow-lg shadow-black/5'
              : 'glass'
          }`}
        >
          <div className="flex items-center justify-between h-14 px-4 sm:px-5">
            <Link
              href={logoHref}
              onClick={logoClick}
              className="flex items-center gap-2 pl-1 group"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ramp-ink)] text-[var(--ramp-lime)] text-xs font-bold tracking-tight">
                LF
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-[var(--ramp-ink)] group-hover:opacity-70 transition-opacity">
                LF32
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={link.href === '#top' ? scrollToTop : undefined}
                    className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                      isActive
                        ? 'text-[var(--ramp-ink)] bg-black/[0.05]'
                        : 'text-[var(--ramp-muted)] hover:text-[var(--ramp-ink)] hover:bg-black/[0.03]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link
                href={contactHref}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--ramp-lime)] text-[var(--ramp-ink)] text-sm font-semibold hover:bg-[var(--ramp-lime-hover)] transition-colors shadow-sm shadow-[rgba(210,243,76,0.35)]"
              >
                Contact
              </Link>
            </div>

            <button
              type="button"
              className="md:hidden p-2 rounded-full text-[var(--ramp-ink)] hover:bg-black/[0.05] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-4 right-4 glass-strong rounded-3xl p-6 shadow-2xl"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === '#top') scrollToTop(e);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                      activeSection === link.id
                        ? 'bg-black/[0.05] text-[var(--ramp-ink)]'
                        : 'text-[var(--ramp-muted)] hover:bg-black/[0.03] hover:text-[var(--ramp-ink)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-black/[0.06]">
                <Link
                  href={contactHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-lime w-full"
                >
                  Get in touch
                </Link>
                <div className="flex items-center justify-center gap-6 mt-5">
                  <a href="https://github.com/lf32" target="_blank" rel="noopener noreferrer" className="text-[var(--ramp-muted)] hover:text-[var(--ramp-ink)] transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/lali-akhil-raj/" target="_blank" rel="noopener noreferrer" className="text-[var(--ramp-muted)] hover:text-[var(--ramp-ink)] transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://hackerone.com/lf32?type=user" target="_blank" rel="noopener noreferrer" className="text-[var(--ramp-muted)] hover:text-[var(--ramp-ink)] transition-colors">
                    <Shield className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
