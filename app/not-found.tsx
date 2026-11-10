import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-tw-grey px-4">
      <div className="text-center max-w-md space-y-6">
        {/* Illustration */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-tw-blue/10 animate-ping" />
          <div className="relative w-32 h-32 rounded-full bg-tw-blue/10 flex items-center justify-center">
            <span className="text-6xl font-black text-tw-blue/30">404</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-black text-tw-navy mb-3">Page not found</h1>
          <p className="text-gray-500 text-base leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary py-3 px-6">
            <Home size={18} /> Go Home
          </Link>
          <Link href="/products" className="btn-outline py-3 px-6">
            <Search size={18} /> Browse Products
          </Link>
        </div>

        <Link href="javascript:history.back()" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-tw-blue transition-colors">
          <ArrowLeft size={14} /> Go back to previous page
        </Link>
      </div>
    </div>
  )
}
