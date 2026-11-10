import Link from 'next/link'
import { ChevronRight, Store, Users, TrendingUp, Shield, CheckCircle, ArrowRight, Star } from 'lucide-react'

const STEPS = [
  { step: '01', title: 'Create Your Account', desc: 'Sign up and start your vendor application with your basic details.' },
  { step: '02', title: 'Submit Business Details', desc: 'Provide your company info, CAC registration number, and upload your documents.' },
  { step: '03', title: 'Get Approved', desc: 'Our team reviews your application within 2–5 business days.' },
  { step: '04', title: 'Start Selling', desc: 'List your products with photos, descriptions, specs and pricing in Naira.' },
]

const BENEFITS = [
  { icon: Users, title: '10,000+ Buyers', desc: 'Access our growing customer base across Nigeria.' },
  { icon: TrendingUp, title: 'Grow Your Sales', desc: 'Powerful dashboard with analytics and order management.' },
  { icon: Shield, title: 'Secure Payments', desc: 'Get paid reliably with our integrated payment system.' },
  { icon: Store, title: 'Your Own Storefront', desc: 'A branded store page to showcase your products.' },
]

const TESTIMONIALS = [
  { name: 'Adewale T.', biz: 'TechHub Lagos', rating: 5, quote: 'Techware doubled my monthly laptop sales in just 3 months. The platform is easy to use and the approval process was smooth.' },
  { name: 'Grace O.', biz: 'Grace Gadgets', rating: 5, quote: 'Great support team and the dashboard makes managing orders very easy. My accessories business has grown significantly.' },
]

export default function VendorRegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-tw-grey border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-tw-blue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-tw-navy font-medium">Become a Vendor</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden bg-hero-gradient py-16 md:py-24">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tw-green/20 border border-tw-green/30 text-tw-green text-sm font-semibold mb-6">
            <Store size={14} /> Vendor Programme
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Sell on Techware.<br />
            <span className="text-tw-green">Reach more customers.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-8">
            Join Nigeria&apos;s fastest growing tech marketplace. List your laptops and accessories and start earning today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vendor/register/apply" className="btn-green text-base px-8 py-4">
              Apply Now — It&apos;s Free <ArrowRight size={18} />
            </Link>
            <Link href="#how-it-works" className="btn-outline-white text-base px-8 py-4">
              How it Works
            </Link>
          </div>
          <p className="text-white/40 text-xs mt-4">Free to join · No monthly fees · Commission on sales only</p>
        </div>
      </div>

      {/* Benefits */}
      <section className="section-padding bg-tw-grey">
        <div className="container-max">
          <div className="text-center mb-10">
            <h2 className="section-title">Why sell on Techware?</h2>
            <p className="section-subtitle">Everything you need to grow your tech business online.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-tw-blue/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-tw-blue" />
                </div>
                <h3 className="font-bold text-tw-navy mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">Get set up in just 4 simple steps.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-tw-blue via-tw-blue to-tw-green z-0" />
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="relative z-10 text-center">
                <div className="w-12 h-12 rounded-full bg-tw-blue text-white font-black text-sm flex items-center justify-center mx-auto mb-4 shadow-blue">
                  {step}
                </div>
                <h3 className="font-bold text-tw-navy mb-2 text-sm md:text-base">{title}</h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-tw-grey">
        <div className="container-max">
          <div className="text-center mb-10">
            <h2 className="section-title">What vendors say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {TESTIMONIALS.map(({ name, biz, rating, quote }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(rating)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed mb-4">&quot;{quote}&quot;</p>
                <div>
                  <p className="font-bold text-tw-navy text-sm">{name}</p>
                  <p className="text-xs text-gray-400">{biz}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-hero-gradient">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to start selling?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            Join hundreds of vendors already growing their business on Techware.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vendor/register/apply" className="btn-green text-base px-8 py-4">
              Start Your Application <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/2349069115484?text=Hi%20Techware%2C%20I%27m%20interested%20in%20becoming%20a%20vendor" target="_blank" rel="noopener noreferrer" className="btn-outline-white text-base px-8 py-4">
              Ask on WhatsApp
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {['No monthly fees', 'Free listing', 'Fast approval', 'Dedicated support'].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm text-white/60">
                <CheckCircle size={14} className="text-tw-green" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
