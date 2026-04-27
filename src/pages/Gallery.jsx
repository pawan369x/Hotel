import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Gallery = () => {
  const images = [
    '/exterior.jpg',
    '/premium_room.jpg',
    '/banner-1.png',
    '/restaurant.jpg',
    '/dormitory.jpg',
    '/banner-2.png',
    '/deluxe_room.jpg',
    '/room4.jpeg',
    '/banner-3.png'
  ];

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <Helmet>
        <title>Gallery | Pink Park Hotel Bir Billing</title>
        <meta name="description" content="Take a visual journey through Pink Park Hotel and the stunning surroundings of Bir Billing, Himachal Pradesh." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <h1 className="text-5xl font-serif text-slate-900 mb-4">Gallery</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">A visual journey through Pink Park and the stunning surroundings of Bir Billing.</p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid overflow-hidden rounded-xl cursor-pointer group relative"
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
