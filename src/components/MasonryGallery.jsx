import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { galleryImages } from '../data/images.js'

export default function MasonryGallery() {
  const { t } = useTranslation()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-background pt-12 pb-24 md:pt-14 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-secondary mb-4">
            {t('site.name')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-5">
            {t('gallery.heading')}
          </h2>
          <div className="w-10 h-px bg-secondary mx-auto mb-5" />
          <p className="font-sans text-sm text-ink/60 max-w-md mx-auto leading-relaxed">
            {t('gallery.subheading')}
          </p>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="masonry-2 md:masonry-3"
        >
          {galleryImages.map((img, idx) => (
            <div
              key={img.id}
              className="masonry-item overflow-hidden group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.05 * idx }}
                className="overflow-hidden"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
