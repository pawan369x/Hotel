import React from 'react';
import DiningSection from '../components/DiningSection';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const Dining = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "piink-park";
  const hotel = hotelsData[currentId] || hotelsData["piink-park"];
  const isPink = hotel.themeColor === 'pink';

  // Dynamic Theme Colors
  const textAccent = isPink ? 'text-pink-400' : 'text-amber-400';
  const textAccentHeavy = isPink ? 'text-pink-500' : 'text-amber-500';
  const textAccentSuperHeavy = isPink ? 'text-pink-600' : 'text-amber-600';

  return (
    <div className="pt-20 bg-[#0a0a0a]">
      {/* Hero Header for Dining Page */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80" 
            alt="Dining Hero" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${textAccent} font-serif font-bold tracking-[0.5em] uppercase text-xs mb-4 block`}
          >
            Culinary Excellence
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif text-white font-black tracking-tighter"
          >
            The <span className={`italic ${textAccentHeavy}`}>Dining</span>
          </motion.h1>
        </div>
      </section>

      {/* Main Dining Content */}
      <DiningSection />

      {/* Additional Dining Info Section */}
      <section className="py-24 bg-white text-slate-900 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-serif">A Feast for the <span className={`italic ${textAccentSuperHeavy}`}>Senses</span></h2>
          <p className="text-lg text-slate-600 leading-relaxed font-light">
            {currentId === "piink-park" 
              ? "Our kitchen uses only the freshest ingredients sourced from local Bir farms. From traditional Himachali Dham to international favorites, every dish is prepared with passion and served with warmth."
              : "Our home kitchen uses only organic fresh ingredients harvested directly from our Gunehar orchards and local homestay farms. Every traditional pahadi recipe is prepared with love and organic spices."
            }
          </p>
          <div className="grid md:grid-cols-3 gap-8 pt-12">
            <div>
              <h4 className="font-bold text-xl mb-2">Breakfast</h4>
              <p className="text-sm text-slate-500 font-serif font-bold uppercase tracking-widest">8:00 AM - 10:30 AM</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2">Lunch</h4>
              <p className="text-sm text-slate-500 font-serif font-bold uppercase tracking-widest">12:30 PM - 3:30 PM</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2">Dinner</h4>
              <p className="text-sm text-slate-500 font-serif font-bold uppercase tracking-widest">7:30 PM - 10:30 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dining;
