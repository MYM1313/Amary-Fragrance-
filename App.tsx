import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Hero from './components/Hero.tsx';
import Fragments from './components/Fragments.tsx';
import WhyAmary from './components/WhyAmary.tsx';
import Essence from './components/Essence.tsx';
import Reviews from './components/Reviews.tsx';
import Connect from './components/Connect.tsx';
import ShopPage from './pages/ShopPage.tsx';
import ProductDetailPage from './pages/ProductDetailPage.tsx';
import CartPage from './pages/CartPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import OrdersPage from './pages/OrdersPage.tsx';
import AdminDashboard from './pages/admin/AdminDashboard.tsx';
import AdminProducts from './pages/admin/AdminProducts.tsx';
import AdminOrders from './pages/admin/AdminOrders.tsx';
import AdminCoupons from './pages/admin/AdminCoupons.tsx';
import { StoreProvider } from './StoreContext.tsx';

const HomePage: React.FC = () => (
  <main>
    <Hero />
    <Fragments />
    <WhyAmary />
    <Reviews />
    <Essence />
    <Connect />
  </main>
);

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen bg-brand-light font-sans text-brand-dark overflow-x-hidden selection:bg-brand-gold selection:text-white">
          <Routes>
            {/* Admin Panel Routes (Separate - No Header/Footer) */}
            <Route path="/admin" element={<div className="min-h-screen bg-slate-50"><AdminDashboard /></div>} />
            <Route path="/admin/products" element={<div className="min-h-screen bg-slate-50"><AdminProducts /></div>} />
            <Route path="/admin/orders" element={<div className="min-h-screen bg-slate-50"><AdminOrders /></div>} />
            <Route path="/admin/coupons" element={<div className="min-h-screen bg-slate-50"><AdminCoupons /></div>} />

            {/* Main Website Routes (With Header/Footer) */}
            <Route path="/" element={<><Header /><HomePage /><Footer /></>} />
            <Route path="/shop" element={<><Header /><ShopPage /><Footer /></>} />
            <Route path="/product/:id" element={<><Header /><ProductDetailPage /><Footer /></>} />
            <Route path="/cart" element={<><Header /><CartPage /><Footer /></>} />
            <Route path="/checkout" element={<><Header /><CheckoutPage /><Footer /></>} />
            <Route path="/orders" element={<><Header /><OrdersPage /><Footer /></>} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
