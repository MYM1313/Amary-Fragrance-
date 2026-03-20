import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Package, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
}

export function Layout({ children, title, showBack }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 pb-24 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-4 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && (
              <Link
                to={location.pathname === '/checkout' ? '/' : '/checkout'}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </Link>
            )}
            <h1 className="text-xl font-black tracking-tight text-zinc-900">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <ShoppingBag size={18} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-6 py-3 flex justify-around items-center md:hidden z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <Link
          to="/"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            location.pathname === '/' ? "text-emerald-600" : "text-zinc-400"
          )}
        >
          <ShoppingBag size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Checkout</span>
        </Link>
        <Link
          to="/orders"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            location.pathname === '/orders' ? "text-emerald-600" : "text-zinc-400"
          )}
        >
          <Package size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">My Orders</span>
        </Link>
      </nav>
    </div>
  );
}
