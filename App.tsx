import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CheckoutPage from './src/pages/CheckoutPage.tsx';
import MyOrdersPage from './src/pages/MyOrdersPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<CheckoutPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
