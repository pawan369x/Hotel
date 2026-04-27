import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Mountain, Compass, Heart, Star } from 'lucide-react';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="bg-white overflow-hidden">
      <Helmet>
        <title>About Us | Pink Park Hotel Bir Billing</title>
        <meta name="description" content="Learn about the vision and story behind Pink Park Hotel by Panache Hotels. Experience the perfect blend of nature, luxury, and authentic Himachali hospitality." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/banner-1.png" alt="Bir Billing" className="w-full h-full object-cover brightness-50" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-400 font-bold tracking-[0.5em] uppercase text-sm mb-6"
          >
            Since 2024
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif font-normal tracking-tighter leading-none"
          >
            Our <span className="italic text-pink-300">Story</span>
          </motion.h1>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent mx-auto" />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div style={{ y: y1 }} className="space-y-8">
            <span className="text-pink-600 font-bold tracking-widest uppercase text-xs">The Vision</span>
            <h2 className="text-5xl lg:text-7xl font-serif text-slate-900 leading-[1.1]">
              Where the Earth <span className="italic text-pink-600">Meets</span> the Sky.
            </h2>
            <p className="text-xl text-slate-600 font-light leading-relaxed">
              Pink Park by Panache Hotels was born from a simple dream: to create a sanctuary that honors the raw beauty of Bir Billing while offering the refined comfort of a modern luxury retreat.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed italic">
              "We didn't just build a hotel; we curated an experience that captures the Himachali warmth and the adrenaline of the world's paragliding capital."
            </p>
          </motion.div>

          <div className="relative">
            <motion.div style={{ y: y2 }} className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="/banner-2.png" alt="Bir View" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute -bottom-12 -left-12 bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl hidden md:block">
              <p className="text-5xl font-normal text-pink-500 mb-2">3-Star</p>
              <p className="text-xs uppercase tracking-widest font-bold opacity-60">Property by Panache</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-slate-50 py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-5xl font-serif text-slate-900">The <span className="italic text-pink-600">Panache</span> Way</h2>
            <p className="text-slate-500 max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px] font-bold">Our core values that define your stay</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Mountain size={32} />, title: "Nature First", desc: "Every window frames a masterpiece of the Himalayan landscape." },
              { icon: <Heart size={32} />, title: "Local Soul", desc: "Authentic Himachali hospitality delivered with a modern touch." },
              { icon: <Compass size={32} />, title: "Adventure", desc: "Located at the heartbeat of paragliding and trekking trails." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:scale-105 transition-transform duration-500"
              >
                <div className="text-pink-600 mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <Star className="mx-auto text-pink-600 mb-6" size={48} />
          <h2 className="text-5xl md:text-7xl font-serif text-slate-900">Join the <span className="italic text-pink-600">Experience</span></h2>
          <p className="text-xl text-slate-600 font-light">Your mountain sanctuary is waiting. Discover the magic of Bir Billing with Pink Park.</p>
          <div className="pt-8">
            <a href="/rooms" className="inline-block bg-slate-900 text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-pink-600 transition-all shadow-xl shadow-slate-900/20">
              Explore Our Suites
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
