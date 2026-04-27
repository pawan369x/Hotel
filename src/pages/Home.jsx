import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import ExperienceSection from '../components/ExperienceSection';
import FeatureShowcase from '../components/FeatureShowcase';
import RoomsSection from '../components/RoomsSection';
import DiningSection from '../components/DiningSection';

const Home = () => {
  return (
    <div className="bg-slate-50">
      <Helmet>
        <title>Pink Park Hotel & Resort | Luxury Stay in Bir Billing</title>
        <meta name="description" content="Experience luxury at Pink Park Hotel & Resort in Bir Billing. Discover premium mountain suites, fine dining, and breathtaking views of the Himalayas." />
      </Helmet>
      <HeroCarousel />

      {/* Featured Experience */}
      <ExperienceSection />

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Rooms Horizontal Scroll */}
      <RoomsSection />

      {/* Dining Section */}
      <DiningSection />
    </div>
  );
};

export default Home;
