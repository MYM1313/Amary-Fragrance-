import React, { useState, useMemo } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useGlobalStore } from '../StoreContext';
import { ChevronRight, ChevronLeft, CheckCircle2, Truck, CreditCard, Tag, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, coupons, placeOrder } = useGlobalStore();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = deliveryType === 'express' ? 50 : (subtotal > 500 ? 0 : 25);
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal + shipping - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase() && c.isActive);
    if (coupon) {
      setAppliedCoupon({ code: coupon.code, discount: coupon.discountPercent });
      setCouponCode('');
    } else {
      alert('Invalid or expired coupon code');
    }
  };

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const order = await placeOrder({
      items: cart,
      total,
      customer: formData,
      deliveryType,
      paymentMethod
    });
    
    setOrderSuccess(order.id);
    setIsPlacing(false);
  };

  if (cart.length === 0 && !orderSuccess) {
    return <Navigate to="/cart" replace />;
  }

  if (orderSuccess) {
    return (
      <div className="pt-32 pb-20 px-4 text-center max-w-lg mx-auto">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </motion.div>
        <h1 className="font-serif text-4xl mb-4">Order Placed!</h1>
        <p className="text-brand-muted mb-2 font-sans">Thank you for your purchase. Your order ID is:</p>
        <p className="text-brand-gold font-bold text-xl mb-8 tracking-widest">{orderSuccess}</p>
        <div className="space-y-4">
          <Link to="/orders" className="block w-full bg-brand-dark text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-gold transition-all">
            Track My Order
          </Link>
          <Link to="/shop" className="block w-full border-2 border-brand-dark py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-dark hover:text-white transition-all">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Checkout Flow */}
        <div className="flex-1">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-12 max-w-md mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-goldLight/20 -translate-y-1/2 z-0" />
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                  step >= s ? 'bg-brand-gold text-white scale-110 shadow-lg' : 'bg-white text-brand-muted border border-brand-goldLight/30'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="font-serif text-3xl mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Full Name *</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Email *</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Phone Number *</label>
                    <input 
                      type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none transition-all"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Landmark (Optional)</label>
                    <input 
                      type="text" name="landmark" value={formData.landmark} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none transition-all"
                      placeholder="Near Central Park"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Address *</label>
                    <input 
                      type="text" name="address" value={formData.address} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none transition-all"
                      placeholder="Street, Building, Apartment"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">City *</label>
                    <input 
                      type="text" name="city" value={formData.city} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none transition-all"
                      placeholder="New York"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">State *</label>
                      <input 
                        type="text" name="state" value={formData.state} onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none transition-all"
                        placeholder="NY"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Pincode *</label>
                      <input 
                        type="text" name="pincode" value={formData.pincode} onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none transition-all"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode}
                  className="w-full py-4 bg-brand-dark text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-gold transition-all disabled:opacity-50"
                >
                  Continue to Delivery & Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="font-serif text-3xl mb-6">Delivery & Payment Options</h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest text-brand-muted font-bold">Delivery Method</h3>
                    <button 
                      onClick={() => setDeliveryType('standard')}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                        deliveryType === 'standard' ? 'border-brand-gold bg-brand-goldLight/10' : 'border-brand-goldLight/20 hover:border-brand-gold'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${deliveryType === 'standard' ? 'border-brand-gold' : 'border-brand-muted'}`}>
                        {deliveryType === 'standard' && <div className="w-3 h-3 rounded-full bg-brand-gold" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">Standard Delivery</p>
                        <p className="text-xs text-brand-muted">3-5 Business Days</p>
                      </div>
                      <p className="font-bold">{subtotal > 500 ? 'FREE' : '$25'}</p>
                    </button>
                    <button 
                      onClick={() => setDeliveryType('express')}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                        deliveryType === 'express' ? 'border-brand-gold bg-brand-goldLight/10' : 'border-brand-goldLight/20 hover:border-brand-gold'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${deliveryType === 'express' ? 'border-brand-gold' : 'border-brand-muted'}`}>
                        {deliveryType === 'express' && <div className="w-3 h-3 rounded-full bg-brand-gold" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">Express Delivery</p>
                        <p className="text-xs text-brand-muted">1-2 Business Days</p>
                      </div>
                      <p className="font-bold">$50</p>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest text-brand-muted font-bold">Payment Method</h3>
                    <button 
                      onClick={() => setPaymentMethod('cod')}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                        paymentMethod === 'cod' ? 'border-brand-gold bg-brand-goldLight/10' : 'border-brand-goldLight/20 hover:border-brand-gold'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-brand-gold' : 'border-brand-muted'}`}>
                        {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-brand-gold" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">Cash on Delivery</p>
                        <p className="text-xs text-brand-muted">Pay when you receive</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('online')}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                        paymentMethod === 'online' ? 'border-brand-gold bg-brand-goldLight/10' : 'border-brand-goldLight/20 hover:border-brand-gold'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'online' ? 'border-brand-gold' : 'border-brand-muted'}`}>
                        {paymentMethod === 'online' && <div className="w-3 h-3 rounded-full bg-brand-gold" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">Online Payment</p>
                        <p className="text-xs text-brand-muted">Credit Card, UPI, Net Banking</p>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 border-2 border-brand-dark rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-dark hover:text-white transition-all">
                    Back
                  </button>
                  <button onClick={() => setStep(3)} className="flex-1 py-4 bg-brand-dark text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-gold transition-all">
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="font-serif text-3xl mb-6">Review & Place Order</h2>
                
                <div className="p-6 bg-white border border-brand-goldLight/20 rounded-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs uppercase tracking-widest text-brand-muted font-bold">Shipping To</h3>
                    <button onClick={() => setStep(1)} className="text-xs text-brand-gold underline">Edit</button>
                  </div>
                  <p className="text-sm font-bold">{formData.name}</p>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {formData.address}{formData.landmark ? `, ${formData.landmark}` : ''}<br />
                    {formData.city}, {formData.state} - {formData.pincode}<br />
                    {formData.phone} | {formData.email}
                  </p>
                </div>

                <div className="p-6 bg-white border border-brand-goldLight/20 rounded-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs uppercase tracking-widest text-brand-muted font-bold">Delivery & Payment</h3>
                    <button onClick={() => setStep(2)} className="text-xs text-brand-gold underline">Edit</button>
                  </div>
                  <p className="text-sm font-bold capitalize">{deliveryType} Delivery</p>
                  <p className="text-sm text-brand-muted capitalize">Payment: {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 py-4 border-2 border-brand-dark rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-dark hover:text-white transition-all">
                    Back
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isPlacing}
                    className="flex-1 py-4 bg-brand-gold text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
                  >
                    {isPlacing ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Place Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96">
          <div className="p-8 bg-white border border-brand-goldLight/20 rounded-3xl sticky top-24">
            <h2 className="font-serif text-2xl mb-6">Summary</h2>
            
            <div className="max-h-60 overflow-y-auto no-scrollbar mb-6 space-y-4">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedVariant}`} className="flex gap-3">
                  <div className="w-12 h-16 rounded-lg overflow-hidden bg-brand-light flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{item.name}</p>
                    <p className="text-[10px] text-brand-muted uppercase tracking-widest">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="mb-6 pt-6 border-t border-brand-goldLight/10">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2 bg-brand-light border border-brand-goldLight/30 rounded-xl text-sm outline-none focus:border-brand-gold"
                />
                <button 
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-brand-dark text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-all"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <div className="mt-2 flex items-center justify-between bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    <span className="font-bold">{appliedCoupon.code} Applied</span>
                  </div>
                  <button onClick={() => setAppliedCoupon(null)} className="underline">Remove</button>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-6 border-t border-brand-goldLight/10">
              <div className="flex justify-between text-sm">
                <span className="text-brand-muted">Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-muted">Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-sm text-emerald-600 font-bold">
                  <span>Discount ({appliedCoupon.discount}%)</span>
                  <span>-${discount}</span>
                </div>
              )}
              <div className="pt-4 border-t border-brand-goldLight/10 flex justify-between items-end">
                <span className="font-serif text-lg">Total</span>
                <span className="text-2xl font-bold text-brand-gold">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
