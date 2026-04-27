import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiCoffee, FiWind, FiShield } from 'react-icons/fi';

const features = [
  {
    id: 1,
    icon: <FiCoffee size={24} />,
    title: "Organic Bir Tea",
    desc: "Experience the authentic taste of Phado Ki Chai, sourced directly from our local gardens.",
    img: "https://images.unsplash.com/photo-1544787210-2213d2429f77?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    icon: <FiWind size={24} />,
    title: "Mountain Serenity",
    desc: "Located in the heart of Bir Billing, wake up to the sound of nature and paragliders.",
    img: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    icon: <FiShield size={24} />,
    title: "Boutique Comfort",
    desc: "Every room is a masterpiece of design, blending modern luxury with local heritage.",
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop"
  }
];

const FeatureShowcase = () => {
  return (
    <section className="bg-white py-24 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Section Header --- */}
        <div className="mb-20 text-center md:text-left">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-pink-500 font-bold tracking-[0.3em] uppercase text-xs mb-4"
          >
            Refining the Art of Living
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-normal text-gray-900 tracking-tighter leading-tight"
          >
            Where Luxury Meets <br /> <span className="text-pink-500">Pure Nature.</span>
          </motion.h2>
        </div>

        {/* --- Interactive Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Image Container with Reveal Effect */}
              <div className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Icon */}
                <div className="absolute top-8 left-8 w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-pink-600 shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  {item.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="px-4">
                <h3 className="text-2xl font-normal text-gray-900 mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm tracking-wide mb-6">
                  {item.desc}
                </p>
                <motion.button 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-3 text-pink-500 font-bold text-xs uppercase tracking-widest group"
                >
                  Learn More 
                  <div className="h-[2px] w-8 bg-pink-200 group-hover:w-12 group-hover:bg-pink-500 transition-all duration-300"></div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM STATS: Trust Indicators --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 pt-20 border-t border-gray-100 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          <div>
            <h5 className="text-4xl font-normal text-gray-900 tracking-tighter">4.9/5</h5>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Guest Rating</p>
          </div>
          <div>
            <h5 className="text-4xl font-normal text-gray-900 tracking-tighter">24/7</h5>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Concierge</p>
          </div>
          <div>
            <h5 className="text-4xl font-normal text-gray-900 tracking-tighter">100%</h5>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Organic Food</p>
          </div>
          <div>
            <h5 className="text-4xl font-normal text-gray-900 tracking-tighter">15+</h5>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Luxury Suites</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FeatureShowcase;
