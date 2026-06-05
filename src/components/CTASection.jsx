import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { buildPath } from '../data/navigation.js'

export default function CTASection({ showCopy = true, showVillaV = true, contactLabel = null }) {
  const { t } = useTranslation()
  const { locale } = useParams()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-primary py-14 md:py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-linen/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-linen/30" />
          <div className="w-12 h-px bg-linen/30" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-linen leading-tight mb-6">
          <Trans i18nKey="cta.heading" components={{ italic: <em /> }} />
        </h2>

        {showCopy && (
          <p className="font-sans text-sm text-linen/70 leading-relaxed mb-10 max-w-md mx-auto">
            {t('cta.copy')}
          </p>
        )}

        <div className={`flex flex-wrap items-center justify-center gap-4 ${showCopy ? '' : 'mt-10'}`}>
          <Link
            to={buildPath(locale, 'contact')}
            className="font-sans text-[11px] tracking-widest uppercase border border-linen/50 text-linen px-8 py-3.5 hover:bg-linen/10 transition-colors duration-200"
          >
            {contactLabel || t('cta.contact')}
          </Link>
          {showVillaV && (
            <Link
              to={buildPath(locale, 'villa-v')}
              className="font-sans text-[11px] tracking-widest uppercase border border-linen/50 text-linen px-8 py-3.5 hover:bg-linen/10 transition-colors duration-200"
            >
              {t('cta.villaV')}
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  )
}
