import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, X, Calendar, Users, Zap } from 'lucide-react';
import { useScroll, useTransform } from 'framer-motion';

const rooms = [
  {
    id: 1,
    title: "Premium Mountain Suite",
    price: "4,500",
    image: "/premium_room.jpg",
    features: ["Balcony View", "King Bed", "Rain Shower", "Free Breakfast", "Mini Fridge"],
    tag: "Most Popular"
  },
  {
    id: 2,
    title: "Backpacker's Dormitory",
    price: "1,200",
    image: "/dormitory.jpg",
    features: ["Bunk Beds", "Fast Wi-Fi", "Shared Lounge", "Lockers", "Mountain View"],
    tag: "Adventure Ready"
  },
  {
    id: 3,
    title: "Himalayan Penthouse",
    price: "6,500",
    image: "/deluxe_room.jpg",
    features: ["Panoramic View", "Private Terrace", "Mini Bar", "Bathtub", "Personal Butler"],
    tag: "Pure Luxury"
  },
  {
    id: 4,
    title: "Family Valley Suite",
    price: "5,200",
    image: "/room4.jpeg",
    features: ["Two Bedrooms", "Living Area", "Kitchenette", "Board Games", "Extra Bed"],
    tag: "Great for Groups"
  }
];

const RoomsSection = () => {
  const targetRef = useRef(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  // Booking Handler: Seedha WhatsApp par detail bhej dega (Easy & Working)
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const message = `Booking Inquiry for ${selectedRoom.title}%0A- Name: ${data.name}%0A- Guests: ${data.guests}%0A- Date: ${data.date}`;
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    setSelectedRoom(null);
  };

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#09090b]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        <div className="absolute top-16 left-8 lg:left-20 z-20">
          <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-pink-500" />
            <span className="text-pink-500 font-bold tracking-[0.3em] uppercase text-[10px]">Exceptional Living</span>
          </motion.div>
          <h2 className="text-5xl lg:text-8xl font-serif text-white font-normal tracking-tighter">
            The <span className="text-pink-600 italic">Suites</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-8 lg:pl-20">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              className="relative group flex-shrink-0 w-[90vw] lg:w-[40vw] h-[70vh] rounded-[3rem] overflow-hidden border border-white/5 bg-zinc-900/50"
            >
              <img src={room.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 lg:p-12 flex flex-col justify-end">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-pink-600 text-[10px] font-bold text-white uppercase tracking-widest">{room.tag}</span>
                    <span className="text-white/40 text-xs">Available Now</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-normal text-white mb-4 leading-tight">{room.title}</h3>
                  <div className="grid grid-cols-2 gap-y-2 mb-8">
                    {room.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/70 text-xs">
                        <CheckCircle2 size={14} className="text-pink-500" /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <p className="text-3xl font-normal text-white">₹{room.price}</p>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Starting Price / Night</p>
                  </div>
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="bg-white hover:bg-pink-600 hover:text-white text-black px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 group/btn"
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
          <motion.div style={{ scaleX: scrollYProgress }} className="h-full bg-pink-600 origin-left" />
        </div>
      </div>

      {/* --- BOOKING MODAL (ADVANCED UI) --- */}
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
                <h4 className="absolute bottom-6 left-8 text-2xl font-normal text-white">{selectedRoom.title}</h4>
              </div>

              <form onSubmit={handleBookingSubmit} className="p-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Your Full Name</label>
                    <input name="name" required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Arrival Date</label>
                    <input name="date" required type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500" />
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

                <button type="submit" className="w-full bg-pink-600 hover:bg-pink-500 text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 mt-4 shadow-xl shadow-pink-600/20">
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