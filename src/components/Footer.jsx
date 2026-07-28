import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, Globe, Star } from 'lucide-react';
import Logo from './Logo';
import { hotelsData } from '../data/hotels';

const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const Facebook = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Twitter = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const Footer = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "piink-park";
  const hotel = hotelsData[currentId] || hotelsData["piink-park"];

  // Dynamic Theme Styling
  const isPink = hotel.themeColor === 'pink';
  const textAccent = isPink ? 'text-pink-500' : 'text-amber-500';
  const textAccentHeavy = isPink ? 'text-pink-600' : 'text-amber-600';
  const textLightAccent = isPink ? 'text-pink-400' : 'text-amber-400';
  const bgAccent = isPink ? 'bg-pink-600' : 'bg-amber-600';
  const bgAccentHover = isPink ? 'hover:bg-pink-500' : 'hover:bg-amber-500';
  const glowingOrb = isPink ? 'bg-pink-600/10' : 'bg-amber-600/10';

  // Parallax effect for the background text
  const { scrollYProgress } = useScroll();
  const xTranslate = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-24 pb-12 overflow-hidden">
      {/* --- ADVANCED BACKGROUND ELEMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/5 to-transparent" />

      {/* Animated Glowing Orbs */}
      <div className={`absolute top-1/4 -left-20 w-[500px] h-[500px] ${glowingOrb} rounded-full blur-[120px] animate-pulse`} />
      <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />

      {/* Big Parallax Background Text */}
      <motion.h2
        style={{ x: xTranslate }}
        className="absolute -bottom-10 left-0 text-[15vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none"
      >
        {hotel.name.toUpperCase()} LUXURY
      </motion.h2>

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* --- TOP SECTION: BENTO STYLE NEWSLETTER --- */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20"
        >
          <div className="lg:col-span-2 bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8 group">
            <div className="space-y-3">
              <span className={`font-bold tracking-[0.2em] text-xs uppercase ${textAccent}`}>Stay Updated</span>
              <h3 className="text-4xl font-light leading-tight">Join the <span className={`font-serif italic ${textLightAccent}`}>Experience</span></h3>
              <p className="text-gray-400 max-w-sm">Get secret deals for your next Himalayan retreat directly in your inbox.</p>
            </div>
            <div className="relative w-full md:w-auto">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full md:w-80 bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:outline-none focus:border-pink-500/50 transition-all text-white"
              />
              <button className={`absolute right-2 top-2 ${bgAccent} ${bgAccentHover} p-3 rounded-xl transition-all group`}>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className={`${bgAccent} p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center space-y-4 hover:scale-[1.02] transition-transform cursor-pointer shadow-xl shadow-black/10`}>
            <div className="flex gap-1 text-yellow-300">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <p className="text-xl md:text-2xl font-serif italic">
              {currentId === "piink-park" ? '"The most aesthetic stay in Bir Billing!"' : '"The most peaceful homestay experience!"'}
            </p>
            <span className="text-xs font-medium opacity-80">— Guest Reviews</span>
          </div>
        </motion.div>

        {/* --- MAIN LINKS SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">

          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link to={`/${currentId}`} className="group flex items-center gap-3">
              <Logo className="h-10 w-auto" variant="crest" color="gold" />
              <div className="text-left font-serif">
                <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase block leading-none">Panache Hotels</span>
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-500 transition-colors">
                  {hotel.name}
                </span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed text-base font-light">
              Elevating your stay with a blend of <span className="text-white">Himachali hospitality</span>, modern comfort, and scenic peace.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={20} />, link: "#" },
                { icon: <Facebook size={20} />, link: "#" },
                { icon: <Twitter size={20} />, link: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  whileHover={{ y: -8, backgroundColor: isPink ? "rgb(219, 39, 119)" : "rgb(217, 119, 6)" }}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-colors bg-white/5"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className={`text-xs font-bold uppercase tracking-[0.3em] mb-8 ${textAccent}`}>Explore</h4>
            <ul className="space-y-4 text-sm">
              {[
                { name: 'Home', path: `/${currentId}` },
                { name: 'Suites', path: `/${currentId}/rooms` },
                { name: 'Dining', path: `/${currentId}/dining` },
                { name: 'Experience', path: `/${currentId}/experience` },
                { name: 'Gallery', path: `/${currentId}/gallery` },
                { name: 'About', path: `/${currentId}/about` },
                { name: 'Contact', path: `/${currentId}/contact` }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-400 hover:text-white flex items-center group transition-all">
                    <span className={`h-[1px] w-0 ${bgAccent} group-hover:w-4 mr-0 group-hover:mr-3 transition-all duration-300`} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 lg:ml-auto">
            <h4 className={`text-xs font-bold uppercase tracking-[0.3em] mb-8 ${textAccent}`}>Contact</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className={`${textAccentHeavy} shrink-0`} size={24} />
                <p className="text-gray-400 text-sm leading-relaxed">
                  {hotel.location}
                </p>
              </div>
              <a href={`tel:${hotel.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 group cursor-pointer">
                <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:${bgAccent} transition-all`}>
                  <Phone size={18} />
                </div>
                <span className="text-gray-300 text-sm font-medium">{hotel.phone}</span>
              </a>
              <a href={`mailto:${hotel.email}`} className="flex items-center gap-4 group cursor-pointer">
                <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:${bgAccent} transition-all`}>
                  <Mail size={18} />
                </div>
                <span className="text-gray-300 text-sm font-medium">{hotel.email}</span>
              </a>
            </div>
          </div>

          {/* Support Local */}
          <div className="lg:col-span-3 flex flex-col justify-end">
            <div className={`p-6 rounded-3xl bg-white/5 border border-white/10 hover:${isPink ? 'border-pink-500/40' : 'border-amber-500/40'} transition-all`}>
              <Globe className={textAccentHeavy} size={24} />
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 mt-2">Sustainable Tourism</p>
              <p className="text-sm italic text-gray-300">
                {currentId === "piink-park" 
                  ? '"We proudly support the local Bir community and eco-friendly travel."'
                  : '"Supporting local Gunehar farmers and serving organic farm-to-table food."'}
              </p>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-gray-500 tracking-widest flex items-center gap-2">
            © {new Date().getFullYear()} <span className="text-white font-bold">{hotel.name.toUpperCase()} BY PANACHE HOTELS</span>
            <span className="h-1 w-1 bg-gray-700 rounded-full" />
            DESIGNED BY <span className={`font-black hover:scale-110 transition-transform cursor-pointer ${textAccent}`}>PAWAN</span>
          </div>

          <div className="flex gap-8">
            <Link to="/" className={`text-[10px] uppercase font-bold tracking-widest text-gray-500 ${isPink ? 'hover:text-pink-400' : 'hover:text-amber-400'} transition-colors`}>
              Franchise Portal
            </Link>
            {['Privacy', 'Terms', 'Sitemap'].map(text => (
              <Link key={text} to="#" className={`text-[10px] uppercase font-bold tracking-widest text-gray-600 ${isPink ? 'hover:text-pink-400' : 'hover:text-amber-400'} transition-colors`}>
                {text}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;