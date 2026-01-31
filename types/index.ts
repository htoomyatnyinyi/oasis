export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
  discount?: number;
}

export interface Order {
  id: string;
  userId: string;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  shippingMethod: string | null;
  paymentMethod: string | null;
  paymentStatus: string;
  shippingAddress: any;
  billingAddress?: any;
  items: any[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  orders: Order[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string | null;
  country: string;
  postalCode: string;
  isDefault: boolean;

  createdAt: any;
  updatedAt: any;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
