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

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- STORE LOGIC ---

export const useStore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
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
        if (currentUser.email === adminEmail && currentUser.emailVerified) {
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
    });
    return () => unsubscribe();
  }, []);

  // Fetch all data from Firestore on mount
  useEffect(() => {
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

    setIsLoading(true);

    // Products Listener
    const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => doc.data() as Product);
      if (productsData.length > 0) {
        setProducts(productsData);
      }
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });

    // Coupons Listener
    const unsubscribeCoupons = onSnapshot(collection(db, 'coupons'), (snapshot) => {
      const couponsData = snapshot.docs.map(doc => doc.data() as Coupon);
      if (couponsData.length > 0) {
        setCoupons(couponsData);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'coupons');
    });

    // Orders Listener (Only if admin)
    let unsubscribeOrders = () => {};
    if (isAdmin) {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      unsubscribeOrders = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => doc.data() as Order);
        setOrders(ordersData);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'orders');
      });
    }

    return () => {
      unsubscribeProducts();
      unsubscribeCoupons();
      unsubscribeOrders();
    };
  }, [isAdmin]);

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
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `orders/${newOrder.id}`);
    }

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newProduct: Product = { ...product, id };

    try {
      await setDoc(doc(db, 'products', id), newProduct);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `products/${id}`);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      await setDoc(doc(db, 'products', updatedProduct.id), updatedProduct);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `products/${updatedProduct.id}`);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `products/${productId}`);
    }
  };

  const addCoupon = async (coupon: Coupon) => {
    try {
      await setDoc(doc(db, 'coupons', coupon.code), coupon);
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
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `coupons/${code}`);
    }
  };

  const deleteCoupon = async (code: string) => {
    try {
      await deleteDoc(doc(db, 'coupons', code));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `coupons/${code}`);
    }
  };

  // Admin Auth
  const loginAdmin = async (password: string) => {
    const adminEmail = "valuemoney77@gmail.com";
    try {
      await signInWithEmailAndPassword(auth, adminEmail, password);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logoutAdmin = async () => {
    try {
      await signOut(auth);
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
