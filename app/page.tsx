import type { Metadata } from 'next'
import HeroBanner from '@/components/home/HeroBanner'
import TrustBar from '@/components/home/TrustBar'
import FeaturedCategories from '@/components/home/FeaturedCategories'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import DealsBanner from '@/components/home/DealsBanner'
import WhyTechware from '@/components/home/WhyTechware'
import NewsletterStrip from '@/components/home/NewsletterStrip'

export const metadata: Metadata = {
  title: 'Techware — Nigeria\'s Trusted Laptop & Tech Marketplace',
  description:
    'Buy genuine Dell, HP, Lenovo and Acer laptops in Nigeria with warranty, fast delivery and clear naira prices.',
}

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBar />
      <FeaturedCategories />
      <FeaturedProducts />
      <DealsBanner />
      <WhyTechware />
      <NewsletterStrip />
    </>
  )
}
