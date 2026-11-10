'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronRight, Heart, ShoppingBag, Share2, Shield, Award, Truck,
  RefreshCcw, Star, ChevronLeft, ChevronRight as ChevronRightIcon,
  CheckCircle, Minus, Plus, MessageCircle, X
} from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '@/lib/mock-data'
import ProductCard from '@/components/ui/ProductCard'

function formatPrice(kobo: number) {
  return '₦' + (kobo / 100).toLocaleString('en-NG')
}

// Mock reviews
const MOCK_REVIEWS = [
  { id: '1', name: 'Chukwuemeka O.', rating: 5, date: 'Nov 2024', comment: 'Excellent laptop! Fast delivery, genuine product, exactly as described. The battery life is impressive — lasted almost 10 hours on my first use.', verified: true },
  { id: '2', name: 'Fatima A.', rating: 5, date: 'Oct 2024', comment: 'Very happy with my purchase. Techware packaging was secure and the laptop arrived in perfect condition. Would recommend to everyone.', verified: true },
  { id: '3', name: 'Biodun K.', rating: 4, date: 'Oct 2024', comment: 'Good laptop for the price. Runs smoothly for my office work. Shipping took 2 days, which was faster than expected.', verified: true },
]

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)

  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'warranty'>('specs')
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tw-grey">
        <div className="text-center space-y-4">
          <div className="text-6xl">😕</div>
          <h1 className="text-2xl font-bold text-tw-navy">Product not found</h1>
          <p className="text-gray-500">This product may no longer be available.</p>
          <Link href="/products" className="btn-primary inline-flex">Browse All Products</Link>
        </div>
      </div>
    )
  }

  const related = getRelatedProducts(product.id, product.category)
  const discount = product.compare_at_price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : null

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <div className="min-h-screen bg-tw-grey">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-tw-blue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-tw-blue transition-colors">Products</Link>
            <ChevronRight size={14} />
            <Link href={`/category/${product.category}`} className="hover:text-tw-blue transition-colors capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight size={14} />
            <span className="text-tw-navy font-medium truncate max-w-[200px]">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-8">

        {/* Main product section */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden mb-8">
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Image gallery */}
            <div className="p-6 md:p-8 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-100">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden bg-white aspect-square mb-4 shadow-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images[currentImage]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Nav arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((i) => (i - 1 + product.images.length) % product.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl shadow-md flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setCurrentImage((i) => (i + 1) % product.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl shadow-md flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRightIcon size={18} />
                    </button>
                  </>
                )}

                {/* Badges */}
                {product.badge && (
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${product.badge_color}`}>
                    {product.badge}
                  </span>
                )}
                {discount && (
                  <span className="absolute top-4 right-4 text-sm font-black px-3 py-1.5 rounded-full bg-red-500 text-white">
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-150 ${
                        currentImage === i
                          ? 'border-tw-blue shadow-blue scale-105'
                          : 'border-gray-200 hover:border-tw-blue/50'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="p-6 md:p-8 flex flex-col gap-5">
              {/* Brand + title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-tw-blue uppercase tracking-wider">{product.brand}</span>
                  {product.condition !== 'new' && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 capitalize">
                      {product.condition.replace('_', ' ')}
                    </span>
                  )}
                </div>
                <h1 className="text-xl md:text-2xl font-black text-tw-navy leading-tight">{product.title}</h1>
                {product.specs && (
                  <p className="text-sm text-gray-500 mt-1">{product.specs}</p>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= Math.round(product.average_rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-tw-navy">{product.average_rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">({product.review_count} reviews)</span>
              </div>

              {/* Price */}
              <div className="bg-tw-grey rounded-2xl p-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-black text-tw-navy">{formatPrice(product.price)}</span>
                  {product.compare_at_price && (
                    <>
                      <span className="text-base text-gray-400 line-through">{formatPrice(product.compare_at_price)}</span>
                      <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Save {discount}%</span>
                    </>
                  )}
                </div>
                {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                  <p className="text-xs text-red-500 font-medium mt-1.5">⚠️ Only {product.stock_quantity} left in stock!</p>
                )}
                {product.stock_quantity > 5 && (
                  <p className="text-xs text-tw-green font-medium mt-1.5">✓ In stock ({product.stock_quantity} available)</p>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-tw-navy">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 hover:bg-gray-50 transition-colors text-gray-600 hover:text-tw-navy"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2.5 font-semibold text-tw-navy min-w-[3rem] text-center border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    className="px-3 py-2.5 hover:bg-gray-50 transition-colors text-gray-600 hover:text-tw-navy"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className={`btn-primary flex-1 py-3.5 text-sm transition-all duration-300 ${addedToCart ? 'bg-tw-green hover:bg-tw-green-dark' : ''}`}
                >
                  {addedToCart ? (
                    <><CheckCircle size={18} /> Added to Cart!</>
                  ) : (
                    <><ShoppingBag size={18} /> Add to Cart</>
                  )}
                </button>
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-200 flex-shrink-0 ${
                    wishlisted ? 'bg-red-50 border-red-300 text-red-500' : 'border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-400'
                  }`}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={20} className={wishlisted ? 'fill-current' : ''} />
                </button>
                <button
                  className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-gray-200 text-gray-500 hover:border-tw-blue hover:text-tw-blue transition-all duration-200 flex-shrink-0"
                  aria-label="Share product"
                >
                  <Share2 size={18} />
                </button>
              </div>

              {/* WhatsApp order */}
              <a
                href={`https://wa.me/2349069115484?text=Hi%20Techware%2C%20I%20want%20to%20order%20${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-tw-green/30 bg-tw-green/5 text-tw-green-dark font-semibold text-sm hover:bg-tw-green/10 transition-colors duration-150"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </a>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                {[
                  { icon: Shield, label: 'Genuine Product', sub: 'Verified authentic' },
                  { icon: Award, label: product.warranty_info || '1 Year Warranty', sub: 'Post-purchase support' },
                  { icon: Truck, label: 'Fast Delivery', sub: 'Across Nigeria' },
                  { icon: RefreshCcw, label: '7-Day Returns', sub: 'If not as described' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={16} className="text-tw-green flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-tw-navy">{label}</p>
                      <p className="text-xs text-gray-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Specs / Reviews / Warranty tabs */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden mb-8">
          {/* Tab nav */}
          <div className="flex border-b border-gray-100">
            {(['specs', 'reviews', 'warranty'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize transition-colors duration-150 border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'border-tw-blue text-tw-blue'
                    : 'border-transparent text-gray-500 hover:text-tw-navy'
                }`}
              >
                {tab === 'specs' ? 'Specifications' : tab === 'reviews' ? `Reviews (${MOCK_REVIEWS.length})` : 'Warranty'}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {/* Specifications */}
            {activeTab === 'specs' && product.specifications && (
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
                {Object.entries(product.specifications).map(([key, value], i) => (
                  <div key={key} className={`flex items-start justify-between py-3 ${i < Object.entries(product.specifications!).length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <span className="text-sm font-medium text-gray-500 w-36 flex-shrink-0">{key}</span>
                    <span className="text-sm font-semibold text-tw-navy text-right">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Summary */}
                <div className="flex items-center gap-6 p-5 bg-tw-grey rounded-2xl">
                  <div className="text-center">
                    <div className="text-5xl font-black text-tw-navy">{product.average_rating.toFixed(1)}</div>
                    <div className="flex gap-0.5 justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={16} className={s <= Math.round(product.average_rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{product.review_count} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-4">{s}</span>
                        <Star size={10} className="text-amber-400 fill-amber-400" />
                        <div className="flex-1 h-2 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-amber-400"
                            style={{ width: s === 5 ? '70%' : s === 4 ? '20%' : s === 3 ? '7%' : '3%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {MOCK_REVIEWS.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-tw-navy">{review.name}</span>
                          {review.verified && (
                            <span className="inline-flex items-center gap-1 text-xs text-tw-green font-medium">
                              <CheckCircle size={12} /> Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} size={12} className={s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Warranty */}
            {activeTab === 'warranty' && (
              <div className="space-y-5">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-green-50 border border-green-100">
                  <Award size={24} className="text-tw-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-tw-navy mb-1">{product.warranty_info}</h3>
                    <p className="text-sm text-gray-600">This product comes with a valid manufacturer or seller warranty. All warranty claims are supported by Techware.</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <h4 className="font-semibold text-tw-navy">What&apos;s covered:</h4>
                  <ul className="space-y-2">
                    {['Manufacturing defects', 'Hardware component failures', 'Battery defects (within warranty)', 'Software and firmware issues'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-tw-green" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-tw-navy mt-4">Not covered:</h4>
                  <ul className="space-y-2">
                    {['Physical damage (drops, cracks)', 'Water damage', 'Unauthorised modifications'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <X size={14} className="text-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-black text-tw-navy">Related Products</h2>
              <Link href="/products" className="text-sm font-semibold text-tw-blue hover:text-tw-blue-dark flex items-center gap-1">
                View all <ChevronRightIcon size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
