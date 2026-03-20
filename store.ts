import { useState, useEffect } from 'react';
import { Product, CartItem, Order, Coupon } from './types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from './data';
import { db, auth } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where,
  orderBy, 
  getDoc,
  getDocs,
  getDocFromServer
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';

// --- ERROR HANDLING ---

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

// --- STORE LOGIC ---

export const useStore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [couponsLoaded, setCouponsLoaded] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  const [user, setUser] = useState<User | null>(null);
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

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    const errInfo: FirestoreErrorInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth.currentUser?.uid || '',
        email: auth.currentUser?.email || '',
        emailVerified: auth.currentUser?.emailVerified || false,
        isAnonymous: auth.currentUser?.isAnonymous || false,
        tenantId: auth.currentUser?.tenantId || '',
        providerInfo: auth.currentUser?.providerData.map(provider => ({
          providerId: provider.providerId,
          displayName: provider.displayName || '',
          email: provider.email || '',
          photoUrl: provider.photoURL || ''
        })) || []
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    showToast(`Error: ${errInfo.error}`, 'error');
    throw new Error(JSON.stringify(errInfo));
  };
  
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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if admin
        const adminEmail = "valuemoney77@gmail.com";
        // During development/preview, we might want to be more lenient with emailVerified
        // but for now we'll stick to the email check.
        if (currentUser.email === adminEmail) {
          setIsAdmin(true);
        } else {
          // Check users collection for role
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } catch (err) {
            console.error("Error checking admin role:", err);
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setAuthLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  // Fetch all data from Firestore on mount
  useEffect(() => {
    if (!authLoaded) return;

    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. ");
        }
      }
    };
    testConnection();

    // Products Listener
    const unsubscribeProducts = onSnapshot(collection(db, 'products'), async (snapshot) => {
      const productsData = snapshot.docs.map(doc => doc.data() as Product);
      
      if (productsData.length === 0 && isAdmin) {
        // Seed products if empty and user is admin
        try {
          for (const product of INITIAL_PRODUCTS) {
            await setDoc(doc(db, 'products', product.id), product);
          }
        } catch (err) {
          console.error("Error seeding products:", err);
        }
      } else {
        setProducts(productsData);
      }
      setProductsLoaded(true);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
      setProductsLoaded(true);
    });

    // Coupons Listener
    const unsubscribeCoupons = onSnapshot(collection(db, 'coupons'), async (snapshot) => {
      const couponsData = snapshot.docs.map(doc => doc.data() as Coupon);
      
      if (couponsData.length === 0 && isAdmin) {
        // Seed coupons if empty and user is admin
        try {
          for (const coupon of INITIAL_COUPONS) {
            await setDoc(doc(db, 'coupons', coupon.code), coupon);
          }
        } catch (err) {
          console.error("Error seeding coupons:", err);
        }
      } else {
        setCoupons(couponsData);
      }
      setCouponsLoaded(true);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'coupons');
      setCouponsLoaded(true);
    });

    // Orders Listener
    let unsubscribeOrders = () => {};
    if (isAdmin) {
      // Admin sees all orders
      unsubscribeOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
        const ordersData = snapshot.docs.map(doc => doc.data() as Order);
        setOrders(ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setOrdersLoaded(true);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'orders');
        setOrdersLoaded(true);
      });
    } else if (user?.email) {
      // Customer sees only their orders
      const q = query(collection(db, 'orders'), where('customer.email', '==', user.email));
      unsubscribeOrders = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => doc.data() as Order);
        setOrders(ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setOrdersLoaded(true);
      }, (error) => {
        if (error.code !== 'permission-denied') {
          handleFirestoreError(error, OperationType.LIST, 'orders');
        }
        setOrdersLoaded(true);
      });
    } else {
      setOrdersLoaded(true);
    }

    return () => {
      unsubscribeProducts();
      unsubscribeCoupons();
      unsubscribeOrders();
    };
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
      await setDoc(doc(db, 'orders', newOrder.id), newOrder);
      showToast('Order placed successfully!');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `orders/${newOrder.id}`);
    }

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
      showToast(`Order status updated to ${status}`);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newProduct: Product = { ...product, id };

    try {
      await setDoc(doc(db, 'products', id), newProduct);
      showToast('Product added to inventory');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `products/${id}`);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      await setDoc(doc(db, 'products', updatedProduct.id), updatedProduct);
      showToast('Product updated successfully');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `products/${updatedProduct.id}`);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      showToast('Product removed from inventory');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `products/${productId}`);
    }
  };

  const addCoupon = async (coupon: Coupon) => {
    try {
      await setDoc(doc(db, 'coupons', coupon.code), coupon);
      showToast('Coupon created successfully');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `coupons/${coupon.code}`);
    }
  };

  const toggleCoupon = async (code: string) => {
    const coupon = coupons.find(c => c.code === code);
    if (!coupon) return;

    const newStatus = !coupon.isActive;
    try {
      await updateDoc(doc(db, 'coupons', code), { isActive: newStatus });
      showToast(`Coupon ${code} ${newStatus ? 'activated' : 'deactivated'}`);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `coupons/${code}`);
    }
  };

  const deleteCoupon = async (code: string) => {
    try {
      await deleteDoc(doc(db, 'coupons', code));
      showToast('Coupon deleted');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `coupons/${code}`);
    }
  };

  // Admin Auth
  const loginAdmin = async (password: string) => {
    const adminEmail = "valuemoney77@gmail.com";
    try {
      const result = await signInWithEmailAndPassword(auth, adminEmail, password);
      if (result.user.emailVerified) {
        setIsAdmin(true);
        showToast('Welcome back, Admin');
        return true;
      } else {
        showToast('Please verify your email to access admin features', 'error');
        return false;
      }
    } catch (err) {
      console.error("Login failed:", err);
      showToast('Invalid password or authentication error', 'error');
      return false;
    }
  };

  const logoutAdmin = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      showToast('Logged out successfully');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return {
    isLoading,
    products,
    cart,
    orders,
    coupons,
    toast,
    clearToast,
    isAdminAuthenticated: isAdmin,
    loginAdmin,
    logoutAdmin,
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
