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
import AdminLogin from './pages/admin/AdminLogin.tsx';
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
  const { isAdminAuthenticated, loginAdmin, isLoading } = useGlobalStore();
  const [error, setError] = React.useState('');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const handleLogin = async (password: string) => {
    setIsLoggingIn(true);
    setError('');
    try {
      const success = await loginAdmin(password);
      if (!success) {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin mb-4"></div>
        <p className="font-serif text-xl text-brand-muted">Authenticating...</p>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <AdminLogin onLogin={handleLogin} error={error} />;
  }

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
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
