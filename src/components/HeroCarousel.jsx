import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Discover Pink Park",
    subtitle: "IN BIR BILLING",
    description: "Modern luxury meets unmatched adventure in the heart of the Himalayas.",
    image: "/banner-1.png",
  },
  {
    id: 2,
    title: "Luxury Redefined",
    subtitle: "PREMIUM SUITES",
    description: "Wake up to breathtaking mountain views and world-class hospitality.",
    image: "/banner-2.png",
  },
  {
    id: 3,
    title: "Local Bir Vibes",
    subtitle: "ADVENTURE AWAITS",
    description: "Your perfect base for paragliding, trekking, and exploring the culture.",
    image: "/banner-3.png",
  }
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 6000); // Increased duration to match the slow luxury vibe
    }
    return () => clearInterval(timer);
  }, [current, isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0f172a]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
        >
          {/* Background Image with Ken Burns Effect */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0 z-0 origin-center"
          >
            {/* Very slow continuous zoom after entry */}
            <motion.img
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 6, ease: "linear" }}
              src={slides[current].image}
              alt={slides[current].title}
              className="h-full w-full object-cover"
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          {/* Text Content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 mt-20">
            <div className="overflow-hidden mb-4">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                className="block text-pink-400 font-sans tracking-[0.4em] uppercase text-xs font-bold"
              >
                {slides[current].subtitle}
              </motion.span>
            </div>
            
            <div className="overflow-hidden mb-6 px-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif text-white max-w-5xl leading-[1.1] tracking-wide"
              >
                {slides[current].title}
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                className="text-slate-300 text-base md:text-lg max-w-2xl font-light tracking-wide"
              >
                {slides[current].description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <button className="group relative px-8 py-4 bg-transparent text-white font-sans text-xs uppercase tracking-[0.2em] overflow-hidden border border-white/30 hover:border-white transition-colors duration-500">
                <span className="relative z-10 flex items-center gap-4">
                  Discover More
                  <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.33,1,0.68,1] z-0" />
                <span className="absolute inset-0 z-10 flex items-center justify-center gap-4 text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Discover More
                  <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-500" />
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-0 left-0 w-full z-30 px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
        
        {/* Slide Counter */}
        <div className="flex items-center gap-4 text-white font-sans text-sm tracking-widest hidden md:flex">
          <span className="font-bold text-lg">0{current + 1}</span>
          <span className="w-12 h-px bg-white/30" />
          <span className="text-white/50">0{slides.length}</span>
        </div>

        {/* Progress Navigation */}
        <div className="flex gap-4 items-center flex-1 max-w-sm w-full">
          {slides.map((_, index) => (
            <div 
              key={index}
              onClick={() => { setIsAutoPlaying(false); setCurrent(index); }}
              className="relative h-[2px] flex-1 bg-white/20 cursor-pointer overflow-hidden group"
            >
              {/* Animated Progress Bar */}
              {current === index && isAutoPlaying && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="absolute top-0 left-0 h-full bg-pink-500"
                />
              )}
              {/* Static Active Bar when auto-play is off or for hover */}
              {current === index && !isAutoPlaying && (
                <div className="absolute top-0 left-0 h-full w-full bg-pink-500" />
              )}
              {/* Hover effect */}
              <div className={`absolute top-0 left-0 h-full bg-white transition-all duration-300 w-0 group-hover:w-full ${current === index ? 'opacity-0' : 'opacity-50'}`} />
            </div>
          ))}
        </div>

        {/* Arrow Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all duration-500 group rounded-none"
          >
            <ChevronLeft size={20} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform duration-300" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all duration-500 group rounded-none"
          >
            <ChevronRight size={20} strokeWidth={1} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
