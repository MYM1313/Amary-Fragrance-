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