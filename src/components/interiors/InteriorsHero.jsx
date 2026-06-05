import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { interiorsHeroImage } from '../../data/interiorsContent.js'

export default function InteriorsHero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imageY     = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const contentY       = useTransform(scrollYProgress, [0, 0.45], ['0%', '-12%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.5, 0.2])

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax image */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src={interiorsHeroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
          decoding="sync"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div className="absolute inset-0 bg-ink" style={{ opacity: overlayOpacity }} />

      {/* Content */}
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
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-linen/60 mb-6">
              Bespoke Design Services
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-linen/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-linen/40" />
              <div className="w-16 h-px bg-linen/40" />
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-10 text-white">
              The Art of<br />Slow Living
            </h1>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col items-center gap-2 text-linen/50 mt-4"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-px h-10 bg-linen/40"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
