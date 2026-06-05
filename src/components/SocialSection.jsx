import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { socialGridImages } from '../data/images.js'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

export default function SocialSection() {
  const { t } = useTranslation()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-surface pt-12 pb-16 md:pt-14 md:pb-20 px-6">
      <div className="max-w-5xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-8">
            {t('social.heading')}
          </h2>

          {/* Social buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <a
              href="https://www.instagram.com/mariacapor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-ink/20 text-ink font-sans text-xs tracking-widest uppercase px-7 py-3 hover:border-primary hover:text-primary transition-colors duration-200"
            >
              <InstagramIcon />
              {t('social.instagram')}
            </a>
            <a
              href="https://www.youtube.com/@More_is_more_with_Maria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-ink/20 text-ink font-sans text-xs tracking-widest uppercase px-7 py-3 hover:border-secondary hover:text-secondary transition-colors duration-200"
            >
              <YouTubeIcon />
              {t('social.youtube')}
            </a>
          </div>
        </motion.div>

        {/* Image grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-2"
        >
          {socialGridImages.map((src, idx) => (
            <div key={idx} className="aspect-square overflow-hidden group">
              <img
                src={src}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
