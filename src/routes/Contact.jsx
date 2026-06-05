import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo.jsx'

export default function Contact() {
  const { locale } = useParams()
  const { t } = useTranslation()
  return (
    <>
      <Seo pageKey="contact" locale={locale} slug="contact" />
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <h1 className="font-serif text-4xl text-ink">{t('nav.contact')}</h1>
      </div>
    </>
  )
}
