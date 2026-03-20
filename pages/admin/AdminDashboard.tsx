import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../../StoreContext';
import { Package, ShoppingBag, TrendingUp, Clock, ChevronRight, LayoutDashboard, Settings, Tag, Database, CheckCircle2, XCircle, LogOut, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../../firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';

const AdminDashboard: React.FC = () => {
  const { products, orders, coupons, logoutAdmin, isLoading } = useGlobalStore();
  const navigate = useNavigate();
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="pt-40 pb-20 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin mb-4"></div>
        <p className="font-serif text-xl text-brand-muted">Preparing your dashboard...</p>
      </div>
    );
  }

  const testConnection = async () => {
    setTestStatus('testing');
    try {
      // Try to fetch one row from orders to test connection
      const q = query(collection(db, 'orders'), limit(1));
      await getDocs(q);
      
      setTestStatus('success');
      setTimeout(() => setTestStatus('idle'), 3000);
    } catch (err: any) {
      setTestStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred.');
    }
  };

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
    { label: 'Total Products', value: products.length, icon: Package, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Active Coupons', value: coupons.filter(c => c.isActive).length, icon: Tag, color: 'text-purple-600 bg-purple-50' }
  ];

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-serif text-4xl md:text-5xl">Admin Panel</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[10px] font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3" />
                Firebase Connected
              </div>
              
              <button 
                onClick={testConnection}
                disabled={testStatus === 'testing'}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${
                  testStatus === 'success' ? 'bg-emerald-500 text-white border-emerald-500' :
                  testStatus === 'error' ? 'bg-red-500 text-white border-red-500' :
                  'bg-white text-brand-dark border-brand-goldLight/20 hover:border-brand-gold'
                }`}
              >
                <RefreshCw className={`w-3 h-3 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
                {testStatus === 'testing' ? 'Testing...' : 
                 testStatus === 'success' ? 'Connection OK' : 
                 testStatus === 'error' ? 'Test Failed' : 'Test Connection'}
              </button>
            </div>
          </div>
          <p className="text-brand-muted font-sans tracking-wide">Manage your fragrance empire</p>
          {testStatus === 'error' && (
            <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errorMessage}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLogout}
            className="p-4 bg-white border border-brand-goldLight/20 text-brand-dark rounded-2xl hover:border-brand-gold transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <div className="flex items-center gap-4 p-4 bg-brand-dark text-white rounded-2xl">
            <TrendingUp className="w-6 h-6 text-brand-gold" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Total Revenue</p>
              <p className="text-xl font-bold">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-white border border-brand-goldLight/20 rounded-3xl shadow-sm"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Link to="/admin/products" className="p-6 bg-brand-light border border-brand-goldLight/20 rounded-3xl hover:border-brand-gold transition-all group">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-6 h-6 text-brand-gold" />
            <ChevronRight className="w-4 h-4 text-brand-muted group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold uppercase tracking-widest text-xs">Manage Products</h3>
        </Link>
        <Link to="/admin/orders" className="p-6 bg-brand-light border border-brand-goldLight/20 rounded-3xl hover:border-brand-gold transition-all group">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-6 h-6 text-brand-gold" />
            <ChevronRight className="w-4 h-4 text-brand-muted group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold uppercase tracking-widest text-xs">Manage Orders</h3>
        </Link>
        <Link to="/admin/coupons" className="p-6 bg-brand-light border border-brand-goldLight/20 rounded-3xl hover:border-brand-gold transition-all group">
          <div className="flex items-center justify-between mb-4">
            <Tag className="w-6 h-6 text-brand-gold" />
            <ChevronRight className="w-4 h-4 text-brand-muted group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold uppercase tracking-widest text-xs">Manage Coupons</h3>
        </Link>
        <div className="p-6 bg-brand-light border border-brand-goldLight/20 rounded-3xl opacity-50 cursor-not-allowed">
          <div className="flex items-center justify-between mb-4">
            <Settings className="w-6 h-6 text-brand-gold" />
            <ChevronRight className="w-4 h-4 text-brand-muted" />
          </div>
          <h3 className="font-bold uppercase tracking-widest text-xs">Settings</h3>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 bg-white border border-brand-goldLight/20 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-brand-gold underline underline-offset-4">View All</Link>
          </div>
          <div className="space-y-4">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-brand-light rounded-2xl">
                <div>
                  <p className="text-sm font-bold">{order.id}</p>
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest">{order.customer.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">${order.total}</p>
                  <p className="text-[10px] text-brand-gold uppercase tracking-widest font-bold">{order.status}</p>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-center py-8 text-brand-muted text-sm">No orders yet.</p>
            )}
          </div>
        </div>

        <div className="p-8 bg-white border border-brand-goldLight/20 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl">Low Stock Alert</h2>
            <Link to="/admin/products" className="text-xs text-brand-gold underline underline-offset-4">View All</Link>
          </div>
          <div className="space-y-4">
            {products.filter(p => p.stock < 10).map(product => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-brand-light rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-white">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{product.name}</p>
                    <p className="text-[10px] text-brand-muted uppercase tracking-widest">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${product.stock < 5 ? 'text-red-500' : 'text-amber-500'}`}>
                    {product.stock} left
                  </p>
                </div>
              </div>
            ))}
            {products.filter(p => p.stock < 10).length === 0 && (
              <p className="text-center py-8 text-brand-muted text-sm">All products are well stocked.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
