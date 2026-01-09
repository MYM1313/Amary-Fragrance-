import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Collection from './components/Collection.tsx';
import Fragments from './components/Fragments.tsx';
import WhyAmary from './components/WhyAmary.tsx';
import Essence from './components/Essence.tsx';
import Reviews from './components/Reviews.tsx';
import Connect from './components/Connect.tsx';
import Footer from './components/Footer.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import { Product } from './types.ts';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-dark overflow-x-hidden selection:bg-brand-gold selection:text-white">
      <Header />
      <main>
        <Hero />
        <Fragments />
        <Collection onSelectProduct={setSelectedProduct} />
        <WhyAmary />
        <Reviews />
        <Essence />
        <Connect />
      </main>
      <Footer />

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default App;