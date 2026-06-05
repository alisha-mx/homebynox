import { useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Hero from '../components/Hero.jsx'
import MariaIntro from '../components/MariaIntro.jsx'
import QuoteSection from '../components/QuoteSection.jsx'
import MasonryGallery from '../components/MasonryGallery.jsx'
import EditorialCards from '../components/EditorialCards.jsx'
import SocialSection from '../components/SocialSection.jsx'
import CTASection from '../components/CTASection.jsx'

export default function Home() {
  const { locale } = useParams()

  return (
    <>
      <Seo pageKey="home" locale={locale} />
      <Hero />
      <MariaIntro />
      <QuoteSection />
      <MasonryGallery />
      <EditorialCards />
      <SocialSection />
      <CTASection />
    </>
  )
}
