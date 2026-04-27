import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, ArrowRight } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
  };

  return (
    <div className="pt-24 pb-16 bg-[#fafafa] min-h-screen">
      <Helmet>
        <title>Contact Us | Pink Park Hotel Bir Billing</title>
        <meta name="description" content="Get in touch with Pink Park Hotel in Bir Billing. Contact us for room reservations, paragliding packages, or any inquiries about your stay in the Himalayas." />
      </Helmet>
      {/* Hero Header */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 z-0">
          <img src="/banner-2.png" alt="Contact Header" className="w-full h-full object-cover brightness-50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-400 font-bold tracking-[0.4em] uppercase text-xs mb-4"
          >
            Connect With Us
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-4"
          >
            Get in <span className="italic text-pink-300">Touch</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif text-slate-900 leading-tight">We're here to help you find your <span className="italic text-pink-600">Zen</span>.</h2>
              <p className="text-slate-600 text-lg font-light leading-relaxed">
                Whether you're planning a paragliding adventure or seeking a peaceful Himalayan retreat, our team is ready to assist with every detail of your stay.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-pink-100/50 flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all shrink-0">
                  <MapPin size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Our Sanctuary</p>
                  <p className="text-lg font-medium text-slate-900 leading-relaxed">
                    Pink Park by Panache Hotels,<br />
                    Village Kotli, Tehsil-Baijnath,<br />
                    Bir, Himachal Pradesh 176077
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-pink-100/50 flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all shrink-0">
                  <Phone size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Direct Line</p>
                  <p className="text-lg font-medium text-slate-900">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-pink-100/50 flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all shrink-0">
                  <Mail size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Inquiry</p>
                  <p className="text-lg font-medium text-slate-900">stay@pinkpark.com</p>
                </div>
              </div>
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">First Name</label>
                    <input type="text" required placeholder="John" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Last Name</label>
                    <input type="text" required placeholder="Doe" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Email Address</label>
                  <input type="email" required placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Your Message</label>
                  <textarea rows="5" required placeholder="How can we make your Himalayan stay unforgettable?" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all resize-none"></textarea>
                </div>

                <button type="submit" className="w-full bg-slate-900 hover:bg-pink-600 text-white py-6 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 group shadow-xl shadow-slate-900/10">
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.768652014457!2d76.71183205000001!3d32.046904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904b176435bd98b%3A0xc622d14872c0199f!2sBir%2C%20Himachal%20Pradesh%20176077!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
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
