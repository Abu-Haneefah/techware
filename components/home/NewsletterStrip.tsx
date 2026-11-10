'use client'

import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function NewsletterStrip() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Placeholder — will wire to Supabase later
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0B1B3F 0%, #1D4ED8 100%)' }}
      aria-label="Newsletter signup"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-tw-blue-light/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-tw-green/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-max mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/20 mx-auto">
            <Mail size={28} className="text-tw-green" />
          </div>

          {/* Headline */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3">
              Get deals before anyone else
            </h2>
            <p className="text-white/70 text-base md:text-lg">
              Subscribe for exclusive flash sales, new arrivals, and tech tips delivered straight to your inbox.
            </p>
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm outline-none focus:border-tw-green focus:bg-white/15 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-green px-6 py-3 text-sm flex-shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  <>Subscribe <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 text-tw-green font-semibold text-base animate-fade-in">
              <CheckCircle size={22} />
              You&apos;re in! We&apos;ll send you the best deals.
            </div>
          )}

          {/* Fine print */}
          {!submitted && (
            <p className="text-white/40 text-xs">
              No spam, ever. Unsubscribe any time.
            </p>
          )}

          {/* Badges */}
          <div className="flex items-center justify-center gap-4 pt-2 flex-wrap">
            {['10,000+ subscribers', 'Weekly deals', 'No spam'].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-tw-green inline-block" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
