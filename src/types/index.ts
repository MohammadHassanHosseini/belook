// Common Types

export type Locale = 'fa' | 'ar' | 'en';

export interface LocalizedString {
  en: string;
  fa: string;
  ar: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FilterParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  search?: string;
  sort?: 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
}

// User Types
export interface UserProfile {
  id: string;
  email: string;
  phone?: string;
  name: string;
  avatar?: string;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN';
}

// Product Types
export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  name: LocalizedString;
  sku: string;
  price?: number;
  stock: number;
  image?: string;
  attributes: Record<string, string>;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  comparePrice?: number;
  images: string[];
  thumbnail: string;
  stock: number;
  category: {
    id: string;
    name: LocalizedString;
    slug: string;
  };
  brand?: {
    id: string;
    name: LocalizedString;
    slug: string;
  };
  rating?: number;
  reviewCount?: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  variants?: ProductVariant[];
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
}

// Order Types
export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface OrderItem {
  id: string;
  product: {
    id: string;
    name: LocalizedString;
    image: string;
    sku: string;
  };
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  createdAt: Date;
}

// Review Types
export interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
  createdAt: Date;
  helpful: number;
}

// Address Types
export interface Address {
  id: string;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  isDefault: boolean;
}

// Category Types
export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  description?: LocalizedString;
  image?: string;
  children?: Category[];
  productCount?: number;
}

// Brand Types
export interface Brand {
  id: string;
  slug: string;
  name: LocalizedString;
  description?: LocalizedString;
  logo?: string;
  productCount?: number;
}

// Settings Types
export interface SiteSettings {
  siteName: LocalizedString;
  siteDescription: LocalizedString;
  logo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  socialMedia: {
    instagram?: string;
    telegram?: string;
    whatsapp?: string;
    twitter?: string;
    facebook?: string;
  };
  seo: {
    metaTitle: LocalizedString;
    metaDescription: LocalizedString;
    keywords: string[];
  };
}
