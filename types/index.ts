// ---- User & Auth ----
export type UserRole = 'customer' | 'vendor' | 'super_admin'

export interface Profile {
  id: string
  full_name: string | null
  email: string
  avatar_url: string | null
  phone: string | null
  role: UserRole
  is_active: boolean
  created_at: string
}

// ---- Catalog ----
export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  display_order: number
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo_url: string | null
}

export type ProductCondition = 'new' | 'open_box' | 'refurbished'
export type ProductStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'archived'

export interface Product {
  id: string
  vendor_id: string | null
  category_id: string
  brand_id: string | null
  title: string
  slug: string
  description: string
  specifications: Record<string, string> | null
  price: number // in kobo (1 NGN = 100 kobo)
  compare_at_price: number | null
  stock_quantity: number
  condition: ProductCondition
  warranty_info: string | null
  status: ProductStatus
  model_3d_path: string | null
  average_rating: number | null
  review_count: number
  approved_at: string | null
  created_at: string
  updated_at: string
  // Relations
  category?: Category
  brand?: Brand
  images?: ProductImage[]
}

export interface ProductImage {
  id: string
  product_id: string
  storage_path: string
  url: string
  display_order: number
  is_primary: boolean
}

// ---- Shopping ----
export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  product?: Product
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product
}

// ---- Orders ----
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface Order {
  id: string
  user_id: string
  status: OrderStatus
  subtotal: number
  delivery_fee: number
  discount: number
  total: number
  payment_status: PaymentStatus
  payment_provider: string | null
  payment_reference: string | null
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  vendor_id: string | null
  title_snapshot: string
  unit_price_snapshot: number
  quantity: number
  status: OrderStatus
}

// ---- Reviews ----
export interface Review {
  id: string
  product_id: string
  user_id: string
  order_item_id: string
  rating: number // 1-5
  comment: string | null
  created_at: string
  profile?: Pick<Profile, 'full_name' | 'avatar_url'>
}

// ---- Utility ----
export function formatPrice(kobo: number): string {
  const naira = kobo / 100
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(naira)
}

export function formatPriceRaw(naira: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(naira)
}
