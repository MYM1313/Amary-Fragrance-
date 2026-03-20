import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../StoreContext';
import { Trash2, ShoppingBag, Minus, Plus, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity } = useGlobalStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-brand-goldLight/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="w-10 h-10 text-brand-gold" />
        </div>
        <h1 className="font-serif text-3xl mb-4">Your cart is empty</h1>
        <p className="text-brand-muted mb-8 font-sans">Looks like you haven't added any scents to your collection yet.</p>
        <Link to="/shop" className="inline-block bg-brand-dark text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-gold transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-serif text-4xl md:text-5xl">Your Cart</h1>
        <Link to="/shop" className="text-sm text-brand-gold flex items-center gap-2 hover:underline underline-offset-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div 
                layout
                key={`${item.id}-${item.selectedVariant}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-4 md:gap-6 p-4 md:p-6 bg-white border border-brand-goldLight/20 rounded-3xl group"
              >
                <div className="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden bg-brand-light">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl mb-1">{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-brand-muted mb-2">
                        {item.tagline} {item.selectedVariant && `• ${item.selectedVariant}`}
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedVariant)}
                      className="p-2 text-brand-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-brand-goldLight/30 rounded-full px-3 py-1 bg-brand-light">
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1, item.selectedVariant)}
                        className="p-1 hover:text-brand-gold transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1, item.selectedVariant)}
                        className="p-1 hover:text-brand-gold transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-sans font-bold text-brand-gold text-lg">${item.price * item.quantity}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="p-8 bg-brand-dark text-white rounded-3xl sticky top-24">
            <h2 className="font-serif text-2xl mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-brand-muted">
                <span>Subtotal</span>
                <span className="text-white">${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-brand-muted">
                <span>Shipping</span>
                <span className="text-white">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-brand-gold tracking-widest uppercase">
                  Add ${500 - subtotal} more for free shipping
                </p>
              )}
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-lg font-serif">Total</span>
                <span className="text-2xl font-bold text-brand-gold">${total}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-brand-gold text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-all flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-8 space-y-3">
              <p className="text-[10px] text-brand-muted uppercase tracking-widest text-center">We Accept</p>
              <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
