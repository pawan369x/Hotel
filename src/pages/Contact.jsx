import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, ArrowRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const Contact = () => {
  const { hotelId } = useParams();
  const currentId = hotelId || "pink-park";
  const hotel = hotelsData[currentId] || hotelsData["pink-park"];
  const isPink = hotel.themeColor === 'pink';

  // Dynamic Theme Colors
  const textAccent = isPink ? 'text-pink-400' : 'text-amber-400';
  const textAccentMuted = isPink ? 'text-pink-300' : 'text-amber-300';
  const textAccentHeavy = isPink ? 'text-pink-600' : 'text-amber-600';
  const bgAccentLight = isPink ? 'bg-pink-50' : 'bg-amber-50';
  const bgAccentHover = isPink ? 'hover:bg-pink-600' : 'hover:bg-amber-600';
  const borderFocus = isPink ? 'focus:border-pink-500 focus:ring-pink-500/20' : 'focus:border-amber-500 focus:ring-amber-500/20';
  const groupBgHover = isPink ? 'group-hover:bg-pink-600' : 'group-hover:bg-amber-600';

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const message = `Inquiry from Contact Form at ${hotel.name}:%0A- Name: ${data.firstname} ${data.lastname}%0A- Email: ${data.email}%0A- Message: ${data.message}`;
    window.open(`https://wa.me/${hotel.waNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="pt-24 pb-16 bg-[#fafafa] min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 z-0">
          <img src="/banner-2.png" alt="Contact Header" className="w-full h-full object-cover brightness-50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${textAccent} font-bold tracking-[0.4em] uppercase text-xs mb-4`}
          >
            Connect With Us
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-4"
          >
            Get in <span className={`italic ${textAccentMuted}`}>Touch</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif text-slate-900 leading-tight">We're here to help you find your <span className={`italic ${textAccentHeavy}`}>Zen</span>.</h2>
              <p className="text-slate-600 text-lg font-light leading-relaxed">
                {currentId === "pink-park"
                  ? "Whether you're planning a paragliding adventure or seeking a peaceful Himalayan retreat, our team is ready to assist with every detail of your stay."
                  : "If you seek quiet village environment, home-cooked food, riverside walks, or just a cozy break in the mountains, we welcome you to our home."
                }
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className={`w-14 h-14 rounded-2xl bg-white shadow-xl shadow-slate-100 flex items-center justify-center text-slate-600 ${groupBgHover} group-hover:text-white transition-all shrink-0`}>
                  <MapPin size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Our Sanctuary</p>
                  <p className="text-lg font-medium text-slate-900 leading-relaxed">
                    {hotel.name} by Panache Hotels,<br />
                    {hotel.location.split(', ').slice(1).join(', ')}
                  </p>
                </div>
              </div>

              <a href={`tel:${hotel.phone.replace(/\s+/g, '')}`} className="flex gap-6 group">
                <div className={`w-14 h-14 rounded-2xl bg-white shadow-xl shadow-slate-100 flex items-center justify-center text-slate-600 ${groupBgHover} group-hover:text-white transition-all shrink-0`}>
                  <Phone size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Direct Line</p>
                  <p className="text-lg font-medium text-slate-900">{hotel.phone}</p>
                </div>
              </a>

              <a href={`mailto:${hotel.email}`} className="flex gap-6 group">
                <div className={`w-14 h-14 rounded-2xl bg-white shadow-xl shadow-slate-100 flex items-center justify-center text-slate-600 ${groupBgHover} group-hover:text-white transition-all shrink-0`}>
                  <Mail size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Inquiry</p>
                  <p className="text-lg font-medium text-slate-900">{hotel.email}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-10 lg:p-16 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden"
            >
              {/* Subtle Background Pattern */}
              <div className={`absolute top-0 right-0 w-64 h-64 ${bgAccentLight} rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2`} />
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">First Name</label>
                    <input name="firstname" type="text" required placeholder="John" className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 ${borderFocus} transition-all`} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Last Name</label>
                    <input name="lastname" type="text" required placeholder="Doe" className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 ${borderFocus} transition-all`} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Email Address</label>
                  <input name="email" type="email" required placeholder="john@example.com" className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 ${borderFocus} transition-all`} />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Your Message</label>
                  <textarea name="message" rows="5" required placeholder="How can we make your Himalayan stay unforgettable?" className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 ${borderFocus} transition-all resize-none`}></textarea>
                </div>

                <button type="submit" className={`w-full bg-slate-900 text-white py-6 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 group shadow-xl shadow-slate-900/10 ${bgAccentHover}`}>
                  Send Your Inquiry <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="mt-32 h-[60vh] w-full relative">
        <iframe 
          src={hotel.mapEmbed} 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'contrast(1.1) brightness(0.9)' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-1000"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
