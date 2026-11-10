import { Shield, Award, Truck, BadgeDollarSign } from 'lucide-react'

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: 'Genuine Laptops',
    sub: 'Original, honestly labelled',
    color: 'text-tw-blue',
    bg: 'bg-blue-50',
  },
  {
    icon: Award,
    title: 'Warranty Included',
    sub: 'Support after you buy',
    color: 'text-tw-green-dark',
    bg: 'bg-green-50',
  },
  {
    icon: Truck,
    title: 'Fast, Safe Delivery',
    sub: 'Across Nigeria',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: BadgeDollarSign,
    title: 'Clear Naira Prices',
    sub: 'No hidden charges',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
]

export default function TrustBar() {
  return (
    <section className="bg-white py-6 border-b border-gray-100" aria-label="Trust badges">
      <div className="container-max mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {TRUST_ITEMS.map(({ icon: Icon, title, sub, color, bg }) => (
            <div
              key={title}
              className="flex items-center gap-3 p-3 md:p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-150"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} className={`${color} md:w-6 md:h-6`} />
              </div>
              <div>
                <p className="text-xs md:text-sm font-semibold text-tw-navy">{title}</p>
                <p className="text-xs text-gray-500 hidden md:block">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
