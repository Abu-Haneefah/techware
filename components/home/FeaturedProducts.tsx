'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, ArrowRight, Eye } from 'lucide-react'

// Mock data — will be replaced by Supabase query
const MOCK_PRODUCTS = [
  {
    id: '1',
    title: 'Dell Inspiron 15 Core i7',
    slug: 'dell-inspiron-15-core-i7',
    brand: 'Dell',
    price: 68000000, // kobo = ₦680,000
    compare_at_price: 75000000,
    condition: 'new' as const,
    average_rating: 4.8,
    review_count: 124,
    stock_quantity: 12,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80',
    badge: 'Best Seller',
    badge_color: 'bg-tw-blue text-white',
    specs: '16GB RAM · 512GB SSD',
  },
  {
    id: '2',
    title: 'HP Pavilion 14 Core i5',
    slug: 'hp-pavilion-14-core-i5',
    brand: 'HP',
    price: 42500000,
    compare_at_price: 47000000,
    condition: 'new' as const,
    average_rating: 4.6,
    review_count: 89,
    stock_quantity: 7,
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80',
    badge: 'Hot Deal',
    badge_color: 'bg-orange-500 text-white',
    specs: '8GB RAM · 256GB SSD',
  },
  {
    id: '3',
    title: 'Lenovo ThinkPad E14 i5',
    slug: 'lenovo-thinkpad-e14-i5',
    brand: 'Lenovo',
    price: 55000000,
    compare_at_price: null,
    condition: 'new' as const,
    average_rating: 4.9,
    review_count: 211,
    stock_quantity: 3,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80',
    badge: 'Low Stock',
    badge_color: 'bg-red-500 text-white',
    specs: '16GB RAM · 512GB SSD',
  },
  {
    id: '4',
    title: 'Acer Aspire 5 Core i3',
    slug: 'acer-aspire-5-core-i3',
    brand: 'Acer',
    price: 28500000,
    compare_at_price: 32000000,
    condition: 'new' as const,
    average_rating: 4.3,
    review_count: 56,
    stock_quantity: 20,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
    badge: 'Budget Pick',
    badge_color: 'bg-tw-green text-white',
    specs: '8GB RAM · 256GB SSD',
  },
  {
    id: '5',
    title: 'HP EliteBook 840 G8 i7',
    slug: 'hp-elitebook-840-g8-i7',
    brand: 'HP',
    price: 82000000,
    compare_at_price: null,
    condition: 'refurbished' as const,
    average_rating: 4.7,
    review_count: 44,
    stock_quantity: 5,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    badge: 'Refurbished',
    badge_color: 'bg-purple-600 text-white',
    specs: '16GB RAM · 512GB SSD',
  },
  {
    id: '6',
    title: 'Dell XPS 13 Core i7',
    slug: 'dell-xps-13-core-i7',
    brand: 'Dell',
    price: 115000000,
    compare_at_price: null,
    condition: 'new' as const,
    average_rating: 5.0,
    review_count: 33,
    stock_quantity: 2,
    image: 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?w=400&q=80',
    badge: 'Premium',
    badge_color: 'bg-tw-navy text-white',
    specs: '32GB RAM · 1TB SSD',
  },
  {
    id: '7',
    title: 'Logitech MX Keys Keyboard',
    slug: 'logitech-mx-keys-keyboard',
    brand: 'Logitech',
    price: 4500000,
    compare_at_price: 5500000,
    condition: 'new' as const,
    average_rating: 4.8,
    review_count: 178,
    stock_quantity: 30,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
    badge: 'Top Rated',
    badge_color: 'bg-tw-blue text-white',
    specs: 'Wireless · Backlit',
  },
  {
    id: '8',
    title: 'Samsung 65W USB-C Charger',
    slug: 'samsung-65w-usb-c-charger',
    brand: 'Samsung',
    price: 1850000,
    compare_at_price: 2200000,
    condition: 'new' as const,
    average_rating: 4.5,
    review_count: 93,
    stock_quantity: 50,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80',
    badge: 'On Sale',
    badge_color: 'bg-orange-500 text-white',
    specs: '65W · USB-C PD',
  },
]

function formatPrice(kobo: number): string {
  return '₦' + (kobo / 100).toLocaleString('en-NG')
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={star <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  )
}

function ProductCard({ product }: { product: typeof MOCK_PRODUCTS[0] }) {
  const [wishlisted, setWishlisted] = useState(false)
  const discount = product.compare_at_price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : null

  return (
    <div className="card-product group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${product.badge_color}`}>
            {product.badge}
          </span>
        )}

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-red-500 text-white">
            -{discount}%
          </span>
        )}

        {/* Hover actions */}
        <div className="absolute inset-0 bg-tw-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-card hover:bg-tw-blue hover:text-white transition-colors duration-150"
            aria-label={`Quick view ${product.title}`}
          >
            <Eye size={16} />
          </Link>
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={`absolute bottom-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
            wishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-500 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100'
          } shadow-md`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={14} className={wishlisted ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Brand */}
        <span className="text-xs font-semibold text-tw-blue uppercase tracking-wider">{product.brand}</span>

        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-tw-navy leading-snug hover:text-tw-blue transition-colors duration-150 line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Specs */}
        <p className="text-xs text-gray-500">{product.specs}</p>

        {/* Rating */}
        <StarRating rating={product.average_rating} count={product.review_count} />

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-base font-black text-tw-navy">{formatPrice(product.price)}</span>
          {product.compare_at_price && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.compare_at_price)}</span>
          )}
        </div>

        {/* Condition */}
        {product.condition !== 'new' && (
          <span className="text-xs text-purple-600 font-medium capitalize">{product.condition.replace('_', ' ')}</span>
        )}

        {/* Stock */}
        {product.stock_quantity <= 5 && (
          <p className="text-xs text-red-500 font-medium">Only {product.stock_quantity} left!</p>
        )}

        {/* Add to cart */}
        <button className="btn-primary w-full text-sm py-2.5 mt-1">
          <ShoppingBag size={15} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-white" aria-label="Featured products">
      <div className="container-max">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Hand-picked laptops and accessories at great prices.</p>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-tw-blue hover:text-tw-blue-dark transition-colors duration-150"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all button */}
        <div className="mt-10 text-center">
          <Link href="/products" className="btn-outline px-10 py-3.5">
            View All Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
