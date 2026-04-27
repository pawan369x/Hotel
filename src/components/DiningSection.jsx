import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Coffee, Leaf, ChevronRight, Wind, Star, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const categories = {
  "Mountain Breakfast": [
    { title: "Himachali Siddu", desc: "Traditional steamed wheat buns with walnut filling.", price: "₹250", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80" },
    { title: "Organic Fruit Bowl", desc: "Fresh seasonal fruits from local orchards.", price: "₹350", img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80" }
  ],
  "Signature Lunch": [
    { title: "Royal Dham Thali", desc: "The ultimate traditional festive feast of Himachal.", price: "₹650", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80" },
    { title: "Pahadi Dal Tadka", desc: "Slow-cooked lentils with local aromatic spices.", price: "₹450", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80" }
  ],
  "Sunset Dining": [
    { title: "Wood-fired Pizza", desc: "Freshly baked with local buffalo mozzarella.", price: "₹550", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80" },
    { title: "Pink Park Pasta", desc: "Handmade pasta in a creamy wild mushroom sauce.", price: "₹480", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80" }
  ]
};

const DiningSection = () => {
  const [activeTab, setActiveTab] = useState("Mountain Breakfast");

  return (
    <section id="dining" className="py-32 bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Decorative BG Text */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none flex items-center justify-center">
          <h2 className="text-[30vw] font-normal leading-none opacity-10">GASTRONOMY</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-3xl space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-12 bg-pink-500" />
              <span className="text-pink-500 font-bold tracking-[0.4em] uppercase text-[10px]">Exceptional Dining</span>
            </motion.div>
            <h2 className="text-6xl lg:text-8xl font-serif font-normal leading-none tracking-tighter">
               Pure <span className="text-pink-600 italic">Soul</span> Food.
            </h2>
          </div>

          <div className="lg:mt-auto">
             <div className="flex flex-wrap gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                {Object.keys(categories).map((tab) => (
                   <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                      activeTab === tab ? 'bg-pink-600 text-white shadow-xl shadow-pink-600/30' : 'text-white/50 hover:text-white'
                    }`}
                   >
                     {tab}
                   </button>
                ))}
             </div>
          </div>
        </div>

        {/* Dynamic Menu Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-32">
           <AnimatePresence mode="wait">
              {categories[activeTab].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative h-[600px] rounded-[3rem] overflow-hidden border border-white/10"
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-12 flex flex-col justify-end">
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <h3 className="text-4xl font-serif font-normal text-white tracking-tight">{item.title}</h3>
                          <span className="text-2xl font-normal text-pink-500">{item.price}</span>
                       </div>
                       <p className="text-white/60 text-lg font-light max-w-md">{item.desc}</p>
                       <div className="flex gap-4 pt-4">
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                             <Clock size={14} className="text-pink-500" /> 20 MINS PREP
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                             <Star size={14} className="text-pink-500" /> CHEF'S CHOICE
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
           </AnimatePresence>
        </div>

        {/* Feature Bento Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="md:col-span-2 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-12 rounded-[3.5rem] relative overflow-hidden group">
              <div className="relative z-10 flex flex-col justify-between h-full">
                 <div className="space-y-6">
                    <Utensils className="text-pink-600" size={48} />
                    <h3 className="text-4xl lg:text-5xl font-serif leading-tight">Private <span className="italic text-pink-500">Starlit</span> <br /> Rooftop Dinners</h3>
                    <p className="text-white/50 text-lg max-w-md">Experience the magic of Bir under the stars. A curated multi-course menu served in absolute privacy.</p>
                 </div>
                 <button className="w-fit px-10 py-5 bg-pink-600 hover:bg-pink-500 rounded-2xl font-bold transition-all flex items-center gap-3 mt-12">
                    Book the Experience <ArrowRight size={20} />
                 </button>
              </div>
              {/* Parallax Background for Bento */}
              <div className="absolute top-0 right-0 w-full h-full opacity-[0.15] pointer-events-none">
                 <img src="/restaurant.jpg" className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[2s]" />
              </div>
           </div>

           <div className="flex flex-col gap-8">
              <div className="flex-1 bg-pink-600 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center space-y-4 hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-4">
                     <Leaf size={32} />
                  </div>
                  <h4 className="text-2xl font-bold">100% Organic</h4>
                  <p className="text-white/80 text-sm">Locally sourced from Bir's mountain farms.</p>
              </div>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center space-y-4">
                  <Coffee size={40} className="text-pink-500" />
                  <h4 className="text-2xl font-bold italic font-serif">Sunset Cafe</h4>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">Open till 10 PM</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default DiningSection;
