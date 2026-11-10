'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { ALL_PRODUCTS } from '@/lib/mock-data'

const CATEGORY_META: Record<string, { title: string; description: string; emoji: string }> = {
  laptops: { title: 'Laptops', description: 'Genuine Dell, HP, Lenovo and Acer laptops for work, study and business.', emoji: '💻' },
  keyboards: { title: 'Keyboards', description: 'Mechanical and membrane keyboards for every budget.', emoji: '⌨️' },
  mice: { title: 'Mice', description: 'Wired and wireless mice for productivity and gaming.', emoji: '🖱️' },
  chargers: { title: 'Chargers', description: 'Fast chargers and power adapters for all your devices.', emoji: '🔌' },
  'phone-cases': { title: 'Phone Cases', description: 'Protective cases for all major smartphone brands.', emoji: '📱' },
  earbuds: { title: 'Earbuds', description: 'True wireless and wired earbuds with great sound.', emoji: '🎧' },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const meta = CATEGORY_META[slug] ?? { title: slug, description: '', emoji: '📦' }

  const products = ALL_PRODUCTS.filter((p) => p.category === slug)

  return (
    <div className="min-h-screen bg-tw-grey">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-tw-blue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-tw-blue transition-colors">Products</Link>
            <ChevronRight size={14} />
            <span className="text-tw-navy font-medium">{meta.title}</span>
          </nav>
        </div>
      </div>

      {/* Category hero */}
      <div className="bg-gradient-to-r from-tw-navy to-tw-blue py-10 md:py-14">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="text-5xl md:text-6xl mb-4">{meta.emoji}</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">{meta.title}</h1>
          <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">{meta.description}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm">
            {products.length} products available
          </div>
        </div>
      </div>

      <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-10">
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-card">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-lg font-bold text-tw-navy mb-2">No products in this category yet</h2>
            <p className="text-gray-500 text-sm mb-4">Check back soon or browse all products.</p>
            <Link href="/products" className="btn-primary inline-flex">View All Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
