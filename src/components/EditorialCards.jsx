import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { editorialImages } from '../data/images.js'
import { buildPath } from '../data/navigation.js'

function EditorialCard({ image, titleKey, descKey, ctaKey, to, delay }) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden relative">
        <img
          src={image}
          alt={t(titleKey)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/45 transition-all duration-500 flex items-center justify-center">
          <Link
            to={to}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 border border-linen text-linen font-sans text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-linen hover:text-ink transition-colors"
          >
            {t(ctaKey)}
          </Link>
        </div>
      </div>

      {/* Text below */}
      <div className="pt-5">
        <h3 className="font-serif text-xl text-ink mb-2">{t(titleKey)}</h3>
        <p className="font-sans text-xs text-ink/60 leading-relaxed">{t(descKey)}</p>
      </div>
    </motion.div>
  )
}

export default function EditorialCards() {
  const { t } = useTranslation()
  const { locale } = useParams()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const cards = [
    {
      image: editorialImages.interiors,
      titleKey: 'editorial.interiors.title',
      descKey: 'editorial.interiors.description',
      ctaKey: 'editorial.interiors.cta',
      to: buildPath(locale, 'interiors'),
      delay: 0,
    },
    {
      image: editorialImages.villaV,
      titleKey: 'editorial.villaV.title',
      descKey: 'editorial.villaV.description',
      ctaKey: 'editorial.villaV.cta',
      to: buildPath(locale, 'villa-v'),
      delay: 0.15,
    },
    {
      image: editorialImages.journal,
      titleKey: 'editorial.journal.title',
      descKey: 'editorial.journal.description',
      ctaKey: 'editorial.journal.cta',
      to: buildPath(locale, 'blog'),
      delay: 0.3,
    },
  ]

  return (
    <section ref={ref} className="bg-linen pt-12 pb-24 md:pt-14 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-ink">{t('editorial.heading')}</h2>
          <div className="w-10 h-px bg-secondary mx-auto mt-5" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {inView && cards.map((card) => (
            <EditorialCard key={card.titleKey} {...card} />
          ))}
        </div>

      </div>
    </section>
  )
}
