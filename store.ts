import { useState, useEffect } from 'react';
import { Product, CartItem, Order, Coupon } from './types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from './data';
import { supabase } from './supabaseClient';


// --- STORE LOGIC ---

export const useStore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [couponsLoaded, setCouponsLoaded] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Combined loading state
  useEffect(() => {
    // If we're an admin, we wait for everything. If not, we just wait for products and auth.
    if (isAdmin) {
      setIsLoading(!productsLoaded || !ordersLoaded || !couponsLoaded || !authLoaded);
    } else {
      setIsLoading(!productsLoaded || !authLoaded);
    }
  }, [productsLoaded, ordersLoaded, couponsLoaded, authLoaded, isAdmin]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const clearToast = () => setToast(null);
  
  // Products
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('amary_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);

  // Persistence (Local fallback for cart)
  useEffect(() => {
    localStorage.setItem('amary_cart', JSON.stringify(cart));
  }, [cart]);

  // Auth Listener
  useEffect(() => {
    // Supabase auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setIsAdmin(true); // Admin panel is public, so we set isAdmin to true
      setAuthLoaded(true);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch all data from Supabase on mount
  useEffect(() => {
    if (!authLoaded) return;

    const fetchData = async () => {
      try {
        // Products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*');
        if (productsError) throw productsError;
        setProducts(productsData || []);
        setProductsLoaded(true);

        // Coupons
        const { data: couponsData, error: couponsError } = await supabase
          .from('coupons')
          .select('*');
        if (couponsError) throw couponsError;
        setCoupons(couponsData || []);
        setCouponsLoaded(true);

        // Orders
        let query = supabase.from('orders').select('*');
        if (!isAdmin) {
          query = query.eq('customer->>email', user?.email);
        }
        const { data: ordersData, error: ordersError } = await query;
        if (ordersError) throw ordersError;
        setOrders(ordersData || []);
        setOrdersLoaded(true);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [isAdmin, user, authLoaded]);

  // --- ACTIONS ---

  const addToCart = (product: Product, quantity: number = 1, variant?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedVariant === variant);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedVariant === variant) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedVariant: variant }];
    });
  };

  const removeFromCart = (productId: string, variant?: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedVariant === variant)));
  };

  const updateCartQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      (item.id === productId && item.selectedVariant === variant) 
        ? { ...item, quantity } 
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const placeOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    try {
      const { error } = await supabase
        .from('orders')
        .insert([{
          id: newOrder.id,
          items: newOrder.items,
          total: newOrder.total,
          status: newOrder.status,
          customer: newOrder.customer,
          delivery_type: newOrder.deliveryType,
          payment_method: newOrder.paymentMethod,
          created_at: newOrder.createdAt
        }]);
      
      if (error) throw error;
      showToast('Order placed successfully!');
    } catch (err) {
      console.error('Error placing order:', err);
      showToast('Error placing order', 'error');
    }

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      
      if (error) throw error;
      showToast(`Order status updated to ${status}`);
    } catch (err) {
      console.error('Error updating order status:', err);
      showToast('Error updating order status', 'error');
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newProduct: Product = { ...product, id };

    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          id: newProduct.id,
          name: newProduct.name,
          tagline: newProduct.tagline,
          image: newProduct.image,
          accent_color: newProduct.accentColor,
          description: newProduct.description,
          story: newProduct.story,
          highlights: newProduct.highlights,
          details: newProduct.details,
          usage: newProduct.usage,
          gallery: newProduct.gallery,
          price: newProduct.price,
          category: newProduct.category,
          stock: newProduct.stock,
          variants: newProduct.variants,
          is_new: newProduct.isNew
        }]);
      
      if (error) throw error;
      showToast('Product added to inventory');
    } catch (err) {
      console.error('Error adding product:', err);
      showToast('Error adding product', 'error');
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: updatedProduct.name,
          tagline: updatedProduct.tagline,
          image: updatedProduct.image,
          accent_color: updatedProduct.accentColor,
          description: updatedProduct.description,
          story: updatedProduct.story,
          highlights: updatedProduct.highlights,
          details: updatedProduct.details,
          usage: updatedProduct.usage,
          gallery: updatedProduct.gallery,
          price: updatedProduct.price,
          category: updatedProduct.category,
          stock: updatedProduct.stock,
          variants: updatedProduct.variants,
          is_new: updatedProduct.isNew
        })
        .eq('id', updatedProduct.id);
      
      if (error) throw error;
      showToast('Product updated successfully');
    } catch (err) {
      console.error('Error updating product:', err);
      showToast('Error updating product', 'error');
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      showToast('Product removed from inventory');
    } catch (err) {
      console.error('Error deleting product:', err);
      showToast('Error deleting product', 'error');
    }
  };

  const addCoupon = async (coupon: Coupon) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .insert([{
          code: coupon.code,
          discount_percent: coupon.discountPercent,
          is_active: coupon.isActive
        }]);
      
      if (error) throw error;
      showToast('Coupon created successfully');
    } catch (err) {
      console.error('Error adding coupon:', err);
      showToast('Error adding coupon', 'error');
    }
  };

  const toggleCoupon = async (code: string) => {
    const coupon = coupons.find(c => c.code === code);
    if (!coupon) return;

    const newStatus = !coupon.isActive;
    try {
      const { error } = await supabase
        .from('coupons')
        .update({ is_active: newStatus })
        .eq('code', code);
      
      if (error) throw error;
      showToast(`Coupon ${code} ${newStatus ? 'activated' : 'deactivated'}`);
    } catch (err) {
      console.error('Error toggling coupon:', err);
      showToast('Error toggling coupon', 'error');
    }
  };

  const deleteCoupon = async (code: string) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('code', code);
      
      if (error) throw error;
      showToast('Coupon deleted');
    } catch (err) {
      console.error('Error deleting coupon:', err);
      showToast('Error deleting coupon', 'error');
    }
  };

  // Admin Auth
  return {
    isLoading,
    products,
    cart,
    orders,
    coupons,
    toast,
    clearToast,
    isAdminAuthenticated: isAdmin,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    placeOrder,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    addCoupon,
    toggleCoupon,
    deleteCoupon
  };
};
