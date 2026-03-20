import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Hero from './components/Hero.tsx';
import Fragments from './components/Fragments.tsx';
import WhyAmary from './components/WhyAmary.tsx';
import Essence from './components/Essence.tsx';
import Reviews from './components/Reviews.tsx';
import Connect from './components/Connect.tsx';
import Toast from './components/Toast.tsx';
import ShopPage from './pages/ShopPage.tsx';
import ProductDetailPage from './pages/ProductDetailPage.tsx';
import CartPage from './pages/CartPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import OrdersPage from './pages/OrdersPage.tsx';
import AdminDashboard from './pages/admin/AdminDashboard.tsx';
import AdminProducts from './pages/admin/AdminProducts.tsx';
import AdminOrders from './pages/admin/AdminOrders.tsx';
import AdminCoupons from './pages/admin/AdminCoupons.tsx';
import { StoreProvider, useGlobalStore } from './StoreContext.tsx';

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

const AdminRoutes: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/coupons" element={<AdminCoupons />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

const AppContent: React.FC = () => {
  const { toast, clearToast } = useGlobalStore();

  return (
    <Router>
      <div className="min-h-screen bg-brand-light font-sans text-brand-dark overflow-x-hidden selection:bg-brand-gold selection:text-white">
        <Routes>
          {/* Admin Panel Routes (Separate) */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Main Website Routes */}
          <Route path="/*" element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </>
          } />
        </Routes>

        <AnimatePresence>
          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={clearToast} 
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
