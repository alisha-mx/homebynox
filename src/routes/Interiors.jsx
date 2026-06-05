import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import CTASection from '../components/CTASection.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function Section({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Portfolio images — reuse existing local images
const portfolioItems = [
  { src: 'images/wallpaper.jpg',       label: 'Villa Walls',   span: 'tall' },
  { src: 'images/img-9528.jpg',        label: 'Makeover',      span: 'square' },
  { src: 'images/gallery-5.jpg',      label: 'Villa V',       span: 'wide' },
  { src: 'images/london.jpg',          label: 'London Decor',  span: 'tall' },
]

export default function Interiors() {
  const { locale } = useParams()
  const { t } = useTranslation()

  // Parallax for hero
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY     = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const services = [
    { key: 'room' },
    { key: 'furniture' },
    { key: 'colours' },
    { key: 'guidance' },
  ]

  return (
    <>
      <Seo pageKey="interiors" locale={locale} slug="interiors" />

      {/* ── HERO ── */}
      <header ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0 will-change-transform" style={{ y: heroY, scale: heroScale }}>
          <img
            src="images/interiors-hero.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ imageRendering: 'high-quality' }}
            fetchPriority="high"
            decoding="sync"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/35" />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 text-linen text-center px-4"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-linen/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-linen/50" />
              <div className="w-16 h-px bg-linen/50" />
            </div>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-linen/80 mb-5">
              {t('interiors.hero.label')}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.05em] leading-tight italic mb-6">
              {t('interiors.hero.title')}
            </h1>
            <p className="font-sans text-sm text-linen/80 max-w-xl mx-auto leading-relaxed">
              {t('interiors.hero.subtitle')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 flex flex-col items-center gap-2 text-linen/60"
          >
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-px h-8 bg-linen/40"
            />
          </motion.div>
        </motion.div>
      </header>

      <main>

        {/* ── PHILOSOPHY ── */}
        <Section className="bg-background py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div variants={fadeUp} className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="images/interior-1.jpg"
                  alt="Maria Capor"
                  className="w-full h-full object-cover scale-110"
                  style={{ objectPosition: '55% center' }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-travertine -z-10" />
            </motion.div>

            <div className="flex flex-col gap-6">
              <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-widest uppercase text-secondary">
                {t('interiors.philosophy.label')}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-ink leading-tight italic">
                {t('interiors.philosophy.heading')}
              </motion.h2>
              <div className="w-[200px] h-px bg-travertine" />
              <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed">
                {t('interiors.philosophy.p1')}
              </motion.p>
              <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed">
                {t('interiors.philosophy.p2')}
              </motion.p>
              <motion.div variants={fadeUp} className="mt-4 text-center">
                <div className="font-serif text-7xl text-secondary leading-none mb-2 select-none" aria-hidden="true">"</div>
                <blockquote className="font-serif text-xl md:text-2xl text-ink leading-relaxed italic">
                  {t('interiors.philosophy.quote')}
                </blockquote>
              </motion.div>
            </div>

          </div>
        </Section>

        {/* ── PROCESS ── */}
        <Section className="bg-limestone py-14 md:py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-ink mb-6">
                {t('interiors.process.heading')}
              </motion.h2>
              <motion.div variants={fadeUp} className="w-16 h-px bg-secondary mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {['step1', 'step2', 'step3'].map((step) => (
                <motion.div key={step} variants={fadeUp} className="flex flex-col items-center text-center group">
                  <div className="relative mb-8">
                    <span className="font-serif text-7xl text-primary select-none">
                      {t(`interiors.process.${step}.number`)}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-4">
                    {t(`interiors.process.${step}.title`)}
                  </h3>
                  <p className="font-sans text-sm text-ink/65 leading-relaxed">
                    {t(`interiors.process.${step}.body`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── TAILORED ASSISTANCE ── */}
        <Section className="bg-background pt-24 pb-6 md:pt-32 md:pb-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-limestone p-10 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10">

              <motion.div variants={fadeUp} className="lg:col-span-4 flex flex-col justify-center">
                <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6 leading-tight">
                  {t('interiors.services.heading')}
                </h2>
                <p className="font-sans text-sm text-ink/65 leading-relaxed">
                  {t('interiors.services.intro')}
                </p>
              </motion.div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(({ key }) => (
                  <motion.div
                    key={key}
                    variants={fadeUp}
                    className="bg-background p-8 border border-linen/40 hover:border-secondary/40 transition-all duration-300"
                  >
                    <h4 className="font-serif text-lg text-ink mb-3">
                      {t(`interiors.services.${key}.title`)}
                    </h4>
                    <p className="font-sans text-sm text-ink/65 leading-relaxed">
                      {t(`interiors.services.${key}.body`)}
                    </p>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </Section>

        {/* ── PORTFOLIO ── */}
        <Section className="bg-background pt-12 md:pt-14 pb-24 md:pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-widest uppercase text-secondary mb-4">
                {t('interiors.portfolio.label')}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-ink mb-6">
                {t('interiors.portfolio.heading')}
              </motion.h2>
              <motion.div variants={fadeUp} className="w-16 h-px bg-secondary mx-auto" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {portfolioItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group overflow-hidden relative aspect-[3/4]"
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-linen font-serif text-lg italic">{item.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <CTASection showCopy={false} showVillaV={false} contactLabel="Let's Connect" />

      </main>
    </>
  )
}
