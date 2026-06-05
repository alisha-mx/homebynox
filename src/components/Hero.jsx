import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { heroImage } from '../data/images.js'

export default function Hero() {
  const { t } = useTranslation()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Image drifts upward and scales very slightly as you scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  // Hero text and overlay fade out elegantly as you scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.45], ['0%', '-12%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.45, 0.15])

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      {/* Parallax image */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ imageRendering: 'high-quality' }}
          fetchPriority="high"
          decoding="sync"
        />
      </motion.div>

      {/* Dark overlay — fades as image is revealed on scroll */}
      <motion.div
        className="absolute inset-0 bg-ink"
        style={{ opacity: overlayOpacity }}
      />

      {/* Hero content */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="text-center text-linen px-4">
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

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.15em] md:tracking-[0.2em] uppercase mb-6 leading-none">
              {t('hero.title')}
            </h1>

            <p className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase text-linen/75 max-w-sm sm:max-w-md mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <p className="font-sans text-sm tracking-[0.35em] uppercase text-white mt-6 font-bold">
              {t('hero.byline')}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-linen/60"
      >
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-linen/40"
        />
      </motion.div>
    </section>
  )
}
