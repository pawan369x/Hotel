import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import Logo from '../components/Logo';

// Custom 4-Point Gold Star Sparkle Component
const GoldSparkle = ({ className = "", style = {} }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 ${className}`}
    style={style}
  >
    <path 
      d="M12 2C12 2 12.5 8.5 14 10C15.5 11.5 22 12 22 12C22 12 15.5 12.5 14 14C12.5 15.5 12 22 12 22C12 22 11.5 15.5 10 14C8.5 12.5 2 12 2 12C2 12 8.5 11.5 10 10C11.5 8.5 12 2 12 2Z" 
      fill="#C5A880"
    />
  </svg>
);

const FranchiseHome = () => {
  const [hoveredSide, setHoveredSide] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorVisible, setCursorVisible] = useState(false);

  // Mouse coordinates for smooth lag custom cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 35, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Handle responsiveness and mouse tracking
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setCursorVisible(true);
    const handleMouseLeave = () => setCursorVisible(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Sparkle floating animations config
  const sparkles = [
    { delay: 0.2, top: "15%", left: "10%", size: "w-4 h-4 opacity-40" },
    { delay: 1.5, top: "25%", right: "15%", size: "w-6 h-6 opacity-60" },
    { delay: 0.8, bottom: "20%", left: "8%", size: "w-5 h-5 opacity-50" },
    { delay: 2.1, bottom: "15%", right: "12%", size: "w-8 h-8 opacity-70" },
    { delay: 0.5, top: "45%", left: "45%", size: "w-3 h-3 opacity-30" }
  ];

  return (
    <div className="h-screen w-screen bg-[#080605] text-white flex flex-col lg:flex-row overflow-hidden relative font-sans select-none animate-fadeIn">
      
      {/* Ambient glowing radial lights that drift in background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.08)_0%,transparent_60%)] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />

      {/* Floating Sparkles with slow drift */}
      {sparkles.map((sp, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.15, 0.6, 0.15], 
            scale: [0.8, 1.2, 0.8], 
            y: [0, -15, 0] 
          }}
          transition={{ 
            duration: 6 + idx, 
            repeat: Infinity, 
            delay: sp.delay, 
            ease: "easeInOut" 
          }}
          className="absolute pointer-events-none z-10"
          style={{ 
            top: sp.top, 
            left: sp.left, 
            right: sp.right, 
            bottom: sp.bottom 
          }}
        >
          <GoldSparkle className={sp.size} />
        </motion.div>
      ))}

      {/* Luxury Trailing Custom Cursor (Desktop Only) */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 rounded-full border pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: cursorVisible ? 1 : 0,
        }}
        animate={{
          width: cursorVariant === "hover" ? 100 : 36,
          height: cursorVariant === "hover" ? 100 : 36,
          backgroundColor: cursorVariant === "hover" ? "rgba(197, 168, 128, 0.08)" : "rgba(255, 255, 255, 0.03)",
          borderColor: cursorVariant === "hover" ? "#C5A880" : "rgba(197, 168, 128, 0.4)",
          boxShadow: cursorVariant === "hover" ? "0 0 20px rgba(197,168,128,0.15)" : "none"
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {cursorText && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center text-[10px] font-sans font-bold tracking-[0.25em] text-[#C5A880] uppercase"
          >
            {cursorText}
          </motion.div>
        )}
      </motion.div>

      {/* Floating Header Branding */}
      <header className="absolute top-8 md:top-12 left-0 right-0 z-30 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center pointer-events-auto">
            {/* Elegant Small Crest Logo */}
            <Logo className="h-14 md:h-18" variant="crest" color="gold" />
            <h1 className="text-white text-sm md:text-base font-serif font-medium tracking-[0.6em] uppercase mt-4 leading-none">
              Panache Hotels
            </h1>
            <span className="text-[8px] tracking-[0.5em] text-[#C5A880] uppercase font-bold block mt-2.5">
              Luxury Franchise
            </span>
          </div>
        </motion.div>
      </header>

      {/* Split Panels Wrapper */}
      <div className="flex-grow flex flex-col lg:flex-row w-full h-full relative z-20">
        
        {/* PANEL 1: PINK PARK (LEFT) */}
        <motion.div
          onMouseEnter={() => {
            if (!isMobile) {
              setHoveredSide('left');
              setCursorVariant('hover');
              setCursorText('Explore');
            }
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              setHoveredSide(null);
              setCursorVariant('default');
              setCursorText('');
            }
          }}
          animate={{
            width: isMobile ? "100%" : hoveredSide === 'left' ? '60%' : hoveredSide === 'right' ? '40%' : '50%',
            height: isMobile ? "50vh" : "100%"
          }}
          transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.8 }}
          className="relative overflow-hidden group border-b lg:border-b-0 lg:border-r border-white/5 cursor-none"
        >
          {/* Background Image with Cinematic Transitions & Ken Burns Effect */}
          <motion.img 
            src="/banner-1.png" 
            alt="Pink Park" 
            animate={{
              scale: hoveredSide === 'left' ? 1.08 : 1.02,
              filter: hoveredSide === 'left' 
                ? 'brightness(0.6) saturate(1.1)' 
                : hoveredSide === 'right'
                ? 'brightness(0.18) saturate(0.1) blur(3px)'
                : 'brightness(0.38) saturate(0.65) sepia(0.15)'
            }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="w-full h-full object-cover absolute inset-0 z-0 origin-center pointer-events-none"
          />
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 z-10 pointer-events-none" />

          {/* Panel Card Content */}
          <div className="absolute inset-0 z-20 p-8 md:p-14 lg:p-20 flex flex-col justify-end lg:justify-between h-full">
            {/* Top Row: Tagline and Big Number */}
            <div className="hidden lg:flex justify-between items-start w-full">
              <span className="border border-pink-500/30 bg-pink-500/10 text-pink-300 px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] backdrop-blur-md">
                Active & Luxury
              </span>
              <motion.span 
                animate={{ opacity: hoveredSide === 'left' ? 0.15 : hoveredSide === 'right' ? 0.02 : 0.08 }}
                className="text-white font-serif text-8xl md:text-[10rem] font-bold tracking-tighter leading-none select-none"
              >
                01
              </motion.span>
            </div>

            {/* Bottom Content Area */}
            <motion.div 
              animate={{
                y: hoveredSide === 'left' ? 0 : hoveredSide === 'right' ? 15 : 0,
                opacity: hoveredSide === 'left' ? 1 : hoveredSide === 'right' ? 0.35 : 0.8
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4 md:space-y-6"
            >
              <div className="space-y-2 md:space-y-3">
                {/* Mobile Tagline (when hidden in top row) */}
                <span className="lg:hidden inline-block border border-pink-500/30 bg-pink-500/5 text-pink-300 px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] mb-2">
                  Active & Luxury
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C5A880] block font-serif">
                  Tehsil-Baijnath, Bir
                </span>
                <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-wide drop-shadow-md">
                  Pink Park
                </h2>
                <p className="text-zinc-300/90 text-xs md:text-sm lg:text-base font-light leading-relaxed max-w-md drop-shadow">
                  Experience a premium 3-star luxury retreat nestled in the heart of paragliding capital, featuring panoramic mountain-view suites and gourmet Himachali dining.
                </p>
              </div>

              <div className="pt-2">
                <Link 
                  to="/pink-park"
                  className="inline-flex items-center gap-3 bg-white/5 hover:bg-pink-600 border border-white/10 hover:border-pink-500 text-white px-8 py-3.5 rounded-xl font-sans font-bold text-[9px] tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.25)] pointer-events-auto hover:scale-[1.03]"
                >
                  Explore Property <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* PANEL 2: INDRA HOME STAY (RIGHT) */}
        <motion.div
          onMouseEnter={() => {
            if (!isMobile) {
              setHoveredSide('right');
              setCursorVariant('hover');
              setCursorText('Explore');
            }
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              setHoveredSide(null);
              setCursorVariant('default');
              setCursorText('');
            }
          }}
          animate={{
            width: isMobile ? "100%" : hoveredSide === 'right' ? '60%' : hoveredSide === 'left' ? '40%' : '50%',
            height: isMobile ? "50vh" : "100%"
          }}
          transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.8 }}
          className="relative overflow-hidden group cursor-none"
        >
          {/* Background Image with Cinematic Transitions & Ken Burns Effect */}
          <motion.img 
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80" 
            alt="Indra Home Stay" 
            animate={{
              scale: hoveredSide === 'right' ? 1.08 : 1.02,
              filter: hoveredSide === 'right' 
                ? 'brightness(0.6) saturate(1.1)' 
                : hoveredSide === 'left'
                ? 'brightness(0.18) saturate(0.1) blur(3px)'
                : 'brightness(0.38) saturate(0.65) sepia(0.15)'
            }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="w-full h-full object-cover absolute inset-0 z-0 origin-center pointer-events-none"
          />
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 z-10 pointer-events-none" />

          {/* Panel Card Content */}
          <div className="absolute inset-0 z-20 p-8 md:p-14 lg:p-20 flex flex-col justify-end lg:justify-between h-full">
            {/* Top Row: Tagline and Big Number */}
            <div className="hidden lg:flex justify-between items-start w-full">
              <span className="border border-amber-500/30 bg-amber-500/10 text-amber-300 px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] backdrop-blur-md">
                Cozy & Traditional
              </span>
              <motion.span 
                animate={{ opacity: hoveredSide === 'right' ? 0.15 : hoveredSide === 'left' ? 0.02 : 0.08 }}
                className="text-white font-serif text-8xl md:text-[10rem] font-bold tracking-tighter leading-none select-none"
              >
                02
              </motion.span>
            </div>

            {/* Bottom Content Area */}
            <motion.div 
              animate={{
                y: hoveredSide === 'right' ? 0 : hoveredSide === 'left' ? 15 : 0,
                opacity: hoveredSide === 'right' ? 1 : hoveredSide === 'left' ? 0.35 : 0.8
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4 md:space-y-6"
            >
              <div className="space-y-2 md:space-y-3">
                {/* Mobile Tagline (when hidden in top row) */}
                <span className="lg:hidden inline-block border border-amber-500/30 bg-amber-500/5 text-amber-300 px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] mb-2">
                  Cozy & Traditional
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C5A880] block font-serif">
                  Gunehar Village, Bir
                </span>
                <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-wide drop-shadow-md">
                  Indra Home Stay
                </h2>
                <p className="text-zinc-300/90 text-xs md:text-sm lg:text-base font-light leading-relaxed max-w-md drop-shadow">
                  Reconnect with nature in our traditional wooden cottages and attics. Enjoy organic farm breakfasts, bonfire stories, and peaceful riverside walks.
                </p>
              </div>

              <div className="pt-2">
                <Link 
                  to="/indra-home-stay"
                  className="inline-flex items-center gap-3 bg-white/5 hover:bg-amber-600 border border-white/10 hover:border-amber-500 text-white px-8 py-3.5 rounded-xl font-sans font-bold text-[9px] tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto hover:scale-[1.03]"
                >
                  Explore Property <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Floating Footer Branding */}
      <footer className="absolute bottom-6 left-0 right-0 z-30 px-10 pointer-events-none hidden md:block">
        <div className="max-w-9xl mx-auto flex justify-between items-center w-full">
          <p className="text-[9px] text-white/30 tracking-[0.2em] font-sans">
            © {new Date().getFullYear()} Panache Hotels Luxury Franchise. All rights reserved.
          </p>
          <div className="flex gap-8 text-[9px] text-white/40 tracking-[0.25em] font-sans">
            <span className="flex items-center gap-2">
              <Compass size={12} className="text-[#C5A880]" /> Bir Billing, HP
            </span>
            <span className="w-1 h-1 rounded-full bg-[#C5A880] self-center" />
            <span className="flex items-center gap-2">
              Two Premium Properties
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default FranchiseHome;
