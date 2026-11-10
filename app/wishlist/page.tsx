'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Heart, ShoppingBag, Trash2 } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { ALL_PRODUCTS } from '@/lib/mock-data'

export default function WishlistPage() {
  // Mock: first 3 items are wishlisted
  const [wishlistIds, setWishlistIds] = useState<string[]>(['1', '3', '6'])

  const wishlistItems = ALL_PRODUCTS.filter((p) => wishlistIds.includes(p.id))

  const removeItem = (id: string) => {
    setWishlistIds((prev) => prev.filter((i) => i !== id))
  }

  return (
    <div className="min-h-screen bg-tw-grey">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-tw-blue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-tw-navy font-medium">Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-black text-tw-navy mb-6 flex items-center gap-3">
          <Heart size={28} className="text-red-500 fill-red-500" />
          My Wishlist
          <span className="text-base font-normal text-gray-400">({wishlistItems.length} items)</span>
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-card">
            <Heart size={56} className="text-gray-200 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-tw-navy mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 text-sm mb-6">Save products you love by clicking the heart icon.</p>
            <Link href="/products" className="btn-primary inline-flex">Browse Products</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Move all to cart */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-card">
              <p className="text-sm text-gray-600">{wishlistItems.length} saved items</p>
              <button className="btn-primary text-sm py-2.5">
                <ShoppingBag size={15} /> Add All to Cart
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {wishlistItems.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  <button
                    onClick={() => removeItem(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
