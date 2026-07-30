import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const FAQSection = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "pink-park";
  const hotel = hotelsData[currentId] || hotelsData["pink-park"];
  const isPink = hotel.themeColor === 'pink';

  const [activeIndex, setActiveIndex] = useState(null);

  // Dynamic Theme Styling
  const textAccent = isPink ? 'text-pink-600' : 'text-amber-600';

  const faqs = hotel.faqs;

  return (
    <section className="py-32 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <HelpCircle className={textAccent} size={20} />
            <span className={`${textAccent} font-bold tracking-[0.3em] uppercase text-xs`}>Help Center</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-black text-slate-900 tracking-tighter"
          >
            Common <span className={`${textAccent} italic`}>Queries</span>.
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border border-slate-100 rounded-3xl overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900">{faq.question}</span>
                <ChevronDown 
                  className={`text-slate-400 transition-transform duration-300 ${activeIndex === idx ? `rotate-180 ${textAccent}` : ''}`} 
                  size={24} 
                />
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-slate-500 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
