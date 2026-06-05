import { useRef } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { mariaPortrait } from '../data/images.js'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function MariaIntro() {
  const { t } = useTranslation()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-background py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={mariaPortrait}
              alt={t('maria.name')}
              className="w-full h-full object-cover scale-110" style={{ objectPosition: '55% center' }}
            />
          </div>
          {/* Decorative offset border */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-travertine -z-10" />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col"
        >
          <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-widest uppercase text-secondary -ml-[0.05em] mb-[15px]">
            {t('maria.label')}
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-ink leading-none uppercase mb-[15px]">
            {t('maria.name')}
          </motion.h2>

          <div className="w-[330px] h-px bg-travertine mb-[15px]" />

          <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed mb-[15px]">
            {t('maria.p1')}
          </motion.p>
          <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed mb-[15px]">
            <Trans i18nKey="maria.p2" components={{ bold: <strong className="font-bold not-italic text-secondary" /> }} />
          </motion.p>
          <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed mb-[15px]">
            {t('maria.p3')}
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}
