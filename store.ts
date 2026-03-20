import { useState, useEffect } from 'react';
import { Product, CartItem, Order, Coupon } from './types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from './data';
import { supabase, isSupabaseConfigured } from './src/lib/supabase';

// --- STORE LOGIC ---

export const useStore = () => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('amary_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('amary_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('amary_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('amary_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('amary_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('amary_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('amary_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('amary_coupons', JSON.stringify(coupons));
  }, [coupons]);

  // Fetch orders from Supabase on mount
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      const fetchOrders = async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!error && data) {
          const mappedOrders: Order[] = data.map(dbOrder => ({
            id: dbOrder.id,
            items: dbOrder.items,
            total: dbOrder.total,
            status: dbOrder.status,
            customer: {
              name: dbOrder.customer_name,
              phone: dbOrder.customer_phone,
              email: dbOrder.customer_email,
              address: dbOrder.customer_address,
              landmark: dbOrder.customer_landmark || undefined,
              city: dbOrder.customer_city,
              state: dbOrder.customer_state,
              pincode: dbOrder.customer_pincode
            },
            deliveryType: dbOrder.delivery_type,
            paymentMethod: dbOrder.payment_method,
            createdAt: dbOrder.created_at
          }));
          setOrders(mappedOrders);
        }
      };
      fetchOrders();
    }
  }, []);

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

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('orders').insert([{
          id: newOrder.id,
          items: newOrder.items,
          total: newOrder.total,
          status: newOrder.status,
          customer_name: newOrder.customer.name,
          customer_phone: newOrder.customer.phone,
          customer_email: newOrder.customer.email,
          customer_address: newOrder.customer.address,
          customer_landmark: newOrder.customer.landmark || null,
          customer_city: newOrder.customer.city,
          customer_state: newOrder.customer.state,
          customer_pincode: newOrder.customer.pincode,
          delivery_type: newOrder.deliveryType,
          payment_method: newOrder.paymentMethod,
          created_at: newOrder.createdAt
        }]);
        
        if (error) {
          console.error("Supabase insert error:", error);
        }
      } catch (err) {
        console.error("Supabase insert exception:", err);
      }
    }

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').update({ status }).eq('id', orderId);
      } catch (err) {
        console.error("Supabase update exception:", err);
      }
    }
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9)
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [...prev, coupon]);
  };

  const toggleCoupon = (code: string) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, isActive: !c.isActive } : c));
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  return {
    products,
    cart,
    orders,
    coupons,
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
