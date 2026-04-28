import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { useScroll, useTransform } from 'framer-motion';
import ActionModal from './ActionModal';

const rooms = [
  {
    id: 1,
    name: "Premium Mountain Suite",
    price: "4,500",
    image: "/premium_room.jpg",
    features: ["Balcony View", "King Bed", "Rain Shower", "Free Breakfast", "Mini Fridge"],
    tag: "Most Popular"
  },
  {
    id: 2,
    name: "Backpacker's Dormitory",
    price: "1,200",
    image: "/dormitory.jpg",
    features: ["Bunk Beds", "Fast Wi-Fi", "Shared Lounge", "Lockers", "Mountain View"],
    tag: "Adventure Ready"
  },
  {
    id: 3,
    name: "Himalayan Penthouse",
    price: "6,500",
    image: "/deluxe_room.jpg",
    features: ["Panoramic View", "Private Terrace", "Mini Bar", "Bathtub", "Personal Butler"],
    tag: "Pure Luxury"
  },
  {
    id: 4,
    name: "Family Valley Suite",
    price: "5,200",
    image: "/room4.jpeg",
    features: ["Two Bedrooms", "Living Area", "Kitchenette", "Board Games", "Extra Bed"],
    tag: "Great for Groups"
  }
];

const RoomsSection = () => {
  const targetRef = useRef(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  const handleBookingClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
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
                  <h3 className="text-3xl lg:text-4xl font-normal text-white mb-4 leading-tight">{room.name}</h3>
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
                    onClick={() => handleBookingClick(room)}
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

      {/* Unified Action Modal */}
      <ActionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={selectedRoom} 
        type="book" 
      />
    </section>
  );
};

export default RoomsSection;