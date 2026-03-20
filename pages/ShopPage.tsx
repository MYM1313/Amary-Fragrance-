import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalStore } from '../StoreContext';
import { Search, Filter, ChevronDown, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ShopPage: React.FC = () => {
  const { products, addToCart, isLoading } = useGlobalStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);
  const maxPrice = useMemo(() => Math.max(500, ...products.map(p => p.price)), [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

  // Update price range when maxPrice changes
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  if (isLoading) {
    return (
      <div className="pt-40 pb-20 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin mb-4"></div>
        <p className="font-serif text-xl text-brand-muted">Curating our collection...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl mb-2">The Collection</h1>
          <p className="text-brand-muted font-sans tracking-wide">Explore our handcrafted fragrances</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search scents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-brand-goldLight/30 rounded-full focus:outline-none focus:border-brand-gold text-sm"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-goldLight/30 rounded-full text-sm hover:border-brand-gold transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <div className="relative group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 bg-white border border-brand-goldLight/30 rounded-full text-sm focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="p-6 bg-white border border-brand-goldLight/20 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-serif text-lg mb-4">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                        selectedCategory === cat 
                        ? 'bg-brand-gold text-white' 
                        : 'bg-brand-light text-brand-dark hover:bg-brand-goldLight/30'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-serif text-lg mb-4">Price Range</h3>
                <div className="px-2">
                  <input 
                    type="range" 
                    min="0" 
                    max={maxPrice} 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-brand-gold"
                  />
                  <div className="flex justify-between mt-2 text-xs text-brand-muted">
                    <span>$0</span>
                    <span>Up to ${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-end">
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, 500]);
                    setSearchQuery('');
                  }}
                  className="text-xs text-brand-gold underline underline-offset-4"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <motion.div 
            layout
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-light mb-4">
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-brand-gold text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                  New Arrival
                </span>
              )}
              <button 
                onClick={() => addToCart(product, 1, product.variants?.[0])}
                className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-brand-dark py-3 rounded-xl opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center gap-2 hover:bg-brand-gold hover:text-white"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Add to Cart</span>
              </button>
            </div>
            
            <Link to={`/product/${product.id}`} className="block">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-xl group-hover:text-brand-gold transition-colors">{product.name}</h3>
                  <p className="text-xs text-brand-muted uppercase tracking-widest mt-1">{product.tagline}</p>
                </div>
                <span className="font-sans font-bold text-brand-gold">${product.price}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-brand-muted font-serif text-xl">No scents found matching your criteria.</p>
          <button 
            onClick={() => {
              setSelectedCategory('All');
              setPriceRange([0, 500]);
              setSearchQuery('');
            }}
            className="mt-4 text-brand-gold underline underline-offset-4"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
