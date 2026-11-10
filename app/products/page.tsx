'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, SlidersHorizontal, Grid, List, X, ChevronDown } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { ALL_PRODUCTS } from '@/lib/mock-data'

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating-desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Most Reviewed', value: 'reviews-desc' },
]

const CATEGORIES = ['All', 'Laptops', 'Keyboards', 'Mice', 'Chargers', 'Phone Cases', 'Earbuds']
const BRANDS = ['All', 'Dell', 'HP', 'Lenovo', 'Acer', 'Samsung', 'Logitech', 'JBL']
const CONDITIONS = [
  { label: 'New', value: 'new' },
  { label: 'Refurbished', value: 'refurbished' },
  { label: 'Open Box', value: 'open_box' },
]
const PRICE_RANGES = [
  { label: 'Under ₦50,000', min: 0, max: 5000000 },
  { label: '₦50,000 – ₦200,000', min: 5000000, max: 20000000 },
  { label: '₦200,000 – ₦500,000', min: 20000000, max: 50000000 },
  { label: '₦500,000 – ₦1,000,000', min: 50000000, max: 100000000 },
  { label: 'Above ₦1,000,000', min: 100000000, max: Infinity },
]

export default function ProductsPage() {
  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All')
  const [conditions, setConditions] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [sortBy, setSortBy] = useState('featured')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = [...ALL_PRODUCTS]

    if (category !== 'All') {
      result = result.filter(
        (p) => p.category === category.toLowerCase().replace(' ', '-')
      )
    }
    if (brand !== 'All') {
      result = result.filter((p) => p.brand === brand)
    }
    if (conditions.length > 0) {
      result = result.filter((p) => conditions.includes(p.condition))
    }
    if (priceRange) {
      result = result.filter(
        (p) => p.price >= priceRange.min && p.price <= priceRange.max
      )
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating-desc': result.sort((a, b) => b.average_rating - a.average_rating); break
      case 'reviews-desc': result.sort((a, b) => b.review_count - a.review_count); break
    }

    return result
  }, [category, brand, conditions, priceRange, sortBy])

  const activeFilterCount = [
    category !== 'All' ? 1 : 0,
    brand !== 'All' ? 1 : 0,
    conditions.length,
    priceRange ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  const clearFilters = () => {
    setCategory('All')
    setBrand('All')
    setConditions([])
    setPriceRange(null)
  }

  const toggleCondition = (val: string) => {
    setConditions((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    )
  }

  return (
    <div className="min-h-screen bg-tw-grey">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-tw-blue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-tw-navy font-medium">All Products</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-tw-navy">
                {category === 'All' ? 'All Products' : category}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Controls row */}
            <div className="flex items-center gap-3">
              {/* Filter button (mobile + desktop) */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors duration-150 ${
                  filterOpen ? 'bg-tw-blue text-white border-tw-blue' : 'bg-white border-gray-200 text-gray-700 hover:border-tw-blue hover:text-tw-blue'
                }`}
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-tw-green text-white text-xs flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-tw-blue hover:text-tw-blue transition-colors duration-150"
                >
                  {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                  <ChevronDown size={14} className={`transition-transform duration-150 ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-2xl shadow-card-hover border border-gray-100 py-2 z-30">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                          sortBy === opt.value
                            ? 'text-tw-blue font-semibold bg-blue-50'
                            : 'text-gray-600 hover:text-tw-blue hover:bg-blue-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Layout toggle */}
              <div className="hidden md:flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-2.5 transition-colors duration-150 ${layout === 'grid' ? 'bg-tw-blue text-white' : 'text-gray-500 hover:text-tw-blue'}`}
                  aria-label="Grid view"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={`p-2.5 transition-colors duration-150 ${layout === 'list' ? 'bg-tw-blue text-white' : 'text-gray-500 hover:text-tw-blue'}`}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar filters — desktop always visible, mobile conditional */}
          <aside
            className={`${
              filterOpen ? 'block' : 'hidden'
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            {/* Mobile: full-width overlay style */}
            <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setFilterOpen(false)} />

            <div className="relative z-50 lg:static bg-white rounded-2xl shadow-card p-6 space-y-6 lg:sticky lg:top-24 max-h-screen overflow-y-auto scrollbar-hide">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-tw-navy">Filters</h2>
                <div className="flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                    >
                      <X size={12} />
                      Clear all
                    </button>
                  )}
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-sm font-semibold text-tw-navy mb-3">Category</h3>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-150 ${
                        category === cat
                          ? 'bg-tw-blue text-white font-semibold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-tw-navy'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="text-sm font-semibold text-tw-navy mb-3">Brand</h3>
                <div className="space-y-1">
                  {BRANDS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrand(b)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-150 ${
                        brand === b
                          ? 'bg-tw-blue text-white font-semibold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-tw-navy'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <h3 className="text-sm font-semibold text-tw-navy mb-3">Condition</h3>
                <div className="space-y-2">
                  {CONDITIONS.map(({ label, value }) => (
                    <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={conditions.includes(value)}
                        onChange={() => toggleCondition(value)}
                        className="w-4 h-4 rounded border-gray-300 text-tw-blue focus:ring-tw-blue"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-tw-navy transition-colors">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <h3 className="text-sm font-semibold text-tw-navy mb-3">Price Range</h3>
                <div className="space-y-1">
                  {PRICE_RANGES.map(({ label, min, max }) => {
                    const isActive = priceRange?.min === min && priceRange?.max === max
                    return (
                      <button
                        key={label}
                        onClick={() => setPriceRange(isActive ? null : { min, max })}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-150 ${
                          isActive
                            ? 'bg-tw-blue text-white font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-tw-navy'
                        }`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {category !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tw-blue/10 text-tw-blue text-xs font-medium">
                    {category}
                    <button onClick={() => setCategory('All')}><X size={12} /></button>
                  </span>
                )}
                {brand !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tw-blue/10 text-tw-blue text-xs font-medium">
                    {brand}
                    <button onClick={() => setBrand('All')}><X size={12} /></button>
                  </span>
                )}
                {conditions.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tw-blue/10 text-tw-blue text-xs font-medium capitalize">
                    {c.replace('_', ' ')}
                    <button onClick={() => toggleCondition(c)}><X size={12} /></button>
                  </span>
                ))}
                {priceRange && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tw-blue/10 text-tw-blue text-xs font-medium">
                    {PRICE_RANGES.find((r) => r.min === priceRange.min)?.label}
                    <button onClick={() => setPriceRange(null)}><X size={12} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Results */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-card">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-tw-navy mb-2">No products found</h3>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or browsing all categories.</p>
                <button onClick={clearFilters} className="btn-primary text-sm py-2.5">
                  Clear Filters
                </button>
              </div>
            ) : layout === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} layout="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
