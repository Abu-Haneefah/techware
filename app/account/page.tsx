'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Award, Truck } from 'lucide-react'

export default function SignInPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleGoogleSignIn = async () => {
    setLoading(true)
    // Will wire to Supabase Auth
    // const { createClient } = await import('@/lib/supabase/client')
    // const supabase = createClient()
    // await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/account' } })
    alert('Google Sign-In will be enabled once you add your Supabase credentials to .env.local')
    setLoading(false)
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Will wire to Supabase Auth
    await new Promise((r) => setTimeout(r, 1000))
    alert(mode === 'signin' ? 'Sign-in will work once Supabase is connected.' : 'Sign-up will work once Supabase is connected.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-tw-grey flex">
      {/* Left branding panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-hero-gradient relative overflow-hidden flex-col justify-between p-12">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-tw-blue-light/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-tw-green/10 blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center relative border border-white/30">
              <span className="text-white font-black text-xl leading-none">T</span>
              <div className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-tw-green rounded-full" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              techware<span className="text-tw-green">.</span>
            </span>
          </Link>
        </div>

        {/* Middle content */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-black text-white leading-tight">
            Your trusted tech<br />
            <span className="text-tw-green">marketplace.</span>
          </h2>
          <p className="text-white/70 text-lg max-w-xs">
            Sign in to access your orders, wishlist, and exclusive member deals.
          </p>

          <div className="space-y-3">
            {[
              { icon: Shield, text: 'Genuine products guaranteed' },
              { icon: Award, text: 'Warranty on every purchase' },
              { icon: Truck, text: 'Fast delivery across Nigeria' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-tw-green/20 flex items-center justify-center">
                  <Icon size={15} className="text-tw-green" />
                </div>
                <span className="text-white/80 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <p className="text-white/40 text-sm italic">&quot;See it from every side.&quot;</p>
        </div>
      </div>

      {/* Right: Auth form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 bg-tw-blue rounded-xl flex items-center justify-center relative">
                <span className="text-white font-black text-lg">T</span>
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-tw-green rounded-full" />
              </div>
              <span className="text-tw-navy font-bold text-lg">techware<span className="text-tw-green">.</span></span>
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl font-black text-tw-navy">
              {mode === 'signin' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              {mode === 'signin'
                ? "Sign in to your Techware account."
                : 'Join thousands of happy Techware customers.'}
            </p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-tw-blue hover:text-tw-navy transition-all duration-150 bg-white hover:shadow-card disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {/* Google icon */}
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-tw-navy mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Chukwuemeka Okafor"
                  required={mode === 'signup'}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-tw-blue focus:ring-2 focus:ring-tw-blue/10 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-tw-navy mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-tw-blue focus:ring-2 focus:ring-tw-blue/10 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-tw-navy">Password</label>
                {mode === 'signin' && (
                  <Link href="/forgot-password" className="text-xs text-tw-blue hover:text-tw-blue-dark font-medium">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'}
                  required
                  minLength={mode === 'signup' ? 8 : 1}
                  className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-tw-blue focus:ring-2 focus:ring-tw-blue/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-gray-300 text-tw-blue" />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I agree to Techware&apos;s{' '}
                  <Link href="/terms" className="text-tw-blue hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-tw-blue hover:underline">Privacy Policy</Link>
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <>
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-sm text-gray-500">
            {mode === 'signin' ? (
              <>Don&apos;t have an account?{' '}
                <button onClick={() => setMode('signup')} className="text-tw-blue font-semibold hover:underline">
                  Sign up free
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button onClick={() => setMode('signin')} className="text-tw-blue font-semibold hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>

          {/* Vendor link */}
          <div className="text-center pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Want to sell on Techware?{' '}
              <Link href="/vendor/register" className="text-tw-blue font-semibold hover:underline">
                Register as a Vendor
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
