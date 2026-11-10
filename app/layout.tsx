import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Techware — Nigeria\'s Trusted Laptop & Tech Marketplace',
    template: '%s | Techware',
  },
  description:
    'Buy genuine Dell, HP, Lenovo and Acer laptops in Nigeria with warranty, fast delivery and clear naira prices. Shop keyboards, mice, chargers, earbuds and phone accessories.',
  keywords: ['laptops Nigeria', 'buy laptop Nigeria', 'Dell laptop', 'HP laptop', 'Lenovo laptop', 'tech accessories Nigeria', 'techware'],
  metadataBase: new URL('https://techware.ng'),
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://techware.ng',
    siteName: 'Techware',
    title: 'Techware — Nigeria\'s Trusted Laptop & Tech Marketplace',
    description: 'Buy genuine Dell, HP, Lenovo and Acer laptops in Nigeria with warranty and fast delivery.',
    images: [{ url: '/banner.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Techware — Nigeria\'s Trusted Laptop & Tech Marketplace',
    description: 'Genuine laptops, warranty included, fast delivery across Nigeria.',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-tw-text">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
