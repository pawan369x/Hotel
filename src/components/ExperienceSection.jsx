import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Heart, MountainSnow, Star } from 'lucide-react';
import { useRef, useState } from 'react';
import ActionModal from './ActionModal';

const ExperienceSection = () => {
    const sectionRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleBookingClick = (title) => {
        setSelectedItem({ name: title, price: "Varies" });
        setIsModalOpen(true);
    };

    // Scroll-triggered animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    });
// ... (rest of the logic remains same until return)

    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

    // Cursor tracking parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / width;
        const y = (e.clientY - top - height / 2) / height;
        mouseX.set(x);
        mouseY.set(y);
    };

    // Card parallax offsets (higher number = more aggressive track)
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

    return (
        <section 
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative bg-white pt-24 pb-32 overflow-hidden px-6 lg:px-12"
        >
            {/* Background elements (subtle mountains, maybe?) */}
            <motion.h2 
                className="absolute top-0 right-0 text-[30vw] font-normal text-slate-100 whitespace-nowrap pointer-events-none select-none z-0"
                style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
            >
                BIR BILLING
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
                            <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-sm font-bold tracking-[0.3em] text-pink-600 uppercase">
                                The Experience
                            </motion.span>
                            <motion.h2 variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }} className="text-5xl lg:text-6xl font-serif font-normal tracking-tighter text-slate-900 leading-[1.1]">
                                A <span className="text-pink-600 italic">Symphony</span> of <motion.span style={{x: textTrack}} className="inline-block">Luxury</motion.span> & Nature.
                            </motion.h2>
                            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-lg text-slate-600 leading-relaxed font-light">
                                Nestled in Kotli, Bir, Hotel Pink Park offers an unparalleled 3-star retreat, perfectly blending modern elegance and Himachali warmth.
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
                            <motion.div 
                                onClick={() => handleBookingClick("Premium Suites")}
                                variants={itemVariants} 
                                className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:border-pink-300/50 transition-colors cursor-pointer space-y-3 group"
                            >
                                <Heart className="text-pink-600 group-hover:scale-125 transition-transform" />
                                <h3 className="text-xl font-bold">Premium Suites</h3>
                                <p className="text-sm text-slate-500">Unmatched comfort in the hills.</p>
                            </motion.div>
                            <motion.div 
                                onClick={() => handleBookingClick("Prime Location Tours")}
                                variants={itemVariants} 
                                className="bg-pink-600/5 border border-pink-100 p-8 rounded-3xl hover:border-pink-300 transition-colors cursor-pointer space-y-3 group"
                            >
                                <MapPin className="text-pink-600 group-hover:scale-125 transition-transform" />
                                <h3 className="text-xl font-bold">Prime Location</h3>
                                <p className="text-sm text-slate-500">Near Paragliding & Baijnath temple.</p>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: Interactive Image & Dynamic Stats */}
                    <div className="lg:col-span-6 mt-16 lg:mt-0 relative flex justify-center lg:justify-end">
                        {/* THE INTERACTIVE IMAGE MASK */}
                        <motion.div
                            style={{ x: mainCardTrack, y: statCardTrack, rotateX: useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10])), rotateY: useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10])) }}
                            onClick={() => handleBookingClick("Pink Park Experience")}
                            className="relative aspect-square w-full max-w-[500px] shadow-2xl shadow-pink-100/30 overflow-hidden rounded-[2.5rem] p-3 bg-pink-600 group cursor-pointer"
                        >
                             <div className="absolute inset-2 bg-white rounded-[2rem] overflow-hidden">
                                <img 
                                    src="/banner-1.png" 
                                    alt="Pink Park Hotel Bir" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/60 transition-opacity opacity-0 group-hover:opacity-100 flex items-end p-8">
                                    <p className="text-white text-lg font-bold">Your Himalayan Retreat, Waiting.</p>
                                </div>
                             </div>
                        </motion.div>

                        {/* Interactive Stat Card */}
                        <motion.div
                            style={{ x: -statCardTrack, y: -textTrack }}
                            className="absolute -top-12 -left-12 bg-white/5 backdrop-blur-3xl border border-white/10 p-6 rounded-2xl shadow-xl flex items-center gap-4 group cursor-pointer hover:border-white/30 transition-colors"
                        >
                             <div className="w-12 h-12 bg-pink-600 flex items-center justify-center rounded-xl text-white group-hover:scale-110 transition-transform">
                                <MountainSnow />
                             </div>
                             <div>
                                <span className="text-xs text-slate-400 font-bold uppercase mb-1">Elevation</span>
                                <p className="text-2xl font-normal text-slate-900 tracking-tighter">1,500m <span className="text-xs text-slate-400">AMS</span></p>
                             </div>
                        </motion.div>

                         {/* Google Rating Badge */}
                        <motion.div
                            style={{ x: statCardTrack, y: textTrack }}
                            className="absolute bottom-12 -right-12 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl shadow-slate-900/40 text-center"
                        >
                            <p className="text-xs text-slate-300 mb-2 font-bold uppercase tracking-wider">Top Rated in Bir</p>
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
                    <motion.a 
                        variants={itemVariants}
                        href="#" 
                        whileHover={{ x: -10 }}
                        className="flex items-center gap-3 text-lg font-bold text-pink-600 hover:text-slate-900 group"
                    >
                         <div className="h-[2px] w-0 bg-slate-900 group-hover:w-8 transition-all duration-300"/>Discover Our Story <ArrowRight />
                    </motion.a>
                </motion.div>
            </motion.div>

            <ActionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                item={selectedItem} 
                type="book" 
            />
        </section>
    );
};

export default ExperienceSection;
