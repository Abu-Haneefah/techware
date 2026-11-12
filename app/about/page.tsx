
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Store,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Techware | Nigeria's Trusted Tech Marketplace",
  description:
    "Learn about Techware — our mission to make buying genuine laptops and tech accessories simple, trusted, and affordable for everyone in Nigeria.",
};

const TEAM = [
  {
    name: "Adebayo Okafor",
    role: "Founder & CEO",
    initials: "AO",
    color: "bg-tw-blue",
  },
  {
    name: "Ngozi Eze",
    role: "Head of Vendor Relations",
    initials: "NE",
    color: "bg-tw-green-dark",
  },
  {
    name: "Emeka Chukwu",
    role: "Head of Technology",
    initials: "EC",
    color: "bg-purple-600",
  },
  {
    name: "Fatima Musa",
    role: "Head of Customer Experience",
    initials: "FM",
    color: "bg-orange-500",
  },
];

const VALUES = [
  {
    icon: Store,
    title: "Trust First",
    desc: "Every product on Techware is verified authentic. We build trust with every transaction.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    desc: "Our team is always ready to help — via WhatsApp, email, or our help center.",
  },
  {
    icon: TrendingUp,
    title: "Empowering Vendors",
    desc: "We help Nigerian tech businesses grow by giving them access to thousands of buyers.",
  },
  {
    icon: Award,
    title: "Quality Always",
    desc: "From listing review to post-purchase support, quality is our standard.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-tw-grey border-b border-gray-100">
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-tw-blue transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-tw-navy font-medium">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-hero-gradient py-16 md:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-max mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tw-green/20 border border-tw-green/30 text-tw-green text-sm font-semibold mb-5">
            <Store size={14} /> Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
            We&apos;re building Nigeria&apos;s most
            <br />
            <span className="text-tw-green">trusted tech marketplace.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Techware was founded to solve the trust problem in Nigerian tech
            shopping — fake products, hidden fees, and poor after-sales support.
            We built a platform where every product is genuine and every
            customer is valued.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section-padding bg-tw-grey">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <h2 className="text-3xl md:text-4xl font-black text-tw-navy">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To make buying genuine laptops and tech accessories simple,
                trusted, and affordable for every Nigerian — whether you&apos;re
                a student in Kano, a professional in Lagos, or a startup founder
                in Abuja.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We do this by carefully vetting every vendor, verifying every
                product listing, and standing behind every sale with our
                guarantee. When you shop on Techware, you can buy with
                confidence.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { value: "10,000+", label: "Happy customers" },
                  { value: "500+", label: "Products listed" },
                  { value: "50+", label: "Verified vendors" },
                  { value: "36", label: "States we deliver to" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="bg-white rounded-2xl p-4 shadow-card"
                  >
                    <div className="text-2xl font-black text-tw-blue">
                      {value}
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-tw-navy to-tw-blue rounded-3xl p-8 text-white space-y-4">
                <div className="text-5xl font-black text-tw-green">&quot;</div>
                <p className="text-xl font-semibold leading-relaxed">
                  See it from every side.
                </p>
                <p className="text-white/70 text-sm">
                  Our tagline isn&apos;t just about 3D product views. It&apos;s
                  about transparency — in pricing, in product quality, and in
                  the way we do business.
                </p>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm font-semibold">Adebayo Okafor</p>
                  <p className="text-xs text-white/50">Founder, Techware</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-tw-green/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="section-title">What we stand for</h2>
            <p className="section-subtitle">
              The values that guide everything we do at Techware.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-tw-grey rounded-2xl p-6 hover:bg-blue-50 transition-colors duration-300 hover:-translate-y-1 hover:shadow-card group"
              >
                <div className="w-12 h-12 rounded-xl bg-tw-blue/10 flex items-center justify-center mb-4 group-hover:bg-tw-blue/20 transition-colors">
                  <Icon size={24} className="text-tw-blue" />
                </div>
                <h3 className="font-bold text-tw-navy mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-tw-grey">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="section-title">The Team</h2>
            <p className="section-subtitle">
              The people building Techware every day.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
            {TEAM.map(({ name, role, initials, color }) => (
              <div key={name} className="text-center">
                <div
                  className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mx-auto mb-3`}
                >
                  <span className="text-white font-black text-xl">
                    {initials}
                  </span>
                </div>
                <p className="font-bold text-tw-navy text-sm">{name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">We&apos;d love to hear from you.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contact info */}
            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  title: "Office",
                  info: "24 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
                },
                {
                  icon: Phone,
                  title: "Phone / WhatsApp",
                  info: "+234 906 911 5484",
                },
                { icon: Mail, title: "Email", info: "hello@techware.ng" },
                {
                  icon: Clock,
                  title: "Support Hours",
                  info: "Mon–Sat: 8am – 8pm · Sun: 10am – 6pm",
                },
              ].map(({ icon: Icon, title, info }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-tw-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-tw-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-tw-navy">
                      {title}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">{info}</p>
                  </div>
                </div>
              ))}

              <a
                href="https://wa.me/2349069115484"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green inline-flex mt-4"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>

            {/* Contact form */}
            <div className="bg-tw-grey rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-tw-navy">Send us a message</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="First Name"
                  className="col-span-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue transition-all bg-white"
                />
                <input
                  placeholder="Last Name"
                  className="col-span-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue transition-all bg-white"
                />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue transition-all bg-white"
              />
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue transition-all bg-white text-gray-500">
                <option value="">Subject</option>
                <option>Order issue</option>
                <option>Product inquiry</option>
                <option>Vendor application</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
              <textarea
                rows={4}
                placeholder="Your message..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-tw-blue transition-all bg-white resize-none"
              />
              <button className="btn-primary w-full justify-center py-3">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
