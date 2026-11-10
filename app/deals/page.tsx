import Link from 'next/link'
import { ChevronRight, Zap, Tag, ArrowRight, Clock } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { ALL_PRODUCTS } from '@/lib/mock-data'

const DEAL_BANNERS = [
  {
    id: 'flash',
    label: '⚡ Flash Sale',
    title: 'Up to 30% OFF',
    sub: 'On selected Dell and HP laptops. Today only!',
    gradient: 'from-tw-navy to-tw-blue',
    cta: 'Shop Flash Sale',
    icon: Zap,
  },
  {
    id: 'new',
    label: '🆕 New Arrivals',
    title: '2025 Models In Stock',
    sub: 'Fresh Lenovo & Acer laptops just landed.',
    gradient: 'from-purple-700 to-purple-900',
    cta: 'Shop New In',
    icon: Tag,
  },
  {
    id: 'bundles',
    label: '🎁 Bundle Deals',
    title: 'Laptop + Accessories',
    sub: 'Save more when you buy a laptop with accessories.',
    gradient: 'from-orange-500 to-rose-600',
    cta: 'View Bundles',
    icon: Tag,
  },
]

// Products with active discounts
const DEALS = ALL_PRODUCTS.filter((p) => p.compare_at_price !== null && p.compare_at_price !== undefined)

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-tw-grey">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-tw-blue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-tw-navy font-medium">Deals</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-tw-navy via-tw-blue to-tw-blue-dark py-14 md:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tw-green/20 border border-tw-green/30 text-tw-green text-sm font-semibold mb-5">
            <Zap size={14} className="fill-current" /> Limited time offers
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Best Deals <span className="text-tw-green">Today</span>
          </h1>
          <p className="text-white/70 text-lg max-w-lg mx-auto">
            Huge savings on genuine laptops and tech accessories. All prices in Naira, no hidden fees.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-white/60 text-sm">
            <Clock size={16} />
            <span>Deals refresh every 24 hours</span>
          </div>
        </div>
      </div>

      <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-10">
        {/* Deal banner cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {DEAL_BANNERS.map(({ id, label, title, sub, gradient, cta }) => (
            <div
              key={id}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white hover:-translate-y-1 transition-transform duration-300 group`}
            >
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl" />
              <div className="relative z-10">
                <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">{label}</span>
                <h3 className="text-xl font-black mt-3 mb-1">{title}</h3>
                <p className="text-white/70 text-xs mb-4">{sub}</p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors"
                >
                  {cta} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* On-sale products */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-tw-navy">Products On Sale</h2>
              <p className="text-gray-500 text-sm mt-1">{DEALS.length} items with active discounts</p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-tw-blue hover:text-tw-blue-dark flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>

          {DEALS.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-card">
              <p className="text-gray-400">No active deals right now. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {DEALS.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>

        {/* WhatsApp strip */}
        <div className="rounded-2xl bg-tw-navy text-white p-7 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-lg font-black mb-1">Want a custom deal?</h3>
            <p className="text-white/70 text-sm">Chat with us on WhatsApp and we&apos;ll find the best price for you.</p>
          </div>
          <a
            href="https://wa.me/2349069115484?text=Hi%20Techware%2C%20I%27m%20looking%20for%20a%20deal%20on"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green flex-shrink-0"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
