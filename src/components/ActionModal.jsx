import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Send, Calendar, Users, Phone, User } from 'lucide-react';
import { useState } from 'react';

const ActionModal = ({ isOpen, onClose, item, type = 'food', onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;
  if (type === 'food' && !item) return null;

  const handleAction = () => {
    if (type === 'food') {
      onAddToCart({ ...item, quantity, note });
      onClose();
      // Reset
      setQuantity(1);
      setNote('');
    } else {
      const hotelPhone = "+919876543210"; 
      const message = `*Booking Request - Pink Park*\n\n` +
                `*Service:* Table Reservation\n` +
                `*Name:* ${name}\n` +
                `*Date:* ${date}\n` +
                `*Guests:* ${guests}\n` +
                `*Contact:* ${phone}\n` +
                (note ? `*Note:* ${note}` : "");
      window.open(`https://wa.me/${hotelPhone}?text=${encodeURIComponent(message)}`, '_blank');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-pink-600/10 to-transparent">
            <div>
              <p className="text-pink-500 font-bold uppercase tracking-widest text-[10px] mb-1">
                {type === 'food' ? 'Add to Order' : 'Reservation'}
              </p>
              <h3 className="text-2xl font-serif text-white">{type === 'food' ? item.name : 'Book Your Table'}</h3>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-white/50" />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">
            {type === 'food' ? (
              <>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                  <span className="text-white/60">Unit Price</span>
                  <span className="text-xl font-bold text-pink-500">₹{item.price}</span>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Quantity</label>
                  <div className="flex items-center justify-between p-2 bg-white/5 border border-white/10 rounded-2xl">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all group"
                    >
                      <Minus size={20} className="group-hover:text-white text-white/50" />
                    </button>
                    <span className="text-3xl font-serif text-white">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all group"
                    >
                      <Plus size={20} className="group-hover:text-white text-white/50" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Special Instructions</label>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Less spicy, Extra napkins..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pink-500 transition-all resize-none"
                    rows="3"
                  />
                </div>
              </>
            ) : (
              <div className="grid gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-pink-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" size={18} />
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-pink-500 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" size={18} />
                    <input 
                      type="number" 
                      placeholder="Guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-pink-500 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" size={18} />
                    <input 
                      type="tel" 
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-pink-500 transition-all"
                    />
                  </div>
                </div>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Additional requests..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pink-500 transition-all resize-none"
                  rows="2"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-8 bg-white/[0.02] border-t border-white/5">
            <button 
              onClick={handleAction}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 group shadow-xl shadow-pink-600/20"
            >
              {type === 'food' ? `Add to Order (₹${(parseFloat(item.price.split('/')[0]) * quantity).toFixed(0)})` : 'Request Reservation'}
              {type === 'food' ? <Plus size={20} className="group-hover:rotate-90 transition-transform" /> : <Send size={20} />}
            </button>
            <p className="text-center text-white/30 text-[10px] mt-4 uppercase tracking-[0.2em]">
              {type === 'food' ? 'Add multiple items to build your feast' : 'This will open WhatsApp to confirm with us'}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ActionModal;
