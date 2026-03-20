import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { StepIndicator } from '../components/checkout/StepIndicator';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { CouponSystem } from '../components/checkout/CouponSystem';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import { PINCODE_DATA } from '../data/pincodes';
import { CheckoutFormData, Order } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Zap, Info, ShoppingBag } from 'lucide-react';
import { cn } from '../lib/utils';

const STEPS = ['Contact', 'Address', 'Delivery', 'Summary'];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
  const { saveOrder } = useOrders();

  const [currentStep, setCurrentStep] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    alternatePhone: '',
    email: '',
    address: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    deliveryType: 'Standard',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  // Auto-fill city/state based on pincode
  useEffect(() => {
    if (formData.pincode.length === 6) {
      const data = PINCODE_DATA[formData.pincode];
      if (data) {
        setFormData(prev => ({ ...prev, city: data.city, state: data.state }));
        setErrors(prev => ({ ...prev, pincode: undefined }));
      } else {
        setErrors(prev => ({ ...prev, pincode: 'Invalid pincode for this demo' }));
      }
    }
  }, [formData.pincode]);

  // Update delivery charge
  useEffect(() => {
    setDeliveryCharge(formData.deliveryType === 'Express' ? 150 : 0);
  }, [formData.deliveryType]);

  const validateStep = (step: number) => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit phone number';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    }

    if (step === 1) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(0) || !validateStep(1)) {
      setCurrentStep(0);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newOrder: Order = {
      orderId: `ORD-${Date.now()}`,
      customerName: formData.fullName,
      phone: formData.phone,
      alternatePhone: formData.alternatePhone,
      email: formData.email,
      address: formData.address,
      landmark: formData.landmark,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      deliveryType: formData.deliveryType,
      notes: formData.notes,
      products: cart,
      subtotal,
      deliveryCharge,
      discount,
      totalAmount: subtotal + deliveryCharge - discount,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    saveOrder(newOrder);
    clearCart();
    setIsLoading(false);
    navigate('/orders');
  };

  const total = subtotal + deliveryCharge - discount;

  if (cart.length === 0 && currentStep !== STEPS.length - 1) {
    return (
      <Layout title="Checkout">
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-2xl font-black text-zinc-900">Your cart is empty</h2>
          <p className="text-zinc-500 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
          <Button onClick={() => window.location.reload()}>Refresh Demo Cart</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Checkout">
      <div className="space-y-8 pb-32">
        <StepIndicator steps={STEPS} currentStep={currentStep} />

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-6 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900">Contact Details</h3>
                <Input
                  label="Full Name"
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  error={errors.fullName}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number"
                    placeholder="10-digit number"
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    error={errors.phone}
                  />
                  <Input
                    label="Alternate Phone (Optional)"
                    placeholder="10-digit number"
                    type="tel"
                    maxLength={10}
                    value={formData.alternatePhone}
                    onChange={e => setFormData({ ...formData, alternatePhone: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
                <Input
                  label="Email Address"
                  placeholder="john@example.com"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                />
              </div>
              <Button onClick={handleNext} className="w-full" size="lg">Continue to Address</Button>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-6 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900">Delivery Address</h3>
                <Input
                  label="Address Line (House / Street / Area)"
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  error={errors.address}
                />
                <Input
                  label="Landmark (Optional)"
                  placeholder="e.g. Near Central Park"
                  value={formData.landmark}
                  onChange={e => setFormData({ ...formData, landmark: e.target.value })}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    label="Pincode"
                    placeholder="6-digit"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={e => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                    error={errors.pincode}
                  />
                  <Input
                    label="City"
                    placeholder="Auto-filled"
                    value={formData.city}
                    readOnly
                    className="bg-zinc-50"
                    error={errors.city}
                  />
                  <Input
                    label="State"
                    placeholder="Auto-filled"
                    value={formData.state}
                    readOnly
                    className="bg-zinc-50"
                    error={errors.state}
                  />
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl flex gap-3 items-start">
                  <Info size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Try entering <strong>110001</strong>, <strong>400001</strong>, or <strong>560001</strong> to see the auto-fill in action.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1">Back</Button>
                <Button onClick={handleNext} className="flex-[2]" size="lg">Continue to Delivery</Button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-6 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900">Delivery Options</h3>
                
                <div className="space-y-4">
                  <div
                    onClick={() => setFormData({ ...formData, deliveryType: 'Standard' })}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer",
                      formData.deliveryType === 'Standard' 
                        ? "border-emerald-500 bg-emerald-50/50" 
                        : "border-zinc-100 hover:border-zinc-200"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      formData.deliveryType === 'Standard' ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-500"
                    )}>
                      <Truck size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-zinc-900">Standard Delivery</p>
                      <p className="text-xs text-zinc-500">Delivered in 3-5 business days</p>
                    </div>
                    <p className="font-black text-emerald-600 text-sm uppercase tracking-widest">Free</p>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, deliveryType: 'Express' })}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer",
                      formData.deliveryType === 'Express' 
                        ? "border-emerald-500 bg-emerald-50/50" 
                        : "border-zinc-100 hover:border-zinc-200"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      formData.deliveryType === 'Express' ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-500"
                    )}>
                      <Zap size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-zinc-900">Express Delivery</p>
                      <p className="text-xs text-zinc-500">Delivered in 24-48 hours</p>
                    </div>
                    <p className="font-black text-zinc-900 text-sm">₹150</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 ml-1">Order Notes (Optional)</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 min-h-[100px]"
                    placeholder="e.g. Call before delivery"
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1">Back</Button>
                <Button onClick={handleNext} className="flex-[2]" size="lg">Review Order</Button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <OrderSummary
                products={cart}
                subtotal={subtotal}
                deliveryCharge={deliveryCharge}
                discount={discount}
                total={total}
              />
              <CouponSystem subtotal={subtotal} onApply={setDiscount} />
              
              <div className="bg-zinc-900 text-white rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex justify-between items-center">
                  <p className="text-zinc-400 text-sm font-medium">Final Amount</p>
                  <p className="text-2xl font-black">₹{total.toLocaleString('en-IN')}</p>
                </div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest text-center">
                  Secure Checkout • No Payment Required for Demo
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1">Back</Button>
                <Button 
                  onClick={handlePlaceOrder} 
                  className="flex-[2] bg-emerald-500 hover:bg-emerald-600" 
                  size="lg"
                  isLoading={isLoading}
                >
                  Place Order
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Mobile Button */}
        <div className="fixed bottom-20 left-0 right-0 p-4 md:hidden z-40 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent">
          {currentStep < 3 ? (
            <Button onClick={handleNext} className="w-full shadow-lg" size="lg">
              Next Step
            </Button>
          ) : (
            <Button 
              onClick={handlePlaceOrder} 
              className="w-full bg-emerald-500 hover:bg-emerald-600 shadow-lg" 
              size="lg"
              isLoading={isLoading}
            >
              Place Order • ₹{total.toLocaleString('en-IN')}
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
