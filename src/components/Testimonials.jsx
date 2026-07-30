import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const Testimonials = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "pink-park";
  const hotel = hotelsData[currentId] || hotelsData["pink-park"];
  const isPink = hotel.themeColor === 'pink';

  // Dynamic Theme Styling
  const textAccent = isPink ? 'text-pink-600' : 'text-amber-600';
  const quoteBgColor = isPink ? 'text-pink-100 group-hover:text-pink-200' : 'text-amber-100 group-hover:text-amber-200';
  const borderAvatar = isPink ? 'border-pink-100' : 'border-amber-100';

  const reviews = hotel.testimonials;

  return (
    <section className="py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`${textAccent} font-serif font-bold tracking-[0.3em] uppercase text-xs`}
          >
            Guest Stories
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-black text-slate-900 mt-4 tracking-tighter"
          >
            Trusted by <span className={`${textAccent} italic`}>Thousands</span>.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 relative group hover:scale-[1.02] transition-transform duration-500"
            >
              <Quote className={`absolute top-8 right-8 ${quoteBgColor} transition-colors`} size={60} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                ))}
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mb-8 relative z-10 font-light">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4">
                <img src={review.img} alt={review.name} className={`w-12 h-12 rounded-full border-2 ${borderAvatar}`} />
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-xs text-slate-400 font-serif font-medium">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
