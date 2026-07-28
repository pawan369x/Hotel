import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import ExperienceSection from '../components/ExperienceSection';
import FeatureShowcase from '../components/FeatureShowcase';
import RoomsSection from '../components/RoomsSection';
import DiningSection from '../components/DiningSection';
import Testimonials from '../components/Testimonials';
import LocationSection from '../components/LocationSection';
import FAQSection from '../components/FAQSection';
import { hotelsData } from '../data/hotels';

const Home = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "piink-park";
  const hotel = hotelsData[currentId] || hotelsData["piink-park"];
  const isPink = hotel.themeColor === 'pink';

  // Theme-specific styles
  const btnHoverBg = isPink ? 'hover:bg-pink-600 shadow-pink-600/10' : 'hover:bg-amber-600 shadow-amber-600/10';
  const ctaBtnBg = isPink ? 'bg-pink-600 hover:bg-pink-500 shadow-pink-600/40' : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/40';

  return (
    <div className="bg-slate-50">
      <HeroCarousel />

      {/* Featured Experience Preview */}
      <div className="relative">
        <ExperienceSection />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
           <Link to={`/${currentId}/experience`} className={`bg-slate-900 text-white px-10 py-4 rounded-full font-bold transition-all flex items-center gap-2 ${btnHoverBg}`}>
              View Full Experience <ArrowRight size={18} />
           </Link>
        </div>
      </div>

      {/* Rooms Preview */}
      <div className="relative">
        <RoomsSection />
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
           <Link to={`/${currentId}/rooms`} className={`bg-white text-slate-900 px-10 py-4 rounded-full font-bold hover:text-white transition-all flex items-center gap-2 shadow-xl ${isPink ? 'hover:bg-pink-600' : 'hover:bg-amber-600'}`}>
              See All Suites <ArrowRight size={18} />
           </Link>
        </div>
      </div>

      {/* Dining Preview */}
      <div className="relative bg-[#0a0a0a] pb-24">
        <DiningSection />
        <div className="flex justify-center -mt-12 relative z-20">
           <Link to={`/${currentId}/dining`} className={`text-white px-12 py-5 rounded-full font-bold transition-all flex items-center gap-2 shadow-2xl ${ctaBtnBg}`}>
              Explore Full Menu <ArrowRight size={18} />
           </Link>
        </div>
      </div>

      {/* Guest Reviews */}
      <Testimonials />

      {/* Map & Attractions */}
      <LocationSection />

      {/* Frequently Asked Questions */}
      <FAQSection />
    </div>
  );
};

export default Home;
