import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ExternalLink, Shield, Truck, Award, Clock } from 'lucide-react'

const SHOP_LINKS = [
  { label: 'Laptops', href: '/category/laptops' },
  { label: 'Keyboards', href: '/category/keyboards' },
  { label: 'Mice', href: '/category/mice' },
  { label: 'Chargers', href: '/category/chargers' },
  { label: 'Phone Cases', href: '/category/phone-cases' },
  { label: 'Earbuds', href: '/category/earbuds' },
  { label: 'All Deals', href: '/deals' },
]

const SUPPORT_LINKS = [
  { label: 'Help Center', href: '/help' },
  { label: 'Track Order', href: '/track-order' },
  { label: 'Returns & Refunds', href: '/returns' },
  { label: 'Warranty Claims', href: '/warranty' },
  { label: 'Contact Us', href: '/contact' },
]

const COMPANY_LINKS = [
  { label: 'About Techware', href: '/about' },
  { label: 'Become a Vendor', href: '/vendor/register' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap' },
]

const TRUST_BADGES = [
  { icon: Shield, label: 'Genuine Products', sub: 'All products verified' },
  { icon: Award, label: 'Warranty Included', sub: 'Supported after purchase' },
  { icon: Truck, label: 'Fast Delivery', sub: 'Across Nigeria' },
  { icon: Clock, label: 'Clear Naira Prices', sub: 'No hidden charges' },
]

const SOCIAL_LINKS = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-tw-navy text-white">
      {/* Trust badges strip */}
      <div className="border-b border-white/10">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tw-green/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-tw-green" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-white/60">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 bg-tw-blue rounded-xl flex items-center justify-center relative">
                <span className="text-white font-black text-xl leading-none">T</span>
                <div className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-tw-green rounded-full" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                techware<span className="text-tw-green">.</span>
              </span>
            </Link>

            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Nigeria&apos;s trusted marketplace for genuine laptops and tech accessories. 
              Dell, HP, Lenovo, Acer — all in one place, with warranty and fast delivery.
            </p>

            <p className="text-white/50 text-xs italic font-medium">
              &quot;See it from every side.&quot;
            </p>

            {/* Contact */}
            <div className="space-y-2">
              <a
                href="https://wa.me/2349069115484"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-tw-green hover:text-tw-green-light transition-colors duration-150"
              >
                <Phone size={15} />
                +234 906 911 5484 (WhatsApp)
              </a>
              <a
                href="mailto:hello@techware.ng"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-150"
              >
                <Mail size={15} />
                hello@techware.ng
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                Lagos, Nigeria
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-tw-blue transition-colors duration-150"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/65 hover:text-white transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2.5">
              {SUPPORT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/65 hover:text-white transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/65 hover:text-white transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vendor CTA */}
            <div className="mt-6 p-4 rounded-xl bg-tw-blue/20 border border-tw-blue/30">
              <p className="text-xs font-semibold text-white mb-2">Are you a vendor?</p>
              <p className="text-xs text-white/60 mb-3">Sell on Techware and reach thousands of customers.</p>
              <Link
                href="/vendor/register"
                className="inline-flex items-center gap-1 text-xs font-semibold text-tw-green hover:text-tw-green-light transition-colors duration-150"
              >
                Start selling <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {year} Techware Nigeria. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/50 hover:text-white/80 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-white/50 hover:text-white/80 transition-colors">Terms</Link>
            <span className="text-xs text-white/30">🇳🇬 Made in Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
