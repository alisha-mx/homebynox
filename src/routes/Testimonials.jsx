import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
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

function ReviewCarousel({ reviews }) {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(i => (i - 1 + reviews.length) % reviews.length)
  const next = () => setCurrent(i => (i + 1) % reviews.length)

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center">
      <div className="relative w-full h-[440px] sm:h-[360px] md:h-[320px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full text-center px-2"
          >
            <div className="font-serif text-5xl text-secondary leading-none mb-6">"</div>
            <blockquote className="font-serif text-xl md:text-2xl text-ink/80 italic leading-relaxed mb-8">
              {reviews[current].text}
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-px bg-secondary" />
              <span className="font-sans text-[10px] tracking-widest uppercase text-ink">
                {reviews[current].author}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-8 mt-12">
        <button onClick={prev} className="w-10 h-10 flex items-center justify-center border border-linen text-secondary hover:border-secondary transition-colors" aria-label="Previous">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Review ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${i === current ? 'bg-secondary' : 'bg-ink/20'}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 flex items-center justify-center border border-linen text-secondary hover:border-secondary transition-colors" aria-label="Next">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { locale } = useParams()
  const { t } = useTranslation()

  const reviews = t('testimonials.reviews', { returnObjects: true })

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <>
      <Seo pageKey="testimonials" locale={locale} slug="testimonials" />

      {/* ── HERO ── */}
      <header ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0 will-change-transform" style={{ y: heroY, scale: heroScale }}>
          <img
            src="images/testimonial.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ imageRendering: 'high-quality' }}
            fetchPriority="high"
            decoding="sync"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/40" />
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
              {t('testimonials.hero.label')}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic mb-6 leading-tight">
              {t('testimonials.hero.title')}
            </h1>
            <p className="font-sans text-sm text-linen/80 max-w-xl mx-auto leading-relaxed">
              {t('testimonials.hero.subtitle')}
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

      <main className="bg-background">

        {/* ── INTRO + ARTICLE ── */}
        <Section className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-widest uppercase text-secondary">
              {t('testimonials.intro.label')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-ink leading-tight italic">
              {t('testimonials.intro.heading')}
            </motion.h2>
            <div className="w-16 h-px bg-secondary" />
            <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed">
              {t('testimonials.intro.p1')}
            </motion.p>
            <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed">
              {t('testimonials.intro.p2')}
            </motion.p>
            <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed">
              {t('testimonials.intro.p3')}
            </motion.p>
          </div>

          <motion.figure variants={fadeUp} className="lg:col-span-6 relative">
            <div className="relative z-10 overflow-hidden bg-limestone">
              <img src="images/article.png" alt={t('testimonials.article.caption')} className="w-full h-auto object-cover" />
            </div>
            <figcaption className="font-sans text-[10px] tracking-widest uppercase text-ink/50 mt-4 text-center">
              {t('testimonials.article.caption')}
            </figcaption>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-travertine/40 -z-10" />
          </motion.figure>
        </Section>

        {/* ── REVIEWS GRID ── */}
        <Section className="bg-limestone py-14 md:py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-ink mb-6">
                What Clients Say
              </motion.h2>
              <motion.div variants={fadeUp} className="w-16 h-px bg-secondary mx-auto" />
            </div>

            <motion.div variants={fadeUp}>
              <ReviewCarousel reviews={reviews} />
            </motion.div>
          </div>
        </Section>

        <CTASection showCopy={false} showVillaV={false} contactLabel="Let's Connect" />

      </main>
    </>
  )
}
