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
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
  //   items: OrderItem[];
  //   shippingAddress: Address;
  createdAt: string;
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
