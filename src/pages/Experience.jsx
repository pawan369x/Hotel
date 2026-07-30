import React from 'react';
import ExperienceSection from '../components/ExperienceSection';
import FeatureShowcase from '../components/FeatureShowcase';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const Experience = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "pink-park";
  const hotel = hotelsData[currentId] || hotelsData["pink-park"];
  const isPink = hotel.themeColor === 'pink';

  // Dynamic Theme Colors
  const textAccent = isPink ? 'text-pink-400' : 'text-amber-400';
  const textAccentHeavy = isPink ? 'text-pink-500' : 'text-amber-500';
  const bgAccent = isPink ? 'bg-pink-600 hover:bg-pink-500' : 'bg-amber-600 hover:bg-amber-500';
  const shadowAccent = isPink ? 'shadow-pink-600/30' : 'shadow-amber-600/30';

  return (
    <div className="pt-20">
      {/* Hero Header for Experience Page */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80" 
            alt="Experience Hero" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${textAccent} font-bold tracking-[0.5em] uppercase text-xs mb-4 block`}
          >
            Adventure & Serenity
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif text-white font-black tracking-tighter"
          >
            The <span className={`italic ${textAccentHeavy}`}>Experience</span>
          </motion.h1>
        </div>
      </section>

      {/* Main Experience Content */}
      <ExperienceSection />

      {/* Features Showcase */}
      <FeatureShowcase />

      {/* Experience CTA */}
      <section className="py-32 bg-slate-900 text-white text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif">Life is meant for <span className={`italic ${textAccent}`}>Adventures</span>.</h2>
          <p className="text-slate-400 text-lg">Whether you want to fly in the sky or meditate in the mountains, we make it happen.</p>
          <a 
            href={`https://wa.me/${hotel.waNumber}?text=I'm interested in booking adventure experiences at ${hotel.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className={`text-white px-12 py-6 rounded-full font-bold text-xl transition-all shadow-xl ${bgAccent} ${shadowAccent}`}>
              Book Your Adventure
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Experience;
