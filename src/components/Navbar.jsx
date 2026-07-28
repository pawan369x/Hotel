import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, RefreshCw, Home as HomeIcon } from 'lucide-react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import Logo from './Logo';
import { hotelsData } from '../data/hotels';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { hotelId } = useParams();
  
  // Resolve current hotel data
  const currentId = hotelId || "piink-park";
  const hotel = hotelsData[currentId] || hotelsData["piink-park"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Discover', href: `/${currentId}/about` },
    { name: 'The Suites', href: `/${currentId}/rooms` },
    { name: 'Experience', href: `/${currentId}/experience` },
    { name: 'Dining', href: `/${currentId}/dining` },
    { name: 'Gallery', href: `/${currentId}/gallery` },
    { name: 'Contact', href: `/${currentId}/contact` },
  ];

  // Dynamic Theme Styling
  const isPink = hotel.themeColor === 'pink';
  const textAccent = isPink ? 'text-pink-600' : 'text-amber-600';
  const textLightAccent = isPink ? 'text-pink-300' : 'text-amber-300';
  const bgAccent = isPink ? 'bg-pink-600 hover:bg-pink-500' : 'bg-amber-600 hover:bg-amber-500';
  const bgUnderline = isPink ? 'bg-pink-500' : 'bg-amber-500';

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          scrolled || location.pathname !== `/${currentId}` 
            ? 'bg-white/95 backdrop-blur-2xl border-b border-gray-100 py-4 shadow-sm' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* DYNAMIC LOGO & PROPERTY NAME */}
          <Link to={`/${currentId}`} className="flex items-center gap-3 group">
            <div className={`transition-all duration-700 ${scrolled ? 'h-12' : 'h-16'} w-auto flex items-center`}>
              <Logo className="h-full w-auto" variant="crest" color={scrolled || location.pathname !== `/${currentId}` ? 'gold' : 'white'} />
            </div>
            <div className="text-left font-serif">
              <h2 className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase leading-none transition-colors ${
                scrolled || location.pathname !== `/${currentId}` ? 'text-slate-800' : 'text-white'
              }`}>
                Panache
              </h2>
              <span className={`text-[9px] md:text-[10px] tracking-[0.3em] font-sans font-bold uppercase transition-colors ${
                scrolled || location.pathname !== `/${currentId}` ? textAccent : textLightAccent
              }`}>
                {hotel.name}
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) => `
                    group relative text-[11px] font-sans uppercase tracking-[0.25em] transition-colors py-2
                    ${scrolled || location.pathname !== `/${currentId}`
                      ? (isActive ? textAccent : 'text-gray-600 ' + hoverAccentClassHelper(isPink))
                      : (isActive ? textLightAccent : 'text-white ' + hoverLightAccentClassHelper(isPink))
                    }
                  `}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] ${bgUnderline} transition-all duration-500 
                    ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}
                  `}></span>
                </NavLink>
              ))}
            </div>

            {/* Property Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
                  scrolled || location.pathname !== `/${currentId}`
                    ? 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <RefreshCw size={12} className={textAccent} /> Switch Property <ChevronDown size={12} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-3xl shadow-xl p-4 z-[110]"
                  >
                    <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-3 px-3">Our Properties</p>
                    <div className="space-y-1">
                      {Object.values(hotelsData).map((prop) => (
                        <Link
                          key={prop.id}
                          to={`/${prop.id}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                            prop.id === currentId 
                              ? 'bg-slate-50 font-bold' 
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-left">
                            <p className="text-xs text-slate-800 font-medium">{prop.name}</p>
                            <p className="text-[9px] text-gray-400 font-light">{prop.id === 'piink-park' ? 'Bir Billing, Luxury' : 'Gunehar Village, Cozy'}</p>
                          </div>
                          <span className={`w-2.5 h-2.5 rounded-full ${prop.themeColor === 'pink' ? 'bg-pink-600' : 'bg-amber-600'}`} />
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 my-2 pt-2" />
                      <Link
                        to="/"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 p-3 text-xs text-slate-600 hover:text-slate-900 rounded-2xl hover:bg-slate-50 transition-all font-medium"
                      >
                        <HomeIcon size={14} className="text-amber-500" /> Go to Franchise Portal
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Whatsapp Reserve */}
            <a 
              href={`https://wa.me/${hotel.waNumber}?text=I'm interested in booking a stay at ${hotel.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-3 rounded-xl text-[10px] font-sans uppercase tracking-[0.2em] transition-all duration-500 text-white ${bgAccent}`}
              >
                Reserve
              </motion.button>
            </a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex flex-col gap-2 p-2 relative z-10"
          >
            <div className={`h-[1px] w-8 transition-all ${scrolled || location.pathname !== `/${currentId}` ? 'bg-gray-900' : 'bg-white'}`}></div>
            <div className={`h-[1px] w-6 transition-all ${scrolled || location.pathname !== `/${currentId}` ? 'bg-gray-900' : 'bg-white'}`}></div>
          </button>
        </div>
      </nav>

      {/* FULL SCREEN OVERLAY MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white z-[200] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-8 border-b border-gray-50">
               <div className="flex items-center gap-2">
                  <Logo className="h-10 w-auto" variant="crest" color="gold" />
                  <div className="text-left font-serif">
                    <span className="text-[8px] uppercase tracking-widest text-slate-400 block leading-none">Panache</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">{hotel.name}</span>
                  </div>
               </div>
               <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2"
              >
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex-grow flex flex-col justify-center items-center gap-6 overflow-y-auto py-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                >
                  <Link
                    to={link.href}
                    className={`font-serif text-4xl text-gray-800 hover:${textAccent} transition-colors tracking-widest`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="w-16 h-px bg-gray-100 my-4" />

              {/* Property switcher in mobile menu */}
              <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-2">Switch Property</p>
              <div className="flex flex-col gap-2 items-center">
                {Object.values(hotelsData).map((prop) => (
                  <Link
                    key={prop.id}
                    to={`/${prop.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm px-4 py-2 rounded-full border transition-all ${
                      prop.id === currentId 
                        ? (prop.themeColor === 'pink' ? 'bg-pink-50 border-pink-200 text-pink-600 font-bold' : 'bg-amber-50 border-amber-200 text-amber-600 font-bold') 
                        : 'border-gray-100 text-gray-500'
                    }`}
                  >
                    {prop.name}
                  </Link>
                ))}
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-amber-600 mt-2 font-medium flex items-center gap-1.5"
                >
                  <HomeIcon size={12} /> Go to Franchise Portal
                </Link>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="p-10 text-center border-t border-gray-50">
              <p className="text-gray-400 text-[10px] font-sans tracking-[0.4em] uppercase mb-3">Panache Hotels Experience</p>
              <div className="flex justify-center gap-6 text-xs text-gray-500 uppercase tracking-widest font-light">
                <span>{hotel.id === 'piink-park' ? 'Bir Billing, HP' : 'Gunehar Valley, HP'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Helper utilities for conditional string interpolation in NavLink
const hoverAccentClassHelper = (isPink) => isPink ? 'hover:text-pink-600' : 'hover:text-amber-600';
const hoverLightAccentClassHelper = (isPink) => isPink ? 'hover:text-pink-300' : 'hover:text-amber-300';

export default Navbar;