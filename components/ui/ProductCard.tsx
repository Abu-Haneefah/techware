'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react'

export interface ProductCardData {
  id: string
  title: string
  slug: string
  brand: string
  price: number       // in kobo
  compare_at_price?: number | null
  condition: 'new' | 'open_box' | 'refurbished'
  average_rating: number
  review_count: number
  stock_quantity: number
  image: string
  badge?: string
  badge_color?: string
  specs?: string
}

function formatPrice(kobo: number) {
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
            className={
              star <= Math.round(rating)
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-200 fill-gray-200'
            }
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  )
}

interface ProductCardProps {
  product: ProductCardData
  layout?: 'grid' | 'list'
}

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)

  const discount = product.compare_at_price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : null

  if (layout === 'list') {
    return (
      <div className="card-product flex flex-row group">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 w-40 md:w-52 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${product.badge_color}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col md:flex-row p-4 gap-4">
          <div className="flex-1 space-y-2">
            <span className="text-xs font-semibold text-tw-blue uppercase tracking-wider">{product.brand}</span>
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-sm md:text-base font-semibold text-tw-navy hover:text-tw-blue transition-colors leading-snug">
                {product.title}
              </h3>
            </Link>
            {product.specs && <p className="text-xs text-gray-500">{product.specs}</p>}
            <StarRating rating={product.average_rating} count={product.review_count} />
            {product.condition !== 'new' && (
              <span className="text-xs text-purple-600 font-medium capitalize">{product.condition.replace('_', ' ')}</span>
            )}
            {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
              <p className="text-xs text-red-500 font-medium">Only {product.stock_quantity} left!</p>
            )}
            {product.stock_quantity === 0 && (
              <p className="text-xs text-red-500 font-medium">Out of stock</p>
            )}
          </div>

          {/* Price + actions */}
          <div className="flex flex-col items-start md:items-end justify-between gap-3 md:min-w-[160px]">
            <div>
              <div className="text-lg font-black text-tw-navy">{formatPrice(product.price)}</div>
              {product.compare_at_price && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 line-through">{formatPrice(product.compare_at_price)}</span>
                  {discount && (
                    <span className="text-xs font-bold text-red-500">-{discount}%</span>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                  wishlisted
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400'
                }`}
              >
                <Heart size={16} className={wishlisted ? 'fill-current' : ''} />
              </button>
              <button className="btn-primary flex-1 md:flex-none text-sm py-2 px-4">
                <ShoppingBag size={15} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

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

        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${product.badge_color}`}>
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-red-500 text-white">
            -{discount}%
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-tw-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
          className={`absolute bottom-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md ${
            wishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-500 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart size={14} className={wishlisted ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs font-semibold text-tw-blue uppercase tracking-wider">{product.brand}</span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-tw-navy leading-snug hover:text-tw-blue transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        {product.specs && <p className="text-xs text-gray-500">{product.specs}</p>}
        <StarRating rating={product.average_rating} count={product.review_count} />
        {product.condition !== 'new' && (
          <span className="text-xs text-purple-600 font-medium capitalize">{product.condition.replace('_', ' ')}</span>
        )}
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <p className="text-xs text-red-500 font-medium">Only {product.stock_quantity} left!</p>
        )}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-base font-black text-tw-navy">{formatPrice(product.price)}</span>
          {product.compare_at_price && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.compare_at_price)}</span>
          )}
        </div>
        <button className="btn-primary w-full text-sm py-2.5 mt-1">
          <ShoppingBag size={15} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
