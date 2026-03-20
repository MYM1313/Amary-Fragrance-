import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../StoreContext';
import { ShoppingBag, ChevronLeft, ChevronRight, Star, Truck, ShieldCheck, RefreshCw, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useGlobalStore();
  
  const product = useMemo(() => products.find(p => p.id === id), [products, id]);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-serif text-3xl mb-4">Product not found</h1>
        <Link to="/shop" className="text-brand-gold underline underline-offset-4">Back to Collection</Link>
      </div>
    );
  }

  const images = [product.image, ...(product.gallery || [])];

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity, selectedVariant);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    navigate('/checkout');
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <Link to="/shop" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors mb-8 text-sm group">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Collection</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand-light">
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                src={images[selectedImage]} 
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button 
                  onClick={() => setSelectedImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-brand-dark pointer-events-auto hover:bg-brand-gold hover:text-white transition-all shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-brand-dark pointer-events-auto hover:bg-brand-gold hover:text-white transition-all shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === idx ? 'border-brand-gold scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-brand-muted">48 Reviews</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mb-2">{product.name}</h1>
            <p className="text-brand-gold font-sans font-bold text-2xl">${product.price}</p>
          </div>

          <p className="text-brand-muted leading-relaxed mb-8 font-sans">
            {product.description}
          </p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-8">
              <h3 className="text-[10px] uppercase tracking-widest text-brand-muted mb-4">Select Volume</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map(variant => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-6 py-2 rounded-full text-sm transition-all border ${
                      selectedVariant === variant 
                      ? 'bg-brand-dark text-white border-brand-dark' 
                      : 'bg-white text-brand-dark border-brand-goldLight/30 hover:border-brand-gold'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-6">
              <div className="flex items-center border border-brand-goldLight/30 rounded-full px-4 py-2 bg-white">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1 hover:text-brand-gold transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-1 hover:text-brand-gold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-brand-muted">
                {product.stock > 0 ? (
                  <span className="text-emerald-600 font-bold">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-500 font-bold">Out of Stock</span>
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`flex-1 relative overflow-hidden py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 ${
                  isAdding 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-brand-dark text-white hover:bg-brand-gold'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <AnimatePresence mode="wait">
                  {isAdding ? (
                    <motion.span 
                      key="added"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                    >
                      Added to Cart!
                    </motion.span>
                  ) : (
                    <motion.div 
                      key="add"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <button 
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 py-4 rounded-2xl border-2 border-brand-dark font-bold uppercase tracking-widest text-sm hover:bg-brand-dark hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-goldLight/20">
            <div className="text-center">
              <Truck className="w-5 h-5 mx-auto mb-2 text-brand-gold" />
              <p className="text-[10px] uppercase tracking-widest font-bold">Free Shipping</p>
            </div>
            <div className="text-center">
              <ShieldCheck className="w-5 h-5 mx-auto mb-2 text-brand-gold" />
              <p className="text-[10px] uppercase tracking-widest font-bold">Secure Payment</p>
            </div>
            <div className="text-center">
              <RefreshCw className="w-5 h-5 mx-auto mb-2 text-brand-gold" />
              <p className="text-[10px] uppercase tracking-widest font-bold">Easy Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Story & Details */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-serif text-3xl mb-6">The Story</h2>
          <p className="text-brand-muted leading-relaxed font-sans italic">
            "{product.story}"
          </p>
        </div>
        <div>
          <h2 className="font-serif text-3xl mb-6">Details</h2>
          <ul className="space-y-3">
            {product.details.map((detail, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-brand-muted">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
