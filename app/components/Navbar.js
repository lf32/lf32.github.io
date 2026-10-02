'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Linkedin, Shield } from 'lucide-react';

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

  const onDarkHero = !isBlogRoute && !isScrolled;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 pt-3">
        <nav
          className="mx-auto flex h-[64px] w-full max-w-[1400px] items-center justify-between rounded-[12px] border border-white/20 bg-[rgba(28,28,28,0.42)] px-3 text-white backdrop-blur-xl transition-colors sm:px-4"
        >
          <Link
            href={logoHref}
            onClick={logoClick}
            className="pl-2 text-[17px] font-medium tracking-[-0.02em]"
          >
            LF32
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={contactHref}
              className="btn-on-dark"
            >
              Contact
            </Link>
            <button
              type="button"
              className="flex h-10 w-11 items-center justify-center border border-white/55 text-white"
              style={{ borderRadius: 4 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <span className="flex flex-col gap-[5px]" aria-hidden="true">
                  <span className="block h-px w-[18px] bg-current" />
                  <span className="block h-px w-[18px] bg-current" />
                  <span className="block h-px w-[18px] bg-current" />
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`fixed inset-0 z-40 ${onDarkHero ? 'bg-[#111214] text-white' : 'bg-white text-[var(--pt-ink)]'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mx-auto flex h-full max-w-[1240px] flex-col px-6 pt-24 pb-10 sm:px-10">
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === '#top') scrollToTop(e);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`border-b py-3 text-[28px] sm:text-[34px] font-normal leading-none tracking-[-0.03em] ${
                      onDarkHero ? 'border-white/15' : 'border-black/10'
                    } ${activeSection === link.id ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex items-center gap-6 pt-8">
                <a href="https://github.com/lf32" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/lali-akhil-raj/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://hackerone.com/lf32?type=user" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100">
                  <Shield className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
