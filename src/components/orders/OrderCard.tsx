import { formatCurrency, cn } from '../../lib/utils';
import { Order } from '../../types';
import { TrackingProgress } from './TrackingProgress';
import { Calendar, Package, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div 
        className="p-5 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Order ID
            </p>
            <p className="text-sm font-bold text-zinc-900">
              #{order.orderId.slice(-8).toUpperCase()}
            </p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Total Amount
            </p>
            <p className="text-sm font-black text-emerald-600">
              {formatCurrency(order.totalAmount)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-zinc-400" />
            {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div>
          <div className="flex items-center gap-1.5">
            <Package size={14} className="text-zinc-400" />
            {order.products.length} {order.products.length === 1 ? 'Item' : 'Items'}
          </div>
          <div className="ml-auto">
            <ChevronRight 
              size={18} 
              className={cn(
                "text-zinc-400 transition-transform duration-300",
                isExpanded && "rotate-90"
              )} 
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-zinc-50 overflow-hidden"
          >
            <div className="p-5 space-y-6 bg-zinc-50/50">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  Order Status
                </p>
                <TrackingProgress currentStatus={order.status} />
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  Items Ordered
                </p>
                <div className="space-y-3">
                  {order.products.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-white p-2 rounded-xl border border-zinc-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-zinc-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-zinc-500">
                          Qty: {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  Delivery Address
                </p>
                <div className="bg-white p-3 rounded-xl border border-zinc-100 text-xs text-zinc-600 leading-relaxed">
                  <p className="font-bold text-zinc-900 mb-1">{order.customerName}</p>
                  <p>{order.address}</p>
                  {order.landmark && <p>Landmark: {order.landmark}</p>}
                  <p>{order.city}, {order.state} - {order.pincode}</p>
                  <p className="mt-1 font-medium text-zinc-900">Phone: {order.phone}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
