'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Search } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { ALL_PRODUCTS } from '@/lib/mock-data'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return ALL_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="min-h-screen bg-tw-grey">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-tw-blue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-tw-navy font-medium">Search</span>
          </nav>
        </div>
      </div>

      <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Search size={22} className="text-tw-blue" />
            <h1 className="text-2xl md:text-3xl font-black text-tw-navy">
              {query ? `Results for "${query}"` : 'Search Products'}
            </h1>
          </div>
          {query && (
            <p className="text-gray-500 text-sm ml-9">
              {results.length} product{results.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {!query ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-card">
            <Search size={48} className="text-gray-200 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-tw-navy mb-2">What are you looking for?</h2>
            <p className="text-gray-500 text-sm mb-6">Search for laptops, brands, accessories and more.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Dell laptop', 'HP Pavilion', 'Wireless keyboard', 'USB-C charger', 'Earbuds'].map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-tw-blue hover:text-tw-blue transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-card">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-lg font-bold text-tw-navy mb-2">No results for &quot;{query}&quot;</h2>
            <p className="text-gray-500 text-sm mb-6">Try a different search term or browse all products.</p>
            <Link href="/products" className="btn-primary inline-flex">Browse All Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-tw-grey flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-tw-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 text-sm">Searching...</p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
}
