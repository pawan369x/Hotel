import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, X, Calendar, Users, Zap } from 'lucide-react';
import { useScroll, useTransform } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const RoomsSection = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "piink-park";
  const hotel = hotelsData[currentId] || hotelsData["piink-park"];
  const isPink = hotel.themeColor === 'pink';

  const rooms = hotel.rooms;

  const targetRef = useRef(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // Calculate horizontal scroll width based on number of rooms
  const scrollOffset = rooms.length > 3 ? "-65%" : "-50%";
  const x = useTransform(scrollYProgress, [0, 1], ["0%", scrollOffset]);

  // Dynamic Theme Styling
  const textAccent = isPink ? 'text-pink-500' : 'text-amber-500';
  const textAccentHeavy = isPink ? 'text-pink-600' : 'text-amber-600';
  const bgAccent = isPink ? 'bg-pink-600' : 'bg-amber-600';
  const bgAccentHover = isPink ? 'hover:bg-pink-600 hover:text-white' : 'hover:bg-amber-600 hover:text-white';
  const bgAccentButton = isPink ? 'bg-pink-600 hover:bg-pink-500' : 'bg-amber-600 hover:bg-amber-500';
  const shadowAccent = isPink ? 'shadow-pink-600/20' : 'shadow-amber-600/20';

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const message = `Booking Inquiry for ${selectedRoom.title} at ${hotel.name}%0A- Name: ${data.name}%0A- Guests: ${data.guests}%0A- Date: ${data.date}`;
    window.open(`https://wa.me/${hotel.waNumber}?text=${message}`, '_blank');
    setSelectedRoom(null);
  };

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#09090b]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        <div className="absolute top-16 left-8 lg:left-20 z-20">
          <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="flex items-center gap-3 mb-2">
            <div className={`h-px w-8 ${bgAccent}`} />
            <span className={`${textAccent} font-bold tracking-[0.3em] uppercase text-[10px]`}>Exceptional Living</span>
          </motion.div>
          <h2 className="text-5xl lg:text-8xl font-serif text-white font-black tracking-tighter">
            The <span className={`${textAccentHeavy} italic`}>Suites</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-8 lg:pl-20">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ y: -20 }}
              className="relative group flex-shrink-0 w-[90vw] lg:w-[40vw] h-[70vh] rounded-[3rem] overflow-hidden border border-white/5 bg-zinc-900/50"
            >
              <img src={room.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
              
              {/* Floating Badge */}
              <div className="absolute top-8 right-8 z-20">
                 <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">Available</span>
                 </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 lg:p-12 flex flex-col justify-end">
                <div className="mb-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest ${bgAccent}`}>{room.tag}</span>
                    <span className="text-white/40 text-xs">Featured Room</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{room.title}</h3>
                  <div className="grid grid-cols-2 gap-y-2 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {room.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/70 text-xs">
                        <CheckCircle2 size={14} className={textAccent} /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <p className="text-3xl font-black text-white">₹{room.price}</p>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Starting Price / Night</p>
                  </div>
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className={`bg-white text-black px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 group/btn ${bgAccentHover}`}
                  >
                    Book Now <Zap size={18} fill="currentColor" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Horizontal Progress Bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div style={{ scaleX: scrollYProgress }} className={`h-full origin-left ${bgAccent}`} />
        </div>
      </div>

      {/* --- BOOKING MODAL --- */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-white/10 w-full max-w-xl rounded-[2.5rem] overflow-hidden relative shadow-2xl"
            >
              <button onClick={() => setSelectedRoom(null)} className="absolute top-6 right-6 text-white/50 hover:text-white z-10"><X /></button>

              <div className="h-48 relative">
                <img src={selectedRoom.image} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <h4 className="absolute bottom-6 left-8 text-2xl font-bold text-white">{selectedRoom.title}</h4>
              </div>

              <form onSubmit={handleBookingSubmit} className="p-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Your Full Name</label>
                    <input name="name" required type="text" placeholder="John Doe" className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-${isPink ? 'pink' : 'amber'}-500/50`} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Arrival Date</label>
                    <input name="date" required type="date" className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-${isPink ? 'pink' : 'amber'}-500/50`} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Number of Guests</label>
                  <select name="guests" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none">
                    <option className="bg-zinc-900">1-2 Guests</option>
                    <option className="bg-zinc-900">3-4 Guests</option>
                    <option className="bg-zinc-900">More than 5</option>
                  </select>
                </div>

                <button type="submit" className={`w-full text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 mt-4 shadow-xl ${bgAccentButton} ${shadowAccent}`}>
                  Confirm Booking Details <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RoomsSection;