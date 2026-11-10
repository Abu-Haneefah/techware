import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { ALL_PRODUCTS } from '@/lib/mock-data'

export default function FeaturedProducts() {
  const featured = ALL_PRODUCTS.slice(0, 8)

  return (
    <section className="section-padding bg-white" aria-label="Featured products">
      <div className="container-max">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} layout="grid" />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/products" className="btn-outline px-10 py-3.5">
            View All Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
