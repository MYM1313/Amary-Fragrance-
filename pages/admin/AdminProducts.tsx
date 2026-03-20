import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalStore } from '../../StoreContext';
import { Package, Plus, Search, Edit2, Trash2, X, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../../types';

const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useGlobalStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    tagline: '',
    price: 0,
    category: 'Fragrance',
    stock: 0,
    description: '',
    story: '',
    image: 'https://picsum.photos/seed/new/800/1000',
    gallery: [],
    highlights: [],
    details: [],
    usage: '',
    variants: ['50ml', '100ml'],
    isNew: true
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        tagline: '',
        price: 0,
        category: 'Fragrance',
        stock: 0,
        description: '',
        story: '',
        image: 'https://picsum.photos/seed/new/800/1000',
        gallery: [],
        highlights: [],
        details: [],
        usage: '',
        variants: ['50ml', '100ml'],
        isNew: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({ ...formData, id: editingProduct.id });
    } else {
      addProduct(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/manage-fragrance" className="p-2 hover:bg-brand-light rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="font-serif text-4xl md:text-5xl mb-2">Products</h1>
            <p className="text-brand-muted font-sans tracking-wide">Manage your inventory</p>
          </div>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-gold transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-brand-goldLight/20 rounded-2xl focus:outline-none focus:border-brand-gold transition-all"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white border border-brand-goldLight/20 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-light border-b border-brand-goldLight/10">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold">Product</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold">Category</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold">Price</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold">Stock</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-goldLight/10">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-brand-light/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 rounded-lg overflow-hidden bg-brand-light flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{product.name}</p>
                        <p className="text-[10px] text-brand-muted uppercase tracking-widest">{product.tagline}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-3 py-1 bg-brand-goldLight/20 rounded-full text-brand-dark">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-brand-gold">${product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${product.stock < 10 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                      <span className="text-sm font-bold">{product.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-brand-muted hover:text-brand-gold hover:bg-white rounded-xl transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-brand-muted hover:text-red-500 hover:bg-white rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="p-8 border-b border-brand-goldLight/10 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="font-serif text-2xl">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-brand-light rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Product Name</label>
                    <input 
                      required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Tagline</label>
                    <input 
                      required type="text" value={formData.tagline} onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Price ($)</label>
                    <input 
                      required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Stock Quantity</label>
                    <input 
                      required type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Category</label>
                    <select 
                      value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none bg-white"
                    >
                      <option value="Fragrance">Fragrance</option>
                      <option value="Home">Home</option>
                      <option value="Body">Body</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Main Image URL</label>
                    <input 
                      required type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Description</label>
                  <textarea 
                    required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none h-24 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">The Story</label>
                  <textarea 
                    required value={formData.story} onChange={(e) => setFormData({...formData, story: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-brand-goldLight/30 focus:border-brand-gold outline-none h-24 resize-none italic"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" checked={formData.isNew} onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                      className="w-4 h-4 accent-brand-gold"
                    />
                    <span className="text-xs font-bold uppercase tracking-widest">Mark as New Arrival</span>
                  </label>
                </div>

                <div className="pt-6 border-t border-brand-goldLight/10 flex gap-4">
                  <button 
                    type="button" onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 border-2 border-brand-dark rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-dark hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-brand-dark text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-gold transition-all"
                  >
                    {editingProduct ? 'Save Changes' : 'Add Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
