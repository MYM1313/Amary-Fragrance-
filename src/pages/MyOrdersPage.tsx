import { Layout } from '../components/Layout';
import { OrderCard } from '../components/orders/OrderCard';
import { useOrders } from '../hooks/useOrders';
import { Package, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function MyOrdersPage() {
  const { orders } = useOrders();

  return (
    <Layout title="My Orders">
      <div className="space-y-6 pb-20">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-black text-zinc-400 uppercase tracking-widest">
            Recent Orders ({orders.length})
          </h2>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-white rounded-3xl border border-zinc-100 p-8">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300">
              <Package size={40} />
            </div>
            <h2 className="text-xl font-black text-zinc-900">No orders yet</h2>
            <p className="text-zinc-500 max-w-xs text-sm">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link to="/">
              <Button variant="primary" className="mt-4">
                Go to Checkout
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order: any) => (
              <OrderCard key={order.orderId} order={order} />
            ))}
          </div>
        )}

        {orders.length > 0 && (
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
              <ShoppingBag size={24} />
            </div>
            <div className="space-y-1">
              <p className="font-black text-emerald-900">Want to buy more?</p>
              <p className="text-xs text-emerald-700">Explore our latest collection and get 10% off with SAVE10</p>
            </div>
            <Link to="/" className="w-full">
              <Button variant="primary" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
