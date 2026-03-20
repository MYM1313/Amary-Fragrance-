import { Product, Coupon } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'SILK OUD',
    tagline: 'The Essence of Royal Grace',
    image: 'https://picsum.photos/seed/oud/800/1000',
    accentColor: '#C5A059',
    description: 'A sophisticated blend of rare Cambodian Oud and Bulgarian Rose, wrapped in a silken veil of white musk.',
    story: 'Inspired by the ancient silk routes, this fragrance captures the moment when precious resins met the delicate florals of the Mediterranean.',
    highlights: ['Rare Cambodian Oud', 'Bulgarian Rose', 'White Musk'],
    details: ['Volume: 100ml', 'Concentration: Extrait de Parfum', 'Longevity: 12+ Hours'],
    usage: 'Apply to pulse points for a lingering, royal presence.',
    gallery: [
      'https://picsum.photos/seed/oud1/800/1000',
      'https://picsum.photos/seed/oud2/800/1000',
      'https://picsum.photos/seed/oud3/800/1000'
    ],
    price: 245,
    category: 'Fragrance',
    stock: 15,
    variants: ['50ml', '100ml'],
    isNew: true
  },
  {
    id: '2',
    name: 'AMBER NOIR',
    tagline: 'Midnight in the Desert',
    image: 'https://picsum.photos/seed/amber/800/1000',
    accentColor: '#121212',
    description: 'Deep, mysterious amber notes combined with smoky incense and dark patchouli.',
    story: 'A tribute to the starlit nights of the Arabian desert, where the air is thick with mystery and ancient secrets.',
    highlights: ['Black Amber', 'Smoky Incense', 'Dark Patchouli'],
    details: ['Volume: 100ml', 'Concentration: Eau de Parfum', 'Longevity: 10+ Hours'],
    usage: 'Perfect for evening wear and special occasions.',
    gallery: [
      'https://picsum.photos/seed/amber1/800/1000',
      'https://picsum.photos/seed/amber2/800/1000'
    ],
    price: 195,
    category: 'Fragrance',
    stock: 20,
    variants: ['100ml']
  },
  {
    id: '3',
    name: 'VELVET ROSE',
    tagline: 'A Floral Symphony',
    image: 'https://picsum.photos/seed/rose/800/1000',
    accentColor: '#8C8C8C',
    description: 'A modern take on the classic rose, with hints of pink pepper and soft suede.',
    story: 'Capturing the texture of a velvet petal at dawn, this scent is both delicate and commanding.',
    highlights: ['Damask Rose', 'Pink Pepper', 'Soft Suede'],
    details: ['Volume: 50ml', 'Concentration: Eau de Parfum', 'Longevity: 8+ Hours'],
    usage: 'A versatile scent for daily elegance.',
    gallery: [
      'https://picsum.photos/seed/rose1/800/1000',
      'https://picsum.photos/seed/rose2/800/1000'
    ],
    price: 165,
    category: 'Fragrance',
    stock: 8,
    variants: ['50ml', '100ml']
  },
  {
    id: '4',
    name: 'GOLDEN MYRRH',
    tagline: 'Sacred Radiance',
    image: 'https://picsum.photos/seed/myrrh/800/1000',
    accentColor: '#C5A059',
    description: 'Warm, resinous myrrh blended with sweet vanilla and golden saffron.',
    story: 'An olfactory journey through sacred temples, where the air is filled with golden light and ancient prayers.',
    highlights: ['Sacred Myrrh', 'Madagascar Vanilla', 'Saffron'],
    details: ['Volume: 100ml', 'Concentration: Extrait de Parfum', 'Longevity: 14+ Hours'],
    usage: 'Apply sparingly for a powerful, spiritual aura.',
    gallery: [
      'https://picsum.photos/seed/myrrh1/800/1000'
    ],
    price: 285,
    category: 'Fragrance',
    stock: 5,
    variants: ['100ml'],
    isNew: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'WELCOME10', discountPercent: 10, isActive: true },
  { code: 'AMARY20', discountPercent: 20, isActive: true },
  { code: 'EXPIRED', discountPercent: 50, isActive: false }
];
