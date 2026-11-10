'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Laptop, Keyboard, Mouse, Plug, Smartphone, Headphones } from 'lucide-react'

const NAV_LINKS = [
  {
    label: 'Laptops',
    href: '/category/laptops',
    icon: Laptop,
    submenu: [
      { label: 'Dell Laptops', href: '/category/laptops?brand=dell' },
      { label: 'HP Laptops', href: '/category/laptops?brand=hp' },
      { label: 'Lenovo Laptops', href: '/category/laptops?brand=lenovo' },
      { label: 'Acer Laptops', href: '/category/laptops?brand=acer' },
      { label: 'All Laptops', href: '/category/laptops' },
    ],
  },
  {
    label: 'Accessories',
    href: '/category/accessories',
    icon: Keyboard,
    submenu: [
      { label: 'Keyboards', href: '/category/keyboards', icon: Keyboard },
      { label: 'Mice', href: '/category/mice', icon: Mouse },
      { label: 'Chargers', href: '/category/chargers', icon: Plug },
      { label: 'Phone Cases', href: '/category/phone-cases', icon: Smartphone },
      { label: 'Earbuds', href: '/category/earbuds', icon: Headphones },
    ],
  },
  { label: 'Deals', href: '/deals' },
  { label: 'Vendors', href: '/vendors' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mock cart count — will be replaced with Supabase query
  const cartCount = 0
  const wishlistCount = 0

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-tw-navy text-white text-xs md:text-sm py-2 px-4 text-center">
        <span>🇳🇬 Free delivery on orders over ₦150,000 · </span>
        <a href="https://wa.me/2349069115484" className="text-tw-green font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
          Order on WhatsApp: +234 906 911 5484
        </a>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-tw-blue rounded-xl flex items-center justify-center relative transition-transform duration-200 group-hover:scale-105">
                <span className="text-white font-black text-lg md:text-xl leading-none">T</span>
                <div className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-tw-green rounded-full" />
              </div>
              <span className="text-tw-navy font-bold text-lg md:text-xl tracking-tight">
                techware<span className="text-tw-green">.</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.submenu && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                      activeDropdown === link.label
                        ? 'text-tw-blue bg-blue-50'
                        : 'text-gray-700 hover:text-tw-blue hover:bg-blue-50'
                    }`}
                  >
                    {link.label}
                    {link.submenu && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.submenu && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-card-hover border border-gray-100 py-2 z-50 animate-fade-in">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:text-tw-blue hover:bg-blue-50 transition-colors duration-150"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Search + Icons */}
            <div className="hidden md:flex items-center gap-2">
              {/* Search bar */}
              <div className={`relative transition-all duration-300 ${searchOpen ? 'w-64' : 'w-10'}`}>
                {searchOpen ? (
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 gap-2">
                    <Search size={16} className="text-gray-400 flex-shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search laptops, accessories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setSearchOpen(false)
                          setSearchQuery('')
                        }
                        if (e.key === 'Enter' && searchQuery) {
                          window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
                        }
                      }}
                      onBlur={() => {
                        if (!searchQuery) setSearchOpen(false)
                      }}
                      className="bg-transparent text-sm text-gray-800 outline-none w-full placeholder-gray-400"
                    />
                    <button onClick={() => { setSearchOpen(false); setSearchQuery('') }}>
                      <X size={14} className="text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:text-tw-blue hover:bg-blue-50 transition-colors duration-150"
                    aria-label="Search"
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:text-tw-blue hover:bg-blue-50 transition-colors duration-150"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-tw-green text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:text-tw-blue hover:bg-blue-50 transition-colors duration-150"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-tw-blue text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="flex items-center gap-2 px-3 py-2 bg-tw-blue text-white text-sm font-semibold rounded-xl hover:bg-tw-blue-dark transition-colors duration-150"
              >
                <User size={16} />
                <span>Sign In</span>
              </Link>
            </div>

            {/* Mobile: cart + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <Link href="/cart" className="relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-600" aria-label="Cart">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-tw-blue text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors duration-150"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1 animate-fade-in">
            {/* Mobile search */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 gap-2 mb-3">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search laptops, accessories..."
                className="bg-transparent text-sm outline-none w-full placeholder-gray-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = (e.target as HTMLInputElement).value
                    if (val) window.location.href = `/search?q=${encodeURIComponent(val)}`
                  }
                }}
              />
            </div>

            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center px-3 py-2.5 text-sm font-semibold text-gray-800 hover:text-tw-blue hover:bg-blue-50 rounded-xl transition-colors duration-150"
                >
                  {link.label}
                </Link>
                {link.submenu && (
                  <div className="pl-4 space-y-0.5">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-tw-blue hover:bg-blue-50 rounded-xl transition-colors duration-150"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link href="/account" className="btn-primary w-full justify-center">
                <User size={16} />
                Sign In
              </Link>
              <Link href="/vendor/register" className="btn-outline w-full justify-center text-sm">
                Become a Vendor
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
