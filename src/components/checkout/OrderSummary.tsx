import { formatCurrency } from '../../lib/utils';
import { CartItem } from '../../types';

interface OrderSummaryProps {
  products: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
}

export function OrderSummary({ products, subtotal, deliveryCharge, discount, total }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-6 shadow-sm">
      <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-50 pb-4">
        Order Summary
      </h3>
      
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {products.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-0 right-0 bg-zinc-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-lg">
                x{item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 truncate">
                {item.name}
              </p>
              <p className="text-xs text-zinc-500">
                {formatCurrency(item.price)}
              </p>
            </div>
            <p className="text-sm font-bold text-zinc-900">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t border-zinc-50">
        <div className="flex justify-between text-sm text-zinc-500">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-500">
          <span>Delivery Charges</span>
          <span className="text-emerald-600 font-medium">
            {deliveryCharge === 0 ? 'FREE' : formatCurrency(deliveryCharge)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600 font-medium">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-black text-zinc-900 pt-2 border-t border-zinc-100">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
