import { motion } from 'framer-motion';
import { Star, Wifi, Coffee, Wind, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const Rooms = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "piink-park";
  const hotel = hotelsData[currentId] || hotelsData["piink-park"];
  const isPink = hotel.themeColor === 'pink';

  // Dynamic style classes
  const textAccent = isPink ? 'text-pink-600' : 'text-amber-600';
  const textAccentLight = isPink ? 'text-pink-400' : 'text-amber-400';
  const textAccentMuted = isPink ? 'text-pink-300' : 'text-amber-300';
  const bgAccent = isPink ? 'bg-pink-600 hover:bg-pink-500' : 'bg-amber-600 hover:bg-amber-500';
  const shadowAccent = isPink ? 'shadow-pink-600/30' : 'shadow-amber-600/30';
  const btnHoverBg = isPink ? 'hover:bg-pink-600' : 'hover:bg-amber-600';

  const roomsList = hotel.rooms;

  return (
    <div className="pt-24 pb-16 bg-[#fafafa] min-h-screen">
      {/* Header Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 z-0">
          <img src="/banner-1.png" alt="Rooms Header" className="w-full h-full object-cover brightness-50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${textAccentLight} font-bold tracking-[0.4em] uppercase text-xs mb-4`}
          >
            Refined Living
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-4"
          >
            Rooms & <span className={`italic ${textAccentMuted}`}>Suites</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 gap-32">
          {roomsList.map((room, index) => (
            <motion.div 
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <div className="lg:w-1/2 relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img 
                  src={room.image} 
                  alt={room.title} 
                  className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute top-6 left-6">
                  <span className={`bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg ${textAccent}`}>
                    {room.tag}
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-1/2 space-y-8">
                <div className="space-y-4">
                  <p className={`${textAccent} font-bold text-sm tracking-widest uppercase`}>From ₹{room.price} / Night</p>
                  <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 leading-tight">
                    {room.title}
                  </h2>
                  <p className="text-slate-600 text-lg font-light leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-y-4 pt-4">
                  {room.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle2 size={18} className={textAccent} />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                  <a 
                    href={`https://wa.me/${hotel.waNumber}?text=I'm interested in booking the ${room.title} at ${hotel.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold transition-all text-center ${btnHoverBg}`}
                  >
                    Reserve Now
                  </a>
                  <Link to={`/${currentId}/gallery`} className="w-full sm:w-auto">
                    <button className="w-full px-10 py-5 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group">
                      View Gallery <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking CTA Section */}
      <section className="mt-32 bg-slate-900 py-24 px-6 md:px-12 text-center text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <img src="/banner-3.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif">Ready for your <span className={`italic ${textAccentLight}`}>Himalayan</span> adventure?</h2>
          <p className="text-slate-400 text-lg">Book your stay now and experience the best of Bir Billing at {hotel.name}.</p>
          <div className="flex justify-center pt-8">
            <Link to={`/${currentId}/contact`} className={`text-white px-12 py-6 rounded-full font-bold text-xl transition-all shadow-xl ${bgAccent} ${shadowAccent}`}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
