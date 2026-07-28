import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Home as HomeIcon } from 'lucide-react';
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
  // Sparkle floating animations config
  const sparkles = [
    { delay: 0.2, top: "15%", left: "10%", size: "w-4 h-4 opacity-40 animate-pulse" },
    { delay: 1.5, top: "25%", right: "15%", size: "w-6 h-6 opacity-60 animate-bounce" },
    { delay: 0.8, bottom: "20%", left: "8%", size: "w-5 h-5 opacity-50" },
    { delay: 2.1, bottom: "15%", right: "12%", size: "w-8 h-8 opacity-70 animate-pulse" },
    { delay: 0.5, top: "45%", left: "45%", size: "w-3 h-3 opacity-30 animate-ping" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#372714] via-[#1a1107] to-[#0a0704] text-white flex flex-col justify-between overflow-hidden relative font-sans">
      
      {/* Background vignette & ambient lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[black]/20 pointer-events-none" />
      
      {/* Dynamic Sparkles Floating in Background */}
      {sparkles.map((sp, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8], y: [0, -10, 0] }}
          transition={{ duration: 5 + idx, repeat: Infinity, delay: sp.delay, ease: "easeInOut" }}
          className="absolute pointer-events-none z-0"
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

      {/* Header / Brand Logo */}
      <header className="pt-16 pb-6 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Main Franchise logo with soft glowing shadow */}
          <div className="relative p-4 rounded-full bg-black/10 backdrop-blur-sm border border-white/5 shadow-2xl shadow-amber-900/10">
            <div className="absolute -inset-4 bg-amber-500/5 rounded-full blur-xl opacity-50" />
            <Logo className="h-32 md:h-36 relative z-10" variant="full" color="gold" />
          </div>
        </motion.div>
      </header>

      {/* Main Choice Section */}
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full px-6 gap-10 py-10 relative z-10">
        
        {/* PIINK PARK CARD */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full lg:w-1/2 h-[55vh] lg:h-[65vh] group relative rounded-[3rem] overflow-hidden border border-white/10 bg-[#16130f]/60 shadow-[0_30px_100px_rgba(0,0,0,0.8)] hover:border-pink-500/40 transition-all duration-700 backdrop-blur-md"
        >
          {/* Background Image with elegant cover zoom */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="/banner-1.png" 
              alt="Piink Park" 
              className="w-full h-full object-cover opacity-40 group-hover:opacity-75 group-hover:scale-110 transition-all duration-[1.5s]"
            />
            {/* Rich gradient overlay for max contrast & readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0704] via-[#0a0704]/70 to-[#0a0704]/20" />
          </div>

          {/* Card Content */}
          <div className="absolute inset-0 z-10 p-10 md:p-14 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <span className="bg-pink-600/20 text-pink-400 border border-pink-500/30 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                Active & Luxury
              </span>
              <span className="text-white/10 font-serif text-6xl font-black group-hover:text-pink-500/20 transition-all leading-none">01</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-pink-400 block font-serif">Tehsil-Baijnath, Bir</span>
                {/* Explicitly colored text-white h2 to override global stylesheet */}
                <h2 className="text-white text-4xl md:text-5xl font-serif font-bold tracking-tight group-hover:text-pink-200 transition-colors drop-shadow-md">
                  Piink Park
                </h2>
                <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed max-w-md drop-shadow">
                  Experience a premium 3-star luxury retreat nestled in the heart of paragliding capital, featuring panoramic mountain-view suites and gourmet Himachali dining.
                </p>
              </div>

              <Link 
                to="/piink-park"
                className="inline-flex items-center gap-3 bg-pink-600 hover:bg-pink-500 text-white px-9 py-4.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition-all shadow-xl shadow-pink-600/30 group/btn hover:scale-[1.05]"
              >
                Explore Property <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* INDRA HOME STAY CARD */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="w-full lg:w-1/2 h-[55vh] lg:h-[65vh] group relative rounded-[3rem] overflow-hidden border border-white/10 bg-[#16130f]/60 shadow-[0_30px_100px_rgba(0,0,0,0.8)] hover:border-amber-500/40 transition-all duration-700 backdrop-blur-md"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80" 
              alt="Indra Home Stay" 
              className="w-full h-full object-cover opacity-40 group-hover:opacity-75 group-hover:scale-110 transition-all duration-[1.5s]"
            />
            {/* Rich gradient overlay for max contrast & readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0704] via-[#0a0704]/70 to-[#0a0704]/20" />
          </div>

          {/* Card Content */}
          <div className="absolute inset-0 z-10 p-10 md:p-14 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <span className="bg-amber-600/20 text-amber-400 border border-amber-500/30 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                Cozy & Traditional
              </span>
              <span className="text-white/10 font-serif text-6xl font-black group-hover:text-amber-500/20 transition-all leading-none">02</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-400 block font-serif">Gunehar Village, Bir</span>
                {/* Explicitly colored text-white h2 to override global stylesheet */}
                <h2 className="text-white text-4xl md:text-5xl font-serif font-bold tracking-tight group-hover:text-amber-200 transition-colors drop-shadow-md">
                  Indra Home Stay
                </h2>
                <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed max-w-md drop-shadow">
                  Reconnect with nature in our traditional wooden cottages and attics. Enjoy organic farm breakfasts, bonfire stories, and peaceful riverside walks.
                </p>
              </div>

              <Link 
                to="/indra-home-stay"
                className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-500 text-white px-9 py-4.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition-all shadow-xl shadow-amber-600/30 group/btn hover:scale-[1.05]"
              >
                Explore Property <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

      </main>

      {/* Footer Info */}
      <footer className="py-10 text-center relative z-20 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 tracking-wider">
          <p>© {new Date().getFullYear()} Panache Hotels Luxury Franchise. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5"><Compass size={12} className="text-amber-500" /> Bir Billing, Himachal Pradesh</span>
            <span className="flex items-center gap-1.5 flex-row-reverse"><GoldSparkle className="w-3.5 h-3.5" /> Two Premium Properties</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FranchiseHome;
