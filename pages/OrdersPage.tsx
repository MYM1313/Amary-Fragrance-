import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalStore } from '../StoreContext';
import { Package, ChevronRight, Truck, Clock, CheckCircle2, ShoppingBag, MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

const OrdersPage: React.FC = () => {
  const { orders } = useGlobalStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-amber-500 bg-amber-50';
      case 'confirmed': return 'text-blue-500 bg-blue-50';
      case 'shipped': return 'text-indigo-500 bg-indigo-50';
      case 'out-for-delivery': return 'text-purple-500 bg-purple-50';
      case 'delivered': return 'text-emerald-500 bg-emerald-50';
      default: return 'text-brand-muted bg-brand-light';
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'pending': return 1;
      case 'confirmed': return 2;
      case 'shipped': return 3;
      case 'out-for-delivery': return 4;
      case 'delivered': return 5;
      default: return 0;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-brand-goldLight/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Package className="w-10 h-10 text-brand-gold" />
        </div>
        <h1 className="font-serif text-3xl mb-4">No orders yet</h1>
        <p className="text-brand-muted mb-8 font-sans">You haven't placed any orders with us yet. Start exploring our collection!</p>
        <Link to="/shop" className="inline-block bg-brand-dark text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-gold transition-all">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl mb-10">My Orders</h1>

      <div className="space-y-12">
        {orders.map((order) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-brand-goldLight/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Order Header */}
            <div className="p-6 md:p-8 bg-brand-light border-b border-brand-goldLight/10 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Order ID</p>
                <p className="font-bold tracking-widest text-brand-gold">{order.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Placed On</p>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Total Amount</p>
                <p className="font-bold text-lg">${order.total}</p>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                {order.status.replace(/-/g, ' ')}
              </div>
            </div>

            {/* Order Tracking UI */}
            <div className="p-6 md:p-8 bg-white border-b border-brand-goldLight/10">
              <div className="flex items-center justify-between max-w-2xl mx-auto relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-goldLight/20 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-brand-gold -translate-y-1/2 z-0 transition-all duration-1000" 
                  style={{ width: `${(getStatusStep(order.status) - 1) * 25}%` }}
                />
                
                {[
                  { icon: Clock, label: 'Pending' },
                  { icon: CheckCircle2, label: 'Confirmed' },
                  { icon: Truck, label: 'Shipped' },
                  { icon: ShoppingBag, label: 'Out for Delivery' },
                  { icon: MapPin, label: 'Delivered' }
                ].map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = getStatusStep(order.status) > idx;
                  const isCurrent = getStatusStep(order.status) === idx + 1;
                  
                  return (
                    <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive ? 'bg-brand-gold text-white scale-110 shadow-md' : 'bg-white text-brand-muted border border-brand-goldLight/30'
                      } ${isCurrent ? 'ring-4 ring-brand-goldLight/30' : ''}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[8px] uppercase tracking-widest font-bold hidden md:block ${isActive ? 'text-brand-dark' : 'text-brand-muted'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Content */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Items Ordered</h3>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-12 h-16 rounded-lg overflow-hidden bg-brand-light flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-[10px] text-brand-muted uppercase tracking-widest">
                          Qty: {item.quantity} {item.selectedVariant && `• ${item.selectedVariant}`}
                        </p>
                      </div>
                      <p className="text-sm font-bold">${item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Delivery Details</h3>
                <div className="p-4 bg-brand-light rounded-2xl space-y-2">
                  <p className="text-sm font-bold">{order.customer.name}</p>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {order.customer.address}<br />
                    {order.customer.city}, {order.customer.state} - {order.customer.pincode}<br />
                    {order.customer.phone}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-gold font-bold">
                    <Truck className="w-3 h-3" />
                    <span>{order.deliveryType} Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
