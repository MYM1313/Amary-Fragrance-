import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalStore } from '../../StoreContext';
import { ShoppingBag, Search, ChevronLeft, Eye, Clock, Truck, CheckCircle2, Package, MapPin, Phone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../../types';

const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useGlobalStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const statusOptions: Order['status'][] = ['pending', 'confirmed', 'shipped', 'out-for-delivery', 'delivered'];

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="p-2 hover:bg-brand-light rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="font-serif text-4xl md:text-5xl mb-2">Orders</h1>
            <p className="text-brand-muted font-sans tracking-wide">Manage customer orders</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search by Order ID or Customer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-brand-goldLight/20 rounded-2xl focus:outline-none focus:border-brand-gold transition-all"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-brand-goldLight/20 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-light border-b border-brand-goldLight/10">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold">Order ID</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold">Customer</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold">Date</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold">Total</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-goldLight/10">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-brand-light/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm tracking-widest text-brand-gold">{order.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm">{order.customer.name}</p>
                    <p className="text-[10px] text-brand-muted uppercase tracking-widest">{order.customer.city}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-bold text-sm">${order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                      {order.status.replace(/-/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-brand-muted hover:text-brand-gold hover:bg-white rounded-xl transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="p-8 border-b border-brand-goldLight/10 flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                  <h2 className="font-serif text-2xl mb-1">Order Details</h2>
                  <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">{selectedOrder.id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-brand-light rounded-full transition-colors">
                  <ChevronLeft className="w-6 h-6 rotate-180" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Status Update */}
                <div className="p-6 bg-brand-light rounded-2xl">
                  <h3 className="text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-4">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map(status => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(selectedOrder.id, status)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          selectedOrder.status === status 
                          ? getStatusColor(status) + ' ring-2 ring-offset-2 ring-brand-gold' 
                          : 'bg-white text-brand-muted border border-brand-goldLight/20 hover:border-brand-gold'
                        }`}
                      >
                        {status.replace(/-/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Customer Info</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <User className="w-4 h-4 text-brand-gold" />
                        <span className="font-bold">{selectedOrder.customer.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-brand-gold" />
                        <span>{selectedOrder.customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-4 h-4 text-brand-gold flex items-center justify-center font-bold">@</span>
                        <span>{selectedOrder.customer.email}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-brand-gold mt-1" />
                        <span className="leading-relaxed">
                          {selectedOrder.customer.address}{selectedOrder.customer.landmark ? `, ${selectedOrder.customer.landmark}` : ''}<br />
                          {selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Items Total</span>
                        <span className="font-bold">${selectedOrder.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Delivery</span>
                        <span className="font-bold capitalize">{selectedOrder.deliveryType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Payment</span>
                        <span className="font-bold capitalize">{selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</span>
                      </div>
                      <div className="pt-4 border-t border-brand-goldLight/10 flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-brand-gold">${selectedOrder.total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Items List</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-brand-light rounded-2xl">
                        <div className="w-12 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOrders;
