'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ShoppingBag, Zap, Shield, Truck } from 'lucide-react'

const SPEC_PILLS = [
  { label: 'Core i5 / i7' },
  { label: '8GB – 16GB RAM' },
  { label: '256GB – 1TB SSD' },
  { label: 'Windows 11' },
]

const LAPTOP_BRANDS = ['DELL', 'HP', 'LENOVO', 'ACER']

const TRUST_ITEMS = [
  { icon: Shield, label: 'Genuine' },
  { icon: Zap, label: 'Warranty' },
  { icon: Truck, label: 'Delivery' },
]

export default function HeroBanner() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative overflow-hidden bg-hero-gradient min-h-[90vh] md:min-h-[85vh] flex items-center"
      aria-label="Hero banner"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large blue circle glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-tw-blue-light/20 blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-tw-blue/30 blur-3xl" />
        {/* Green glow bottom right */}
        <div className="absolute -bottom-16 right-1/4 w-64 h-64 rounded-full bg-tw-green/10 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text content */}
          <div className={`space-y-6 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
            {/* Trust badge row */}
            <div className="flex items-center gap-2 flex-wrap">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <span key={label} className="spec-pill text-xs">
                  <Icon size={12} className="text-tw-green" />
                  {label}
                </span>
              ))}
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight text-balance">
              Find your<br />
              <span className="text-tw-green italic">perfect</span>{' '}
              laptop<span className="text-tw-green">.</span>
            </h1>

            {/* Sub headline */}
            <p className="text-lg md:text-xl text-white/75 max-w-md leading-relaxed">
              Dell, HP and Lenovo laptops for work, study and business — with genuine warranty and fast delivery across Nigeria.
            </p>

            {/* Spec pills */}
            <div className="flex flex-wrap gap-2">
              {SPEC_PILLS.map(({ label }) => (
                <span key={label} className="spec-pill">
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/category/laptops" className="btn-green text-base px-7 py-3.5 shadow-green">
                <ShoppingBag size={18} />
                Shop Laptops
              </Link>
              <Link href="/deals" className="btn-outline-white text-base px-7 py-3.5">
                View Deals
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Brand logos row */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-white/50 mr-1">Featured brands:</span>
              {LAPTOP_BRANDS.map((brand) => (
                <span
                  key={brand}
                  className="px-3 py-1 rounded-lg bg-white/10 text-white/80 text-xs font-bold tracking-widest border border-white/20"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Hero image / visual */}
          <div
            className={`relative flex justify-center lg:justify-end ${mounted ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}
          >
            {/* Main image card */}
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-3xl bg-tw-blue-light/30 blur-2xl scale-110" />

              {/* Image container */}
              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-1">
                <div className="rounded-2xl overflow-hidden">
                  {/* Using the banner image from resources */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/banner.png"
                    alt="Laptops available at Techware — Dell, HP, Lenovo, Acer"
                    className="w-full max-w-sm md:max-w-md object-cover animate-float"
                    onError={(e) => {
                      // Fallback to a stylised laptop illustration
                      e.currentTarget.style.display = 'none'
                    }}
                  />

                  {/* Fallback: animated laptop visual */}
                  <div className="hidden w-full max-w-sm md:max-w-md aspect-[4/3] bg-gradient-to-br from-tw-navy-light to-tw-navy flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-32 h-20 bg-tw-blue/40 rounded-lg mx-auto border border-white/20 flex items-center justify-center">
                        <div className="w-28 h-16 bg-tw-navy rounded-md border border-white/10 flex items-center justify-center">
                          <span className="text-tw-green font-bold text-xs">techware.</span>
                        </div>
                      </div>
                      <div className="w-36 h-2 bg-white/10 rounded-full mx-auto" />
                      <div className="w-24 h-1 bg-white/10 rounded-full mx-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge: Original Brands */}
              <div className="absolute -bottom-4 -left-4 bg-tw-green text-white text-xs font-bold px-4 py-2 rounded-full shadow-green animate-pulse-green">
                ✓ ORIGINAL BRANDS
              </div>

              {/* Floating badge: Stats */}
              <div className="absolute -top-4 -right-4 bg-white text-tw-navy text-xs font-bold px-4 py-2.5 rounded-2xl shadow-card">
                <div className="text-tw-blue text-lg font-black leading-none">500+</div>
                <div className="text-gray-500 text-xs">Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
