import Link from 'next/link'
import { ArrowRight, Zap, Tag } from 'lucide-react'

export default function DealsBanner() {
  return (
    <section className="section-padding bg-tw-grey" aria-label="Current deals">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Deal 1: Flash Sale */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-tw-navy to-tw-blue p-8 md:p-10 text-white group hover:-translate-y-1 transition-transform duration-300">
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 10% 20%, white 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-tw-blue-light/30 blur-xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tw-green text-white text-xs font-bold mb-4">
                <Zap size={12} className="fill-current" />
                Flash Sale — Today Only
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-2">
                Up to <span className="text-tw-green">30% OFF</span>
              </h3>
              <p className="text-white/70 text-sm md:text-base mb-6">
                On selected Dell and HP laptops. Limited stock available.
              </p>
              <Link
                href="/deals?type=flash"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-tw-green text-white text-sm font-semibold rounded-xl hover:bg-tw-green-dark transition-colors duration-150 shadow-green group-hover:shadow-lg"
              >
                Shop Flash Sale <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Deal 2: New Arrivals */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-purple-900 p-8 md:p-10 text-white group hover:-translate-y-1 transition-transform duration-300">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 90% 80%, white 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
            <div className="absolute -left-8 -top-8 w-40 h-40 rounded-full bg-purple-400/30 blur-xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold mb-4">
                <Tag size={12} />
                Just Arrived
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-2">
                New <span className="text-yellow-300">2025</span> Models
              </h3>
              <p className="text-white/70 text-sm md:text-base mb-6">
                Fresh stock of Lenovo ThinkPad & Acer Aspire. Be the first to own one.
              </p>
              <Link
                href="/products?sort=newest"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-purple-700 text-sm font-semibold rounded-xl hover:bg-purple-50 transition-colors duration-150"
              >
                Shop New Arrivals <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* WhatsApp order strip */}
        <div className="mt-6 rounded-2xl bg-tw-green/10 border border-tw-green/20 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-tw-green flex items-center justify-center">
              {/* WhatsApp icon SVG */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p className="text-tw-navy font-bold text-sm md:text-base">Prefer to order on WhatsApp?</p>
              <p className="text-gray-600 text-xs md:text-sm">Chat with us and get instant help finding your perfect laptop.</p>
            </div>
          </div>
          <a
            href="https://wa.me/2349069115484?text=Hi%20Techware%2C%20I%20want%20to%20order%20a%20laptop"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green flex-shrink-0 text-sm py-2.5"
          >
            +234 906 911 5484
          </a>
        </div>
      </div>
    </section>
  )
}
