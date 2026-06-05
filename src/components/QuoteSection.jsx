import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'

export default function QuoteSection() {
  const { t } = useTranslation()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-limestone py-14 md:py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* Opening quote mark */}
        <div className="font-serif text-7xl text-secondary leading-none mb-4 select-none" aria-hidden="true">"</div>

        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-ink leading-relaxed italic mb-8">
          {t('quote.text')}
        </blockquote>

        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-10 h-px bg-travertine" />
          <div className="w-1 h-1 rounded-full bg-travertine" />
          <div className="w-10 h-px bg-travertine" />
        </div>

        <cite className="font-sans text-[10px] tracking-[0.3em] uppercase text-ink/50 not-italic">
          — {t('quote.attribution')}
        </cite>
      </motion.div>
    </section>
  )
}
