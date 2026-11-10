import Link from 'next/link'
import { Laptop, Keyboard, Mouse, Plug, Smartphone, Headphones, ArrowRight } from 'lucide-react'

const CATEGORIES = [
  {
    id: 'laptops',
    name: 'Laptops',
    description: 'Dell, HP, Lenovo & more',
    icon: Laptop,
    href: '/category/laptops',
    count: '200+ items',
    featured: true,
    gradient: 'from-tw-blue to-tw-navy',
    textColor: 'text-white',
  },
  {
    id: 'keyboards',
    name: 'Keyboards',
    description: 'Mechanical & membrane',
    icon: Keyboard,
    href: '/category/keyboards',
    count: '50+ items',
    featured: false,
    gradient: 'from-purple-500 to-purple-700',
    textColor: 'text-white',
  },
  {
    id: 'mice',
    name: 'Mice',
    description: 'Wired & wireless',
    icon: Mouse,
    href: '/category/mice',
    count: '30+ items',
    featured: false,
    gradient: 'from-orange-400 to-orange-600',
    textColor: 'text-white',
  },
  {
    id: 'chargers',
    name: 'Chargers',
    description: 'USB-C, fast charging',
    icon: Plug,
    href: '/category/chargers',
    count: '80+ items',
    featured: false,
    gradient: 'from-tw-green-dark to-emerald-700',
    textColor: 'text-white',
  },
  {
    id: 'phone-cases',
    name: 'Phone Cases',
    description: 'All major brands',
    icon: Smartphone,
    href: '/category/phone-cases',
    count: '120+ items',
    featured: false,
    gradient: 'from-pink-500 to-rose-600',
    textColor: 'text-white',
  },
  {
    id: 'earbuds',
    name: 'Earbuds',
    description: 'TWS & wired',
    icon: Headphones,
    href: '/category/earbuds',
    count: '40+ items',
    featured: false,
    gradient: 'from-cyan-500 to-cyan-700',
    textColor: 'text-white',
  },
]

export default function FeaturedCategories() {
  return (
    <section className="section-padding bg-tw-grey" aria-label="Product categories">
      <div className="container-max">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Everything tech, all in one place.</p>
          </div>
          <Link
            href="/categories"
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-tw-blue hover:text-tw-blue-dark transition-colors duration-150"
          >
            All categories <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(({ id, name, description, icon: Icon, href, count, gradient }) => (
            <Link
              key={id}
              href={href}
              className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 aspect-[3/4] sm:aspect-[2/3] lg:aspect-auto lg:h-48"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Subtle pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Content */}
              <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base">{name}</h3>
                  <p className="text-white/70 text-xs mt-0.5 hidden sm:block">{description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">{count}</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-150">
                    <ArrowRight size={12} className="text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: all categories link */}
        <div className="mt-6 text-center md:hidden">
          <Link href="/categories" className="btn-outline text-sm py-2.5">
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
