import React from 'react';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  image: string;
  accentColor?: string;
  description: string;
  story: string;
  highlights: string[];
  details: string[];
  usage: string;
  gallery: string[];
  price: number;
  category: string;
  stock: number;
  variants?: string[];
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'out-for-delivery' | 'delivered';
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };
  deliveryType: 'standard' | 'express';
  paymentMethod: 'cod' | 'online';
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  isActive: boolean;
}

export interface Fragment {
  id: string;
  volume: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}
