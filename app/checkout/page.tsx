'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, MapPin, User, Phone, Mail, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react'

function formatPrice(kobo: number) {
  return '₦' + (kobo / 100).toLocaleString('en-NG')
}

const ORDER_ITEMS = [
  { title: 'Dell Inspiron 15 Core i7', specs: '16GB · 512GB SSD', price: 68000000, qty: 1, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=120&q=80' },
  { title: 'Logitech MX Keys Keyboard', specs: 'Wireless · Backlit', price: 4500000, qty: 1, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=120&q=80' },
]

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River',
  'Delta','Ebonyi','Edo','Ekiti','Enugu','FCT Abuja','Gombe','Imo','Jigawa','Kaduna',
  'Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo',
  'Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara',
]

const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard Delivery', sub: '3–5 business days', price: 250000 },
  { id: 'express', label: 'Express Delivery', sub: '1–2 business days', price: 500000 },
  { id: 'same-day', label: 'Same-Day (Lagos only)', sub: 'Order before 12pm', price: 800000 },
]

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [delivery, setDelivery] = useState('standard')
  const [payMethod, setPayMethod] = useState('card')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
  })

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0)
  const deliveryFee = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.price ?? 0
  const total = subtotal + deliveryFee

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const StepDot = ({ num, label }: { num: number; label: string }) => (
    <div className={`flex items-center gap-2 ${step >= num ? 'text-tw-blue' : 'text-gray-400'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
        step > num ? 'bg-tw-green border-tw-green text-white' :
        step === num ? 'bg-tw-blue border-tw-blue text-white' :
        'border-gray-300 text-gray-400'
      }`}>
        {step > num ? <CheckCircle size={16} /> : num}
      </div>
      <span className={`text-sm font-semibold hidden sm:block ${step >= num ? 'text-tw-navy' : 'text-gray-400'}`}>{label}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-tw-grey">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-tw-blue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/cart" className="hover:text-tw-blue transition-colors">Cart</Link>
            <ChevronRight size={14} />
            <span className="text-tw-navy font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Step indicator */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 md:gap-6">
            <StepDot num={1} label="Delivery Info" />
            <div className={`flex-1 h-0.5 max-w-16 rounded transition-colors duration-300 ${step >= 2 ? 'bg-tw-blue' : 'bg-gray-200'}`} />
            <StepDot num={2} label="Delivery Method" />
            <div className={`flex-1 h-0.5 max-w-16 rounded transition-colors duration-300 ${step >= 3 ? 'bg-tw-blue' : 'bg-gray-200'}`} />
            <StepDot num={3} label="Payment" />
          </div>
        </div>
      </div>

      <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main form */}
          <div className="lg:col-span-2 space-y-5">

            {/* Step 1: Delivery Info */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 space-y-5">
                <h2 className="text-lg font-black text-tw-navy flex items-center gap-2">
                  <MapPin size={20} className="text-tw-blue" /> Delivery Information
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'First Name', field: 'firstName', icon: User, placeholder: 'Chukwuemeka', type: 'text' },
                    { label: 'Last Name', field: 'lastName', icon: User, placeholder: 'Okafor', type: 'text' },
                    { label: 'Email Address', field: 'email', icon: Mail, placeholder: 'you@example.com', type: 'email' },
                    { label: 'Phone Number', field: 'phone', icon: Phone, placeholder: '+234 900 000 0000', type: 'tel' },
                  ].map(({ label, field, icon: Icon, placeholder, type }) => (
                    <div key={field}>
                      <label className="block text-sm font-semibold text-tw-navy mb-1.5">{label}</label>
                      <div className="relative">
                        <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={type}
                          value={form[field as keyof typeof form]}
                          onChange={(e) => update(field, e.target.value)}
                          placeholder={placeholder}
                          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue focus:ring-2 focus:ring-tw-blue/10 transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-tw-navy mb-1.5">Delivery Address</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    placeholder="123 Admiralty Way, Lekki Phase 1"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue focus:ring-2 focus:ring-tw-blue/10 transition-all"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-tw-navy mb-1.5">City</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      placeholder="Lagos"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue focus:ring-2 focus:ring-tw-blue/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-tw-navy mb-1.5">State</label>
                    <select
                      value={form.state}
                      onChange={(e) => update('state', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue focus:ring-2 focus:ring-tw-blue/10 transition-all bg-white"
                    >
                      <option value="">Select</option>
                      {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <button onClick={() => setStep(2)} className="btn-primary w-full py-3.5 justify-center">
                  Continue to Delivery <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Step 2: Delivery Method */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 space-y-5">
                <h2 className="text-lg font-black text-tw-navy flex items-center gap-2">
                  <Truck size={20} className="text-tw-blue" /> Delivery Method
                </h2>

                <div className="space-y-3">
                  {DELIVERY_OPTIONS.map(({ id, label, sub, price }) => (
                    <label
                      key={id}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                        delivery === id
                          ? 'border-tw-blue bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          value={id}
                          checked={delivery === id}
                          onChange={() => setDelivery(id)}
                          className="text-tw-blue"
                        />
                        <div>
                          <p className="font-semibold text-sm text-tw-navy">{label}</p>
                          <p className="text-xs text-gray-500">{sub}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${delivery === id ? 'text-tw-blue' : 'text-tw-navy'}`}>
                        {price === 0 ? 'FREE' : formatPrice(price)}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-outline flex-1 py-3 justify-center">
                    Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1 py-3 justify-center">
                    Continue to Payment <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 space-y-5">
                <h2 className="text-lg font-black text-tw-navy flex items-center gap-2">
                  <CreditCard size={20} className="text-tw-blue" /> Payment Method
                </h2>

                <div className="space-y-3">
                  {[
                    { id: 'card', label: 'Debit / Credit Card', sub: 'Visa, Mastercard, Verve — powered by Paystack' },
                    { id: 'transfer', label: 'Bank Transfer', sub: 'Pay directly to our bank account' },
                    { id: 'whatsapp', label: 'Pay on WhatsApp', sub: 'Chat with us to arrange payment manually' },
                  ].map(({ id, label, sub }) => (
                    <label
                      key={id}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                        payMethod === id ? 'border-tw-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={id}
                        checked={payMethod === id}
                        onChange={() => setPayMethod(id)}
                        className="text-tw-blue"
                      />
                      <div>
                        <p className="font-semibold text-sm text-tw-navy">{label}</p>
                        <p className="text-xs text-gray-500">{sub}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {payMethod === 'card' && (
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-3">
                    <p className="text-xs text-gray-500 font-medium">Card details (secured by Paystack)</p>
                    <input placeholder="1234 5678 9012 3456" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue transition-all bg-white" />
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="MM / YY" className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue transition-all bg-white" />
                      <input placeholder="CVV" className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue transition-all bg-white" />
                    </div>
                  </div>
                )}

                {payMethod === 'transfer' && (
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 space-y-2">
                    <p className="text-sm font-semibold text-tw-navy">Bank Transfer Details</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Bank:</span> GTBank</p>
                      <p><span className="font-medium">Account Name:</span> Techware Nigeria Ltd</p>
                      <p><span className="font-medium">Account No:</span> 0123456789</p>
                      <p className="text-xs text-gray-400 mt-2">Use your phone number as payment reference. Send proof to our WhatsApp to confirm your order.</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-outline flex-1 py-3 justify-center">Back</button>
                  <button
                    onClick={() => alert('Order placed! (Payment integration coming in Step 3 — Supabase + Paystack wiring)')}
                    className="btn-primary flex-1 py-3.5 justify-center"
                  >
                    Place Order — {formatPrice(total)}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Shield size={14} /> Your payment is secured with 256-bit SSL encryption
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-card p-5 space-y-4 lg:sticky lg:top-24">
              <h3 className="font-bold text-tw-navy">Order Summary</h3>

              {/* Items */}
              <div className="space-y-3">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.title} className="flex gap-3 items-start">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover bg-gray-50 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-tw-navy leading-tight line-clamp-2">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.specs}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Qty: {item.qty}</p>
                    </div>
                    <p className="text-xs font-bold text-tw-navy flex-shrink-0">{formatPrice(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span><span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-tw-green' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between font-black text-tw-navy text-base pt-2 border-t border-gray-100">
                  <span>Total</span><span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust */}
              <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100 space-y-1">
                <p className="flex items-center justify-center gap-1"><Shield size={12} /> Secure checkout</p>
                <p>Genuine products · Fast delivery · Easy returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
