import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const Gallery = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "piink-park";
  const hotel = hotelsData[currentId] || hotelsData["piink-park"];
  const isPink = hotel.themeColor === 'pink';

  const images = hotel.gallery;

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <h1 className="text-5xl font-serif text-slate-900 mb-4">Gallery</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A visual journey through {hotel.name} and the stunning surroundings of Bir Billing.
          </p>
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
