export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  deliveryType: 'Standard' | 'Express';
  notes?: string;
  products: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  alternatePhone: string;
  email: string;
  address: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  deliveryType: 'Standard' | 'Express';
  notes: string;
}
