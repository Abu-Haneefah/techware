import { Shield, Award, Truck, BadgeDollarSign, Users, Package, Headphones, RefreshCcw } from 'lucide-react'

const WHY_ITEMS = [
  {
    icon: Shield,
    title: 'Genuine Products Only',
    description: 'Every product on Techware is verified authentic. No fakes, no grey-market imports — just original laptops and accessories.',
    color: 'text-tw-blue',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: Award,
    title: 'Warranty on Every Purchase',
    description: 'All laptops come with manufacturer or seller warranty. If anything goes wrong, we have you covered.',
    color: 'text-tw-green-dark',
    bg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    icon: Truck,
    title: 'Fast Delivery Nationwide',
    description: 'We deliver across all 36 states in Nigeria. Same-day delivery available in Lagos and Abuja.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    icon: BadgeDollarSign,
    title: 'Clear Naira Prices',
    description: 'All prices are in Nigerian Naira with no hidden charges. What you see is exactly what you pay.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  {
    icon: Users,
    title: 'Trusted by Thousands',
    description: 'Join over 10,000 happy customers who have found their perfect tech on Techware.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-100',
  },
  {
    icon: Package,
    title: 'Multi-Vendor Marketplace',
    description: 'Shop from Techware directly or from approved independent vendors — all vetted and approved by our team.',
    color: 'text-tw-navy',
    bg: 'bg-slate-50',
    border: 'border-slate-100',
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'Get help any time via WhatsApp, email or our help center. We always respond quickly.',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: 'Changed your mind? Request a return within 7 days if the product is not as described.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
]

const STATS = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '500+', label: 'Products Listed' },
  { value: '50+', label: 'Trusted Vendors' },
  { value: '4.8★', label: 'Average Rating' },
]

export default function WhyTechware() {
  return (
    <section className="section-padding bg-white" aria-label="Why choose Techware">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Why Choose Techware?</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            We built Techware to solve the trust problem in Nigerian tech shopping. Here&apos;s our promise.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center p-6 rounded-2xl bg-gradient-to-br from-tw-blue/5 to-tw-navy/5 border border-blue-50">
              <div className="text-3xl md:text-4xl font-black text-tw-blue mb-1">{value}</div>
              <div className="text-sm text-gray-500 font-medium">{label}</div>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_ITEMS.map(({ icon: Icon, title, description, color, bg, border }) => (
            <div
              key={title}
              className={`p-6 rounded-2xl border ${border} ${bg} hover:shadow-card transition-all duration-300 hover:-translate-y-0.5`}
            >
              <div className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm`}>
                <Icon size={22} className={color} />
              </div>
              <h3 className="text-sm font-bold text-tw-navy mb-2">{title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
