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

export default function Blog() {
  const { locale } = useParams()
  const { t } = useTranslation()

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <>
      <Seo pageKey="blog" locale={locale} slug="blog" />

      {/* ── HERO ── */}
      <header ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0 will-change-transform" style={{ y: heroY, scale: heroScale }}>
          <img
            src="/images/interior-roses.png"
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
              {t('blog.hero.label')}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic mb-6 leading-tight">
              {t('blog.hero.title')}
            </h1>
            <p className="font-sans text-sm text-linen/80 max-w-xl mx-auto leading-relaxed">
              {t('blog.hero.subtitle')}
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

        {/* ── FEATURED ── */}
        <Section className="max-w-6xl mx-auto px-6 pt-24 mb-32">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.25em] uppercase text-secondary mb-4">
              {t('blog.featured.label')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-ink mb-6 leading-tight">
              {t('blog.featured.heading')}
            </motion.h2>
            <motion.div variants={fadeUp} className="w-10 h-px bg-secondary mx-auto mb-6" />
            <motion.p variants={fadeUp} className="font-sans text-sm text-ink/65 leading-relaxed">
              {t('blog.featured.copy')}
            </motion.p>
          </div>
        </Section>

        {/* ── POST GRID ── */}
        <div className="max-w-6xl mx-auto px-6 space-y-32 mb-32">

          {/* Entry 1 — Left Heavy: YouTube */}
          <Section className="grid grid-cols-12 gap-8 items-center">
            <motion.div variants={fadeUp} className="col-span-12 md:col-span-7">
              <div className="aspect-video overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/Z67pfnuaDmU?rel=0&modestbranding=1"
                  title="More is More with Maria"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-5">
              <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-widest uppercase text-secondary">
                {t('blog.posts.youtube.tag')}
              </motion.p>
              <motion.h3 variants={fadeUp} className="font-serif text-2xl md:text-3xl text-ink leading-snug">
                {t('blog.posts.youtube.title')}
              </motion.h3>
              <motion.p variants={fadeUp} className="font-sans text-sm text-ink/65 leading-relaxed">
                {t('blog.posts.youtube.excerpt')}
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="https://www.youtube.com/@More_is_more_with_Maria"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-b border-linen pb-1 font-sans text-[10px] tracking-widest uppercase text-ink hover:border-secondary hover:text-secondary transition-all"
              >
                {t('blog.posts.youtube.cta')}
              </motion.a>
            </div>
          </Section>

          {/* Entry 2 — Right Heavy: Historic Room */}
          <Section className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-4 flex flex-col gap-5 order-2 md:order-1">
              <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-widest uppercase text-secondary">
                {t('blog.posts.historic.tag')}
              </motion.p>
              <motion.h3 variants={fadeUp} className="font-serif text-2xl md:text-3xl text-ink leading-snug">
                {t('blog.posts.historic.title')}
              </motion.h3>
              <motion.p variants={fadeUp} className="font-sans text-sm text-ink/65 leading-relaxed">
                {t('blog.posts.historic.excerpt')}
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="https://www.homebynox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-b border-linen pb-1 font-sans text-[10px] tracking-widest uppercase text-ink hover:border-secondary hover:text-secondary transition-all"
              >
                {t('blog.posts.historic.cta')}
              </motion.a>
            </div>
            <motion.div variants={fadeUp} className="col-span-12 md:col-span-7 md:col-start-6 order-1 md:order-2 group cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/images/interior-roses.png"
                  alt={t('blog.posts.historic.title')}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </motion.div>
          </Section>

          {/* Entry 3 — Magazine Trio */}
          <Section className="flex flex-col gap-12">
            <div className="text-center">
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-ink mb-6">
                My Stories
              </motion.h2>
              <motion.div variants={fadeUp} className="w-16 h-px bg-secondary mx-auto" />
            </div>
          <div className="grid grid-cols-12 gap-8">
            {[
              { key: 'france',    img: '/images/gallery-6.jpg' },
              { key: 'makeover',  img: '/images/gallery-3.jpg',  offset: true },
              { key: 'wallpapers',img: '/images/wallpaper.jpg' },
            ].map(({ key, img, offset }) => (
              <motion.div
                key={key}
                variants={fadeUp}
                className="col-span-12 md:col-span-4 group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden mb-5">
                  <img
                    src={img}
                    alt={t(`blog.posts.${key}.title`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-secondary mb-2">
                  {t(`blog.posts.${key}.tag`)}
                </p>
                <h4 className="font-serif text-xl text-ink mb-2 group-hover:text-secondary transition-colors">
                  {t(`blog.posts.${key}.title`)}
                </h4>
                <p className="font-sans text-sm text-ink/65 leading-relaxed mb-4">
                  {t(`blog.posts.${key}.excerpt`)}
                </p>
                <a href="#" className="inline-block border-b border-linen pb-1 font-sans text-[10px] tracking-widest uppercase text-ink hover:border-secondary hover:text-secondary transition-all">
                  Read More
                </a>
              </motion.div>
            ))}
          </div>
          </Section>

        </div>


        <CTASection />

      </main>
    </>
  )
}
