import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { MapPin, ArrowRight, Heart, MountainSnow, Star } from 'lucide-react';
import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const ExperienceSection = () => {
    const { hotelId } = useParams();
    const currentId = hotelId || "pink-park";
    const hotel = hotelsData[currentId] || hotelsData["pink-park"];
    const isPink = hotel.themeColor === 'pink';

    const sectionRef = useRef(null);

    // Scroll-triggered animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

    // Cursor tracking parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / width;
        const y = (e.clientY - top - height / 2) / height;
        mouseX.set(x);
        mouseY.set(y);
    };

    // Card parallax offsets
    const springConfig = { damping: 25, stiffness: 150 };
    const textTrack = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), springConfig);
    const mainCardTrack = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
    const statCardTrack = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

    const staggerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, staggerChildren: 0.15, delayChildren: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    // Dynamic Theme Styling
    const textAccent = isPink ? 'text-pink-600' : 'text-amber-600';
    const bgAccent = isPink ? 'bg-pink-600' : 'bg-amber-600';
    const bgAccentHover = isPink ? 'hover:bg-pink-500' : 'hover:bg-amber-500';
    const borderAccent = isPink ? 'hover:border-pink-300/50' : 'hover:border-amber-300/50';
    const borderAccentStrong = isPink ? 'border-pink-100 hover:border-pink-300' : 'border-amber-100 hover:border-amber-300';
    const bgAccentLight = isPink ? 'bg-pink-600/5' : 'bg-amber-600/5';
    const fillStar = isPink ? 'text-pink-600' : 'text-amber-600';

    return (
        <section 
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative bg-white pt-24 pb-32 overflow-hidden px-6 lg:px-12"
        >
            {/* Background elements */}
            <motion.h2 
                className="absolute top-0 right-0 text-[30vw] font-black text-slate-100 whitespace-nowrap pointer-events-none select-none z-0"
                style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
            >
                {currentId === "pink-park" ? "BIR BILLING" : "GUNEHAR"}
            </motion.h2>

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                style={{ y, opacity }}
            >
                {/* ADVANCED STORY LAYOUT */}
                <div className="grid lg:grid-cols-12 gap-x-12 items-center">
                    
                    {/* LEFT SIDE: Large Storytelling Text & Key Features */}
                    <div className="lg:col-span-6 space-y-12">
                        <motion.div
                            variants={staggerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="space-y-6"
                        >
                            <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className={`text-sm font-serif font-bold tracking-[0.3em] ${textAccent} uppercase`}>
                                The Experience
                            </motion.span>
                            <motion.h2 variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }} className="text-5xl lg:text-6xl font-serif font-black tracking-tighter text-slate-900 leading-[1.1]">
                                A <span className={`${textAccent} italic`}>Symphony</span> of <motion.span style={{x: textTrack}} className="inline-block">Luxury</motion.span> & Nature.
                            </motion.h2>
                            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-lg text-slate-600 leading-relaxed font-light">
                                {currentId === "pink-park"
                                  ? "Nestled in Kotli, Bir, Hotel Pink Park offers an unparalleled 3-star retreat, perfectly blending modern elegance and Himachali warmth."
                                  : "Located in the quiet village of Gunehar, Bir, Indra Home Stay offers a tranquil slice of local village life, blending cozy traditional cottages and warm pahadi hospitality."
                                }
                            </motion.p>
                        </motion.div>

                        {/* Bento Grid Feature Cards */}
                        <motion.div 
                            className="grid grid-cols-2 gap-6"
                            variants={staggerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <motion.div variants={itemVariants} className={`bg-slate-50 border border-slate-100 p-8 rounded-3xl transition-colors cursor-pointer space-y-3 group ${borderAccent}`}>
                                <Heart className={`${textAccent} group-hover:scale-125 transition-transform`} />
                                <h3 className="text-xl font-bold">
                                  {currentId === "pink-park" ? "Premium Suites" : "Cozy Attics"}
                                </h3>
                                <p className="text-sm text-slate-500">
                                  {currentId === "pink-park" ? "Unmatched comfort in the hills." : "Traditional mud & timber comfort."}
                                </p>
                            </motion.div>
                            
                            <motion.div variants={itemVariants} className={`border p-8 rounded-3xl transition-colors cursor-pointer space-y-3 group ${bgAccentLight} ${borderAccentStrong}`}>
                                <MapPin className={`${textAccent} group-hover:scale-125 transition-transform`} />
                                <h3 className="text-xl font-bold">
                                  {currentId === "pink-park" ? "Prime Location" : "Peaceful Oasis"}
                                </h3>
                                <p className="text-sm text-slate-500">
                                  {currentId === "pink-park" 
                                    ? "Near Paragliding landing site." 
                                    : "Near waterfalls & tea gardens."}
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: Interactive Image & Dynamic Stats */}
                    <div className="lg:col-span-6 mt-16 lg:mt-0 relative flex justify-center lg:justify-end">
                        <motion.div
                            style={{ x: mainCardTrack, y: statCardTrack, rotateX: useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10])), rotateY: useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10])) }}
                            className={`relative aspect-square w-full max-w-[500px] shadow-2xl shadow-slate-100 overflow-hidden rounded-[2.5rem] p-3 ${bgAccent} group`}
                        >
                             <div className="absolute inset-2 bg-white rounded-[2rem] overflow-hidden">
                                <img 
                                    src={currentId === "pink-park" ? "/banner-1.png" : "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80"} 
                                    alt={hotel.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/60 transition-opacity opacity-0 group-hover:opacity-100 flex items-end p-8">
                                    <p className="text-white text-lg font-bold">Your Himalayan Sanctuary, Waiting.</p>
                                </div>
                             </div>
                        </motion.div>

                        {/* Interactive Stat Card */}
                        <motion.div
                            style={{ x: -statCardTrack, y: -textTrack }}
                            className="absolute -top-12 -left-12 bg-white/5 backdrop-blur-3xl border border-white/10 p-6 rounded-2xl shadow-xl flex items-center gap-4 group cursor-pointer hover:border-white/30 transition-colors"
                        >
                             <div className={`w-12 h-12 ${bgAccent} flex items-center justify-center rounded-xl text-white group-hover:scale-110 transition-transform`}>
                                <MountainSnow />
                             </div>
                             <div>
                                <span className="text-xs text-slate-400 font-serif font-bold uppercase mb-1">Elevation</span>
                                <p className="text-2xl font-black text-slate-900 tracking-tighter">{hotel.elevation} <span className="text-xs text-slate-400 font-serif">AMS</span></p>
                             </div>
                        </motion.div>

                         {/* Google Rating Badge */}
                        <motion.div
                            style={{ x: statCardTrack, y: textTrack }}
                            className="absolute bottom-12 -right-12 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl shadow-slate-900/40 text-center"
                        >
                            <p className="text-xs text-slate-300 mb-2 font-serif font-bold uppercase tracking-wider">Top Rated in Bir</p>
                            <div className="flex gap-1 justify-center mb-1">
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="text-yellow-400"/>)}
                            </div>
                            <p className="text-lg font-serif italic text-white/80">"Unforgettable stay!"</p>
                        </motion.div>
                    </div>

                </div>

                 {/* "Discover" Link with new style */}
                <motion.div 
                    variants={staggerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-20 flex justify-center"
                >
                  <Link to={`/${currentId}/about`}>
                    <motion.span 
                        variants={itemVariants}
                        whileHover={{ x: -10 }}
                        className={`flex items-center gap-3 text-lg font-bold ${textAccent} hover:text-slate-900 group cursor-pointer`}
                    >
                         <div className="h-[2px] w-0 bg-slate-900 group-hover:w-8 transition-all duration-300"/>Discover Our Story <ArrowRight />
                    </motion.span>
                  </Link>
              </motion.div>

              {/* Quick Amenities Row */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-32 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 border-t border-slate-100 pt-20"
              >
                {[
                  { label: "Free WiFi", icon: "📶", detail: "High speed connectivity" },
                  { label: "24/7 Power", icon: "⚡", detail: "Backup available" },
                  { label: "Pure Veg", icon: "🥗", detail: "Organic kitchen" },
                  { label: "Parking", icon: "🚗", detail: "Secure on-site" },
                  { label: "Tea/Coffee", icon: "☕", detail: "In-room service" },
                  { label: "Trekking", icon: "🥾", detail: "Guided tours" },
                ].map((item, idx) => (
                  <div key={idx} className="group text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-2xl group-hover:${bgAccent} group-hover:text-white transition-all duration-500 shadow-sm`}>
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">{item.label}</h5>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-serif font-bold">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
        </section>
    );
};

export default ExperienceSection;
