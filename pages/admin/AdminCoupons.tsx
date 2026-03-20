import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalStore } from '../../StoreContext';
import { Tag, Plus, Trash2, X, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Coupon } from '../../types';

const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon } = useGlobalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Coupon>({
    code: '',
    discountPercent: 0,
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupons.some(c => c.code.toUpperCase() === formData.code.toUpperCase())) {
      alert('Coupon code already exists');
      return;
    }
    addCoupon({ ...formData, code: formData.code.toUpperCase() });
    setIsModalOpen(false);
    setFormData({ code: '', discountPercent: 0, isActive: true });
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="p-2 hover:bg-brand-light rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="font-serif text-4xl md:text-5xl mb-2">Coupons</h1>
            <p className="text-brand-muted font-sans tracking-wide">Manage promotional codes</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-gold transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <motion.div 
            layout
            key={coupon.code}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-8 rounded-3xl border-2 transition-all relative overflow-hidden group ${
              coupon.isActive ? 'border-brand-gold bg-white' : 'border-brand-goldLight/20 bg-brand-light opacity-60'
            }`}
          >
            <div className="absolute top-0 right-0 p-4 flex gap-2">
              <button 
                onClick={() => toggleCoupon(coupon.code)}
                className={`p-2 rounded-xl transition-all ${
                  coupon.isActive ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                }`}
              >
                {coupon.isActive ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => deleteCoupon(coupon.code)}
                className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${coupon.isActive ? 'bg-brand-gold text-white' : 'bg-brand-muted text-white'}`}>
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Discount Code</p>
                <h3 className="text-2xl font-bold tracking-widest">{coupon.code}</h3>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">Benefit</p>
                <p className="text-3xl font-bold text-brand-gold">{coupon.discountPercent}% OFF</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                coupon.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {coupon.isActive ? 'Active' : 'Disabled'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-brand-goldLight/10 flex items-center justify-between">
                <h2 className="font-serif text-2xl">Create Coupon</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-brand-light rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Coupon Code</label>
                  <input 
                    required type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none uppercase tracking-widest"
                    placeholder="E.G. SUMMER50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Discount Percentage (%)</label>
                  <input 
                    required type="number" min="1" max="100" value={formData.discountPercent} onChange={(e) => setFormData({...formData, discountPercent: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none"
                    placeholder="10"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                      className="w-4 h-4 accent-brand-gold"
                    />
                    <span className="text-xs font-bold uppercase tracking-widest">Enable Immediately</span>
                  </label>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button" onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 border-2 border-brand-dark rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-dark hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-brand-dark text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-gold transition-all"
                  >
                    Create Coupon
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCoupons;
