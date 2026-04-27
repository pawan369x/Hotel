import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Discover', href: '/about' },
    { name: 'The Suites', href: '/rooms' },
    { name: 'Experience', href: '/gallery' },
    { name: 'Dining', href: '/#dining' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          scrolled || location.pathname !== '/' 
            ? 'bg-white/95 backdrop-blur-2xl border-b border-gray-100 py-4 shadow-sm' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center group">
            <div className={`transition-all duration-700 ${scrolled ? 'h-12' : 'h-20'} w-auto flex items-center`}>
              <img src={logoImg} alt="Pink Park" className="h-full w-auto object-contain max-w-[200px] drop-shadow-md" />
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex gap-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) => `
                    group relative text-[11px] font-sans uppercase tracking-[0.25em] transition-colors
                    ${scrolled || location.pathname !== '/'
                      ? (isActive ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600')
                      : (isActive ? 'text-pink-300' : 'text-white hover:text-pink-300')
                    }
                  `}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[1px] bg-pink-500 transition-all duration-500 
                    ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}
                  `}></span>
                </NavLink>
              ))}
            </div>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-3 rounded-none text-[10px] font-sans uppercase tracking-[0.2em] transition-all duration-500 border ${
                  scrolled || location.pathname !== '/'
                    ? 'bg-gray-900 text-white border-gray-900 hover:bg-white hover:text-gray-900'
                    : 'bg-white text-gray-900 border-white hover:bg-transparent hover:text-white'
                }`}
              >
                Reserve
              </motion.button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex flex-col gap-2 p-2"
          >
            <div className={`h-[1px] w-8 transition-all ${scrolled || location.pathname !== '/' ? 'bg-gray-900' : 'bg-white'}`}></div>
            <div className={`h-[1px] w-6 transition-all ${scrolled || location.pathname !== '/' ? 'bg-gray-900' : 'bg-white'}`}></div>
          </button>
        </div>
      </nav>

      {/* FULL SCREEN OVERLAY MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white z-[200] flex flex-col"
          >
            <div className="flex justify-between items-center p-8 border-b border-gray-50">
               <img src={logoImg} alt="Pink Park" className="h-12 w-auto object-contain" />
               <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2"
              >
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-grow flex flex-col justify-center items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                >
                  <Link
                    to={link.href}
                    className="font-serif text-5xl text-gray-800 hover:text-pink-600 transition-colors tracking-widest"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="p-12 text-center">
              <div className="h-[1px] w-16 bg-pink-300 mx-auto mb-6"></div>
              <p className="text-gray-400 text-[10px] font-sans tracking-[0.4em] uppercase mb-4">The Pink Park Experience</p>
              <div className="flex justify-center gap-6 text-xs text-gray-500 uppercase tracking-widest">
                <span>Bir Billing</span>
                <span>Himachal Pradesh</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;