import { useState, useEffect } from 'react';
import { CartItem } from '../types';

const CART_KEY = 'swift_checkout_cart';

const MOCK_CART: CartItem[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 4999,
    quantity: 1,
    image: 'https://picsum.photos/seed/headphones/200/200',
  },
  {
    id: '2',
    name: 'Smart Watch Series 7',
    price: 12999,
    quantity: 1,
    image: 'https://picsum.photos/seed/watch/200/200',
  },
];

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_KEY);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      // Initialize with mock data for demo
      localStorage.setItem(CART_KEY, JSON.stringify(MOCK_CART));
      setCart(MOCK_CART);
    }
  }, []);

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return { cart, clearCart, subtotal };
}
