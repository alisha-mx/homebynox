import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo.jsx'

export default function Testimonials() {
  const { locale } = useParams()
  const { t } = useTranslation()
  return (
    <>
      <Seo pageKey="testimonials" locale={locale} slug="testimonials" />
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <h1 className="font-serif text-4xl text-ink">{t('nav.testimonials')}</h1>
      </div>
    </>
  )
}
