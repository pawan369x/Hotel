import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Coffee, Leaf, ArrowRight, ShoppingCart, X, Send } from 'lucide-react';
import { useState } from 'react';
import { menuData } from '../data/menuData';
import ActionModal from './ActionModal';

const DiningSection = () => {
  const categories = Object.keys(menuData);
  const [activeTab, setActiveTab] = useState(categories[0]);
  
  // Selection & Modal State
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState('food');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalType('food');
    setIsModalOpen(true);
  };

  const handleBookingClick = () => {
    setSelectedItem(null);
    setModalType('book');
    setIsModalOpen(true);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const sendOrderToWhatsApp = () => {
    const hotelPhone = "+919876543210";
    let message = "*Full Order Request - Pink Park*\n\n";
    let total = 0;

    cart.forEach((item, index) => {
      const priceValue = parseFloat(item.price.split('/')[0].replace(',', ''));
      const subtotal = priceValue * item.quantity;
      total += subtotal;
      message += `${index + 1}. *${item.name}* x ${item.quantity}\n`;
      if (item.note) message += `   _Note: ${item.note}_\n`;
      message += `   Price: ₹${subtotal}\n\n`;
    });

    message += `*Total Amount: ₹${total}*`;
    window.open(`https://wa.me/${hotelPhone}?text=${encodeURIComponent(message)}`, '_blank');
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <section id="dining" className="py-24 bg-[#0a0a0a] text-white overflow-hidden relative min-h-screen">
      {/* Decorative Background Text */}
      <div className="absolute top-20 left-0 w-full opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[20vw] font-black leading-none text-center">GASTRONOMY</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="h-[2px] w-12 bg-pink-600" />
              <span className="text-pink-500 font-bold tracking-[0.4em] uppercase text-[11px]">Exceptional Dining</span>
            </motion.div>
            <h2 className="text-7xl lg:text-9xl font-serif font-light leading-[0.8] tracking-tighter">
              Pure <span className="text-pink-600 italic font-normal">Soul</span> <br /> Food.
            </h2>
          </div>

          {/* Advanced Animated Tabs - Scrollable */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-3 bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-md min-w-max">
              {categories.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 z-10 ${activeTab === tab ? 'text-white' : 'text-white/50 hover:text-white'
                    }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-pink-600 rounded-full -z-10 shadow-lg shadow-pink-600/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Menu Grid */}
        <div className="grid lg:grid-cols-12 gap-12 mb-32">

          {/* Left Side: Featured Image */}
          <motion.div
            key={activeTab + "-image"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="sticky top-10 h-[500px] rounded-[3rem] overflow-hidden border border-white/10 group cursor-pointer" onClick={handleBookingClick}>
              <img
                src={`https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                alt="Category"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-2">Signature</p>
                <h3 className="text-3xl font-serif">{activeTab} Selection</h3>
                <div className="mt-4 flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest group-hover:text-pink-500 transition-colors">
                  Reserve Table <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Animated List */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="grid md:grid-cols-1 gap-y-2"
              >
                {menuData[activeTab].map((item, idx) => (
                  <motion.div
                    key={`${activeTab}-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleItemClick(item)}
                    className="group flex justify-between items-center p-6 rounded-3xl hover:bg-white/[0.05] transition-all duration-300 border-b border-white/5 cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-white/20 font-mono text-sm group-hover:text-pink-500/50 transition-colors">0{idx + 1}</span>
                      <div className="flex flex-col">
                        <h4 className="text-2xl md:text-3xl font-serif text-white/80 group-hover:text-pink-500 group-hover:translate-x-2 transition-all duration-300">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] mt-1 flex items-center gap-2 group-hover:text-white/40">
                          <ShoppingCart size={10} /> Click to select
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="h-[1px] w-0 group-hover:w-20 bg-pink-500/30 transition-all duration-700 hidden md:block" />
                      <span className="text-xl font-medium text-pink-500 bg-pink-500/10 px-4 py-1 rounded-full group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                        {item.price.includes('/') ? item.price : `₹${item.price}`}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -10 }}
            className="md:col-span-2 bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-10 rounded-[3rem] relative overflow-hidden group cursor-pointer"
            onClick={handleBookingClick}
          >
            <div className="relative z-10 space-y-6">
              <Utensils className="text-pink-600" size={40} />
              <h3 className="text-4xl md:text-5xl font-serif leading-tight">Private <span className="italic text-pink-500">Starlit</span> <br /> Rooftop Dinners</h3>
              <button className="px-8 py-4 bg-pink-600 hover:bg-pink-700 rounded-2xl font-bold transition-all flex items-center gap-3">
                Reserve Table <ArrowRight size={18} />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-full h-full opacity-20 -z-0">
              <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Restaurant" />
            </div>
          </motion.div>

          <div className="grid gap-6">
            <div className="bg-pink-600 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center space-y-3 hover:scale-[1.02] transition-transform cursor-pointer">
              <Leaf size={32} />
              <h4 className="text-xl font-bold">100% Organic</h4>
              <p className="text-white/70 text-sm italic">Fresh from Bir's local farms</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.08] transition-colors cursor-pointer">
              <Coffee size={32} className="text-pink-500 mb-2" />
              <h4 className="text-xl font-bold font-serif italic">Sunset Cafe</h4>
              <p className="text-[10px] tracking-widest uppercase opacity-40 mt-2">Open till 10 PM</p>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.button
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 20 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-10 right-10 z-[60] bg-pink-600 text-white p-6 rounded-full shadow-2xl shadow-pink-600/40 flex items-center gap-4 group"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </div>
            <span className="font-bold text-sm uppercase tracking-widest hidden md:block">View Order</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Sidebar/Modal Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-[#1a1a1a] h-full shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-2xl font-serif">Your Feast</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between items-start group">
                    <div className="space-y-1">
                      <h4 className="text-lg font-serif">{item.name}</h4>
                      <p className="text-xs text-white/40">Quantity: {item.quantity}</p>
                      {item.note && <p className="text-[10px] italic text-pink-500/60">"{item.note}"</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-pink-500 font-bold">₹{parseFloat(item.price.split('/')[0].replace(',', '')) * item.quantity}</p>
                      <button 
                        onClick={() => removeFromCart(i)}
                        className="text-[10px] uppercase font-bold tracking-widest text-white/20 hover:text-red-500 transition-colors mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-white/[0.02] border-t border-white/5 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 uppercase tracking-[0.2em] text-xs font-bold">Estimated Total</span>
                  <span className="text-3xl font-serif text-white">
                    ₹{cart.reduce((acc, item) => acc + (parseFloat(item.price.split('/')[0].replace(',', '')) * item.quantity), 0)}
                  </span>
                </div>
                <button 
                  onClick={sendOrderToWhatsApp}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-pink-600/20"
                >
                  Send Order via WhatsApp <Send size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ActionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={selectedItem} 
        type={modalType} 
        onAddToCart={addToCart}
      />
    </section>
  );
};

export default DiningSection;