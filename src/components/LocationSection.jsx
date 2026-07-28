import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Plane, MountainSnow } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const LocationSection = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "piink-park";
  const hotel = hotelsData[currentId] || hotelsData["piink-park"];
  const isPink = hotel.themeColor === 'pink';

  // Dynamic Theme Styling
  const textAccent = isPink ? 'text-pink-600' : 'text-amber-600';
  const textLightAccent = isPink ? 'text-pink-400' : 'text-amber-400';
  const bgAccent = isPink ? 'bg-pink-600' : 'bg-amber-600';
  const bgAccentHover = isPink ? 'hover:bg-pink-500' : 'hover:bg-amber-500';
  const borderHover = isPink ? 'hover:border-pink-200' : 'hover:border-amber-200';
  const mapOverlayBg = isPink ? 'bg-pink-600/10' : 'bg-amber-600/10';

  const getIcon = (type) => {
    switch (type) {
      case 'Plane': return <Plane className={textAccent} />;
      case 'Compass': return <Compass className={textAccent} />;
      case 'Navigation': return <Navigation className={textAccent} />;
      case 'Mountain': return <MountainSnow className={textAccent} />;
      case 'MapPin':
      default:
        return <MapPin className={textAccent} />;
    }
  };

  const attractions = hotel.attractions;

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-12">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className={`${textAccent} font-bold tracking-[0.3em] uppercase text-xs`}
              >
                Find Us
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif font-black text-slate-900 mt-4 tracking-tighter"
              >
                At the <span className={`${textAccent} italic`}>Heart</span> of Bir.
              </motion.h2>
              <p className="text-slate-500 text-lg mt-6 leading-relaxed font-light">
                {currentId === "piink-park"
                  ? "Hotel Piink Park is strategically located in Kotli, Bir. Whether you are here for paragliding or seeking spiritual peace in monasteries, everything is just a stone's throw away."
                  : "Indra Home Stay is nestled in the serene village of Gunehar, Bir. Experience the calm mountain environment, adjacent to cascading waterfalls and lush tea garden trails, while still being easily connected to the paragliding landing site."
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attractions.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 transition-colors cursor-default ${borderHover}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{item.distance}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(hotel.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className={`px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold transition-all shadow-xl shadow-slate-200 flex items-center gap-3 ${bgAccentHover}`}>
                Get Directions <Navigation size={20} />
              </button>
            </a>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50"
          >
            <img 
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              alt="Bir Map"
            />
            <div className={`absolute inset-0 ${mapOverlayBg} mix-blend-multiply`} />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <div className="relative">
                  <div className={`absolute -inset-4 ${bgAccent} rounded-full animate-ping opacity-25`} />
                  <div className={`relative w-8 h-8 ${bgAccent} rounded-full border-4 border-white shadow-2xl flex items-center justify-center`}>
                     <MapPin size={16} className="text-white" />
                  </div>
               </div>
            </div>

            <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
               <h4 className="font-bold text-slate-900 mb-1">{hotel.name}</h4>
               <p className="text-xs text-slate-500">{hotel.location}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;
