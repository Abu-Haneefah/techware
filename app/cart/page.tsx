'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag } from 'lucide-react'

// Mock cart items — will be replaced with Supabase/context
const MOCK_CART = [
  {
    id: 'ci-1',
    product_id: '1',
    title: 'Dell Inspiron 15 Core i7',
    brand: 'Dell',
    specs: '16GB RAM · 512GB SSD',
    price: 68000000,
    quantity: 1,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&q=80',
    slug: 'dell-inspiron-15-core-i7',
  },
  {
    id: 'ci-2',
    product_id: '7',
    title: 'Logitech MX Keys Wireless Keyboard',
    brand: 'Logitech',
    specs: 'Wireless · Backlit · Multi-device',
    price: 4500000,
    quantity: 1,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&q=80',
    slug: 'logitech-mx-keys-keyboard',
  },
]

function formatPrice(kobo: number) {
  return '₦' + (kobo / 100).toLocaleString('en-NG')
}

export default function CartPage() {
  const [items, setItems] = useState(MOCK_CART)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.stock, item.quantity + delta)) }
          : item
      )
    )
  }

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const delivery = subtotal >= 15000000 ? 0 : 250000 // Free delivery above ₦150,000
  const discount = couponApplied ? Math.round(subtotal * 0.05) : 0
  const total = subtotal + delivery - discount

  return (
    <div className="min-h-screen bg-tw-grey">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-tw-blue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-tw-navy font-medium">Cart</span>
          </nav>
        </div>
      </div>

      <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-black text-tw-navy mb-6 flex items-center gap-3">
          <ShoppingBag size={28} className="text-tw-blue" />
          Shopping Cart
          <span className="text-base font-normal text-gray-400">({items.length} items)</span>
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-card">
            <ShoppingBag size={56} className="text-gray-200 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-tw-navy mb-2">Your cart is empty</h2>
            <p className="text-gray-500 text-sm mb-6">Looks like you haven&apos;t added anything yet.</p>
            <Link href="/products" className="btn-primary inline-flex">Start Shopping</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free delivery banner */}
              {delivery > 0 && (
                <div className="bg-tw-blue/5 border border-tw-blue/20 rounded-2xl px-5 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-tw-blue animate-pulse" />
                  <p className="text-sm text-tw-navy">
                    Add <span className="font-bold text-tw-blue">{formatPrice(15000000 - subtotal)}</span> more for free delivery!
                  </p>
                </div>
              )}

              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-card p-4 md:p-5 flex gap-4">
                  {/* Image */}
                  <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover bg-gray-50"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-tw-blue uppercase tracking-wider">{item.brand}</span>
                        <Link href={`/product/${item.slug}`}>
                          <h3 className="text-sm md:text-base font-semibold text-tw-navy hover:text-tw-blue transition-colors leading-snug mt-0.5 line-clamp-2">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-400 mt-0.5">{item.specs}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="px-3 py-1.5 hover:bg-gray-50 text-gray-600 hover:text-tw-navy transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-semibold text-tw-navy min-w-[2.5rem] text-center border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="px-3 py-1.5 hover:bg-gray-50 text-gray-600 hover:text-tw-navy transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-base md:text-lg font-black text-tw-navy">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-gray-400">{formatPrice(item.price)} each</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue shopping */}
              <Link
                href="/products"
                className="flex items-center gap-2 text-sm font-semibold text-tw-blue hover:text-tw-blue-dark transition-colors"
              >
                <ArrowRight size={16} className="rotate-180" />
                Continue Shopping
              </Link>
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              {/* Coupon */}
              <div className="bg-white rounded-2xl shadow-card p-5">
                <h3 className="font-bold text-tw-navy mb-3 flex items-center gap-2">
                  <Tag size={16} className="text-tw-green" />
                  Coupon Code
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    disabled={couponApplied}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue transition-colors disabled:bg-gray-50 disabled:text-gray-400"
                  />
                  <button
                    onClick={() => {
                      if (coupon === 'SAVE5') setCouponApplied(true)
                      else alert('Invalid coupon code. Try SAVE5')
                    }}
                    disabled={couponApplied || !coupon}
                    className="btn-green text-sm py-2.5 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {couponApplied ? '✓' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-tw-green font-medium mt-2">✓ Coupon SAVE5 applied — 5% off!</p>
                )}
                <p className="text-xs text-gray-400 mt-2">Try: <span className="font-mono font-semibold">SAVE5</span></p>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl shadow-card p-5 space-y-4">
                <h3 className="font-bold text-tw-navy text-lg">Order Summary</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
                    <span className="font-medium text-tw-navy">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className={`font-medium ${delivery === 0 ? 'text-tw-green' : 'text-tw-navy'}`}>
                      {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-tw-green">
                      <span>Discount (SAVE5)</span>
                      <span className="font-medium">-{formatPrice(discount)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                  <span className="font-bold text-tw-navy">Total</span>
                  <span className="text-2xl font-black text-tw-navy">{formatPrice(total)}</span>
                </div>

                {delivery === 0 && (
                  <p className="text-xs text-tw-green font-medium text-center">🎉 You qualify for free delivery!</p>
                )}

                <Link href="/checkout" className="btn-primary w-full justify-center py-3.5 text-base">
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>

                <a
                  href={`https://wa.me/2349069115484?text=Hi%20Techware%2C%20I%20want%20to%20complete%20my%20order%20of%20${items.map((i) => i.title).join('%2C%20')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-tw-green/30 bg-tw-green/5 text-tw-green-dark font-semibold text-sm hover:bg-tw-green/10 transition-colors w-full"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Order via WhatsApp
                </a>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Secure checkout · Your data is protected
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
