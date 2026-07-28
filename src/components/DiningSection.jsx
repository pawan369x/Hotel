import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Coffee, Leaf, ChevronRight, Wind, Star, Clock, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const DiningSection = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "piink-park";
  const hotel = hotelsData[currentId] || hotelsData["piink-park"];
  const isPink = hotel.themeColor === 'pink';

  const categories = hotel.diningCategories;
  const tabKeys = Object.keys(categories);
  
  // Set active tab, reset if hotel changes
  const [activeTab, setActiveTab] = useState(tabKeys[0]);

  useEffect(() => {
    setActiveTab(tabKeys[0]);
  }, [currentId]);

  // Dynamic Theme Colors
  const textAccent = isPink ? 'text-pink-500' : 'text-amber-500';
  const textAccentHeavy = isPink ? 'text-pink-600' : 'text-amber-600';
  const bgAccent = isPink ? 'bg-pink-600' : 'bg-amber-600';
  const shadowAccent = isPink ? 'shadow-pink-600/30' : 'shadow-amber-600/30';
  const borderAccent = isPink ? 'border-pink-500' : 'border-amber-500';
  const bgAccentHover = isPink ? 'hover:bg-pink-500' : 'hover:bg-amber-500';
  const borderHover = isPink ? 'hover:border-pink-300' : 'hover:border-amber-300';
  const bgLightAccent = isPink ? 'bg-pink-600/5 border-pink-100' : 'bg-amber-600/5 border-amber-100';

  return (
    <section id="dining" className="py-32 bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Decorative BG Text */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none flex items-center justify-center">
          <h2 className="text-[30vw] font-black leading-none">GASTRONOMY</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-3xl space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className={`h-px w-12 ${bgAccent}`} />
              <span className={`${textAccent} font-serif font-bold tracking-[0.4em] uppercase text-[10px]`}>Exceptional Dining</span>
            </motion.div>
            <h2 className="text-6xl lg:text-8xl font-serif font-black leading-none tracking-tighter">
               Pure <span className={`${textAccentHeavy} italic`}>Soul</span> Food.
            </h2>
          </div>

          <div className="lg:mt-auto">
             <div className="flex flex-wrap gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                {tabKeys.map((tab) => (
                   <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 rounded-2xl text-xs font-serif font-bold uppercase tracking-widest transition-all duration-500 ${
                      activeTab === tab ? `${bgAccent} text-white shadow-xl ${shadowAccent}` : 'text-white/50 hover:text-white'
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
              {categories[activeTab] && categories[activeTab].map((item, idx) => (
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
                          <h3 className="text-4xl font-serif font-bold text-white tracking-tight">{item.title}</h3>
                          <span className={`text-2xl font-black ${textAccent}`}>{item.price}</span>
                       </div>
                       <p className="text-white/60 text-lg font-light max-w-md">{item.desc}</p>
                       <div className="flex gap-4 pt-4">
                          <div className="flex items-center gap-2 text-[10px] font-serif font-bold uppercase tracking-[0.2em] text-white/40">
                             <Clock size={14} className={textAccent} /> 20 MINS PREP
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-serif font-bold uppercase tracking-[0.2em] text-white/40">
                             <Star size={14} className={textAccent} /> CHEF'S CHOICE
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
                    <Utensils className={textAccentHeavy} size={48} />
                    <h3 className="text-4xl lg:text-5xl font-serif leading-tight">
                      {currentId === "piink-park" ? (
                        <>Private <span className={`italic ${textAccent}`}>Starlit</span> <br /> Rooftop Dinners</>
                      ) : (
                        <>Traditional <span className={`italic ${textAccent}`}>Pahadi</span> <br /> Bonfire Cookout</>
                      )}
                    </h3>
                    <p className="text-white/50 text-lg max-w-md">
                      {currentId === "piink-park" 
                        ? "Experience the magic of Bir under the stars. A curated multi-course menu served in absolute privacy."
                        : "Gather around the fire with fresh organic skewers and custom spices prepared by local cooks."
                      }</p>
                 </div>
                 <a 
                   href={`https://wa.me/${hotel.waNumber}?text=I want to book a private dining experience at ${hotel.name}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`w-fit px-10 py-5 ${bgAccent} ${bgAccentHover} rounded-2xl font-serif font-bold transition-all flex items-center gap-3 mt-12 shadow-lg ${shadowAccent}`}
                 >
                    Book the Experience <ArrowRight size={20} />
                 </a>
              </div>
              <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none">
                 <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[2s]" />
              </div>
           </div>

           <div className="flex flex-col gap-8">
              <div className={`flex-1 ${bgAccent} rounded-[3rem] p-10 flex flex-col justify-center items-center text-center space-y-4 hover:scale-[1.02] transition-transform cursor-pointer shadow-xl shadow-black/10`}>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-4">
                     <Leaf size={32} />
                  </div>
                  <h4 className="text-2xl font-bold">100% Organic</h4>
                  <p className="text-white/80 text-sm">
                    {currentId === "piink-park" 
                      ? "Locally sourced from Bir's mountain farms."
                      : "Fresh ingredients from Gunehar orchard gardens."}
                  </p>
              </div>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center space-y-4">
                  <Coffee size={40} className={textAccent} />
                  <h4 className="text-2xl font-bold italic font-serif">
                    {currentId === "piink-park" ? "Sunset Cafe" : "Orchard Cafe"}
                  </h4>
                  <span className="text-[10px] font-serif font-bold tracking-[0.3em] uppercase text-white/30">Open till 10 PM</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default DiningSection;
