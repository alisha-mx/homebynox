import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { philosophyImage } from '../../data/interiorsContent.js'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function PhilosophySection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-background py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={philosophyImage}
              alt="Maria Capor — Interior Designer"
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-limestone -z-10" />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-6"
        >
          <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.35em] uppercase text-secondary">
            The Studio
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-ink leading-snug">
            Maria Capor's Philosophy
          </motion.h2>

          <div className="w-16 h-px bg-travertine" />

          <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed">
            Maria's approach to interior design is warm, personal and deeply considered. She helps clients create homes that feel beautiful, functional and truly their own, whether that means rethinking one room or shaping the feeling of an entire home.
          </motion.p>

          <motion.p variants={fadeUp} className="font-sans text-sm text-ink/70 leading-relaxed">
            Every project begins with listening. Maria takes time to understand how you live, what you love and how you want your home to feel, before creating a proposal that brings the space together with clarity and care.
          </motion.p>

          <motion.blockquote
            variants={fadeUp}
            className="border-l-2 border-secondary pl-5 mt-2"
          >
            <p className="font-serif text-lg italic text-ink/80 leading-relaxed">
              "Design is about creating a home that feels like you."
            </p>
          </motion.blockquote>
        </motion.div>

      </div>
    </section>
  )
}
