import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiCoffee, FiWind, FiShield } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const FeatureShowcase = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "piink-park";
  const hotel = hotelsData[currentId] || hotelsData["piink-park"];
  const isPink = hotel.themeColor === 'pink';

  const textAccent = isPink ? 'text-pink-500' : 'text-amber-500';
  const iconAccent = isPink ? 'text-pink-600' : 'text-amber-600';
  const bgLineAccent = isPink ? 'bg-pink-200 group-hover:bg-pink-500' : 'bg-amber-200 group-hover:bg-amber-500';

  const features = currentId === 'piink-park' ? [
    {
      id: 1,
      icon: <FiCoffee size={24} />,
      title: "Organic Bir Tea",
      desc: "Experience the authentic taste of Pahadi Chai, sourced directly from our local gardens.",
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
    },
    {
      id: 4,
      icon: <FiShield size={24} />,
      title: "Adventure Desk",
      desc: "From paragliding bookings to hidden waterfall treks, we handle everything for you.",
      img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=800&auto=format&fit=crop"
    }
  ] : [
    {
      id: 1,
      icon: <FiCoffee size={24} />,
      title: "Orchard Jam & Tea",
      desc: "Savor fresh homemade jam from Gunehar orchards and freshly brewed organic pahadi herbal tea.",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      icon: <FiWind size={24} />,
      title: "Riverside Walks",
      desc: "Walk along the serene Gunehar river streams and tea gardens away from the crowd.",
      img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      icon: <FiShield size={24} />,
      title: "Heritage Wood Attics",
      desc: "Traditional Himachali mud-and-timber architecture designed for cozy, natural insulation.",
      img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      icon: <FiShield size={24} />,
      title: "Bonfire Evenings",
      desc: "We arrange cozy bonfire evenings every day in our lawn for warm stories and starry skies.",
      img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-white py-24 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Section Header --- */}
        <div className="mb-20 text-center md:text-left">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`${textAccent} font-bold tracking-[0.3em] uppercase text-xs mb-4`}
          >
            Refining the Art of Living
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight"
          >
            Where Luxury Meets <br /> <span className={textAccent}>Pure Nature.</span>
          </motion.h2>
        </div>

        {/* --- Interactive Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className={`absolute top-8 left-8 w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center ${iconAccent} shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                  {item.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="px-4">
                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm tracking-wide mb-6">
                  {item.desc}
                </p>
                <motion.button 
                  whileHover={{ x: 10 }}
                  className={`flex items-center gap-3 ${textAccent} font-bold text-xs uppercase tracking-widest group`}
                >
                  Learn More 
                  <div className={`h-[2px] w-8 ${bgLineAccent} transition-all duration-300`}></div>
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
            <h5 className="text-4xl font-black text-gray-900 tracking-tighter">4.9/5</h5>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Guest Rating</p>
          </div>
          <div>
            <h5 className="text-4xl font-black text-gray-900 tracking-tighter">24/7</h5>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Concierge Desk</p>
          </div>
          <div>
            <h5 className="text-4xl font-black text-gray-900 tracking-tighter">100%</h5>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Organic Food</p>
          </div>
          <div>
            <h5 className="text-4xl font-black text-gray-900 tracking-tighter">
              {currentId === "piink-park" ? "15+" : "8+"}
            </h5>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
              {currentId === "piink-park" ? "Luxury Suites" : "Cozy Rooms"}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FeatureShowcase;
