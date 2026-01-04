import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/#why', label: t('nav.why') },
    { href: '/#how', label: t('nav.how') },
    { href: '/schemes', label: t('nav.schemes') },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const element = document.getElementById(href.slice(2));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl shadow-civic-md border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      <nav className="civic-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/favicon.ico"
            alt="Civic Sahayak Logo"
            className="w-9 h-9 rounded-full"
          />
            {/* <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg"></span>
            </div> */}
            <span className="font-bold text-lg text-foreground">Civic Sahayak</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="nav"
                size="sm"
                asChild
                onClick={() => handleNavClick(link.href)}
              >
                {link.href.startsWith('/#') ? (
                  <a href={link.href}>{link.label}</a>
                ) : (
                  <Link to={link.href}>{link.label}</Link>
                )}
              </Button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="relative flex items-center h-9 px-1 rounded-full bg-muted border border-border overflow-hidden"
            >
              <motion.div
                className="absolute h-7 w-10 bg-primary rounded-full"
                animate={{ x: language === 'en' ? 2 : 42 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
              <span className={`relative z-10 px-2.5 py-1 text-xs font-semibold transition-colors ${
                language === 'en' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}>
                EN
              </span>
              <span className={`relative z-10 px-2.5 py-1 text-xs font-semibold transition-colors ${
                language === 'hi' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}>
                हिंदी
              </span>
            </button>

            {/* CTA Button - Desktop */}
            <Button variant="civic" size="default" className="hidden lg:inline-flex">
              {t('nav.cta')}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-lg">C</span>
                      </div>
                      <span className="font-bold text-lg">Civic Sahayak</span>
                    </div>
                  </div>
                  <nav className="flex-1 p-6 space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {link.href.startsWith('/#') ? (
                          <a
                            href={link.href}
                            onClick={() => handleNavClick(link.href)}
                            className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
                          >
                            {link.label}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </nav>
                  <div className="p-6 border-t border-border">
                    <Button variant="civic" size="lg" className="w-full">
                      {t('nav.cta')}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
