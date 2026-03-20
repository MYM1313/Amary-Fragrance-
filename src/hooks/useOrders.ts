import { useState, useEffect } from 'react';
import { Order } from '../types';

const ORDERS_KEY = 'swift_checkout_orders';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem(ORDERS_KEY);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const saveOrder = (order: Order) => {
    const updatedOrders = [order, ...orders];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  return { orders, saveOrder };
}
