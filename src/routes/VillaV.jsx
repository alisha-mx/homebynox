import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import { buildPath } from '../data/navigation.js'

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

const detailIcons = {
  bedrooms: (
    <svg className="w-6 h-6 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  pool: (
    <svg className="w-6 h-6 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1M4.22 4.22l.707.707M18.364 18.364l.707.707M1 12h1m20 0h1M4.22 19.778l.707-.707M18.364 5.636l.707-.707M12 6a6 6 0 100 12 6 6 0 000-12z" />
    </svg>
  ),
  kitchen: (
    <svg className="w-6 h-6 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18M10 3v18M14 3v18" />
    </svg>
  ),
  location: (
    <svg className="w-6 h-6 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
}

function ReviewCarousel({ t }) {
  const reviews = ['review1', 'review2', 'review3', 'review4', 'review5', 'review6', 'review7', 'review8', 'review9']
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(i => (i - 1 + reviews.length) % reviews.length)
  const next = () => setCurrent(i => (i + 1) % reviews.length)

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
      <motion.div
        key={current}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-linen/5 border border-linen/10 p-10 md:p-14 max-w-3xl mx-auto"
      >
        <div className="font-serif text-4xl text-secondary mb-6 leading-none">"</div>
        <p className="font-serif text-base md:text-lg text-linen/85 italic leading-relaxed mb-8">
          {t(`villaV.reviews.${reviews[current]}.text`)}
        </p>
        <div className="flex items-center gap-4">
          <div className="w-10 h-px bg-secondary" />
          <span className="font-sans text-[10px] tracking-widest uppercase text-linen/50">
            {t(`villaV.reviews.${reviews[current]}.author`)}
          </span>
        </div>
      </motion.div>
      </AnimatePresence>

      {/* Arrows + dots */}
      <div className="flex items-center justify-center gap-8 mt-10">
        <button onClick={prev} className="w-10 h-10 border border-linen/20 flex items-center justify-center text-linen/60 hover:border-secondary hover:text-secondary transition-colors duration-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${i === current ? 'bg-secondary' : 'bg-linen/30'}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 border border-linen/20 flex items-center justify-center text-linen/60 hover:border-secondary hover:text-secondary transition-colors duration-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function VillaV() {
  const { locale } = useParams()
  const { t } = useTranslation()

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <>
      <Seo pageKey="villaV" locale={locale} slug="villa-v" />

      {/* ── HERO ── */}
      <header ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0 will-change-transform" style={{ y: heroY, scale: heroScale }}>
          <img
            src="images/drone.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ imageRendering: 'high-quality' }}
            fetchPriority="high"
            decoding="sync"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/25" />
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
              {t('villaV.hero.label')}
            </p>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl tracking-wide italic mb-6">
              {t('villaV.hero.title')}
            </h1>
            <p className="font-sans text-sm text-linen/80 max-w-xl mx-auto leading-relaxed mb-10">
              {t('villaV.hero.subtitle')}
            </p>
            <a
              href="https://www.airbnb.co.uk/rooms/18247636?location=Konavle%2C+Croatia&source_impression_id=p3_1596053115_lWGeqJ03pNdFNHh3&guests=1&adults=1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[11px] tracking-widest uppercase border border-linen/60 text-linen px-10 py-3.5 hover:bg-white hover:text-secondary hover:border-white transition-colors duration-200"
            >
              {t('villaV.booking.airbnb')}
            </a>
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

        {/* ── STORYTELLING ── */}
        <Section className="bg-background py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-widest uppercase text-secondary">
                {t('villaV.story.label')}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-ink leading-tight">
                {t('villaV.story.heading')}
              </motion.h2>
              <div className="w-16 h-px bg-secondary" />
              <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed">
                {t('villaV.story.p1')}
              </motion.p>
              <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed">
                {t('villaV.story.p2')}
              </motion.p>
              <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed">
                {t('villaV.story.p3')}
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="lg:col-span-7 relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="images/gallery-5.jpg"
                  alt="Villa V"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-travertine -z-10" />
            </motion.div>
          </div>
        </Section>

        {/* ── VIDEO SECTION ── */}
        <Section className="bg-ink py-32 md:py-40 relative overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img src="images/villa-v-pool.png" alt="" className="w-full h-full object-cover blur-sm" />
          </div>
          <motion.div variants={fadeUp} className="relative z-10 max-w-3xl mx-auto text-center px-6">
            <a
              href="https://www.youtube.com/@More_is_more_with_Maria"
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-20 rounded-full border border-linen/30 bg-linen/10 backdrop-blur-md flex items-center justify-center mb-10 mx-auto hover:scale-110 transition-transform duration-300"
            >
              <svg className="w-8 h-8 text-linen ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
            <h3 className="font-serif text-3xl md:text-4xl text-linen mb-4">{t('villaV.video.heading')}</h3>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-linen/60">{t('villaV.video.subtitle')}</p>
          </motion.div>
        </Section>

        {/* ── GALLERY ── */}
        <Section className="bg-background py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14">
              <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-widest uppercase text-secondary mb-3">
                {t('villaV.gallery.label')}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-ink">
                {t('villaV.gallery.heading')}
              </motion.h2>
              <motion.div variants={fadeUp} className="w-12 h-px bg-secondary mt-5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <motion.div variants={fadeUp} className="md:col-span-8 group cursor-pointer">
                <div className="aspect-video overflow-hidden mb-4">
                  <img src="images/img-1253.jpg" alt={t('villaV.gallery.feature.title')} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h4 className="font-serif text-xl text-ink mb-1">{t('villaV.gallery.feature.title')}</h4>
                <p className="font-sans text-[10px] tracking-widest uppercase text-ink/50 mb-8">{t('villaV.gallery.feature.caption')}</p>
                <div className="group cursor-pointer">
                  <div className="aspect-video overflow-hidden mb-4">
                    <img src="images/villa-v-pool.png" alt="Villa V Pool" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h4 className="font-serif text-xl text-ink mb-1">The Infinity Pool</h4>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-ink/50">Private Outdoor Living</p>
                </div>
              </motion.div>

              <div className="md:col-span-4 flex flex-col gap-10">
                <motion.div variants={fadeUp} className="group cursor-pointer">
                  <div className="aspect-square overflow-hidden mb-4">
                    <img src="images/gallery-3.jpg" alt={t('villaV.gallery.dining.title')} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h4 className="font-serif text-lg text-ink mb-1">{t('villaV.gallery.dining.title')}</h4>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-ink/50">{t('villaV.gallery.dining.caption')}</p>
                </motion.div>

                <motion.div variants={fadeUp} className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden mb-4">
                    <img src="images/gallery-7.jpg" alt={t('villaV.gallery.interiors.title')} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h4 className="font-serif text-lg text-ink mb-1">{t('villaV.gallery.interiors.title')}</h4>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-ink/50">{t('villaV.gallery.interiors.caption')}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── PROPERTY DETAILS ── */}
        <Section className="bg-limestone py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
            <motion.div variants={fadeUp} className="lg:col-span-1">
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-5">{t('villaV.details.heading')}</h2>
              <div className="w-12 h-px bg-secondary mb-6" />
              <p className="font-sans text-sm text-ink/70 leading-relaxed">{t('villaV.details.copy')}</p>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2">
              {['bedrooms', 'pool', 'kitchen', 'location'].map(key => (
                <motion.div key={key} variants={fadeUp} className="p-6 border-b border-linen flex gap-5 items-start">
                  {detailIcons[key]}
                  <div>
                    <h5 className="font-sans text-[10px] tracking-widest uppercase text-ink mb-2">
                      {t(`villaV.details.${key}.title`)}
                    </h5>
                    <p className="font-sans text-sm text-ink/65 leading-relaxed">
                      {t(`villaV.details.${key}.body`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── LOCATION ── */}
        <Section className="bg-background py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} className="aspect-video overflow-hidden bg-travertine">
              <iframe
                title="Villa V Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23138.6!2d18.2190!3d42.5800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134b42e2a1234567%3A0x0!2sCavtat%2C+Croatia!5e0!3m2!1sen!2shr!4v1"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </motion.div>

            <div className="flex flex-col gap-6">
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-ink">
                {t('villaV.location.heading')}
              </motion.h2>
              <div className="w-12 h-px bg-secondary" />
              <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed">
                {t('villaV.location.copy')}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col">
                {['dubrovnik', 'airport', 'cavtat'].map(key => (
                  <div key={key} className="flex justify-between border-b border-linen py-3">
                    <span className="font-sans text-[10px] tracking-widest uppercase text-ink">
                      {t(`villaV.location.${key}.label`)}
                    </span>
                    <span className="font-sans text-[10px] tracking-wider uppercase text-ink/50">
                      {t(`villaV.location.${key}.time`)}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ── REVIEWS ── */}
        <Section className="bg-ink py-14 md:py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-widest uppercase text-secondary mb-4">
                {t('villaV.reviews.label')}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-linen">
                {t('villaV.reviews.heading')}
              </motion.h2>
            </div>

            <ReviewCarousel t={t} />
          </div>
        </Section>

        {/* ── BOOKING CTA ── */}
        <Section className="bg-background py-14 md:py-20 px-6">
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-ink italic mb-5">
              {t('villaV.booking.heading')}
            </h2>
            <div className="w-12 h-px bg-secondary mx-auto mb-8" />
            <p className="font-sans text-sm text-ink/65 leading-relaxed mb-10">
              {t('villaV.booking.copy')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.airbnb.co.uk/rooms/18247636?location=Konavle%2C+Croatia&source_impression_id=p3_1596053115_lWGeqJ03pNdFNHh3&guests=1&adults=1"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[11px] tracking-widest uppercase bg-primary text-linen px-10 py-3.5 hover:bg-primary/90 transition-colors duration-200"
              >
                {t('villaV.booking.airbnb')}
              </a>
              <Link
                to={buildPath(locale, 'contact')}
                className="font-sans text-[11px] tracking-widest uppercase border border-secondary text-secondary px-10 py-3.5 hover:bg-secondary hover:text-linen transition-all duration-200"
              >
                {t('villaV.booking.enquire')}
              </Link>
            </div>
          </motion.div>
        </Section>

      </main>
    </>
  )
}
