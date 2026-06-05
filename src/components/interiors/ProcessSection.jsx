import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { processSteps } from '../../data/interiorsContent.js'

export default function ProcessSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="bg-limestone py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-secondary mb-4">
            How We Work
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink">Our Process</h2>
          <div className="w-10 h-px bg-travertine mx-auto mt-5" />
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * idx, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-background p-8 md:p-10 group"
            >
              {/* Large background number */}
              <span className="absolute top-4 right-6 font-serif text-7xl md:text-8xl text-limestone/80 leading-none select-none pointer-events-none group-hover:text-travertine transition-colors duration-300">
                {step.number}
              </span>

              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-secondary mb-4 relative z-10">
                Step {step.number}
              </p>
              <h3 className="font-serif text-xl md:text-2xl text-ink mb-4 relative z-10">
                {step.title}
              </h3>
              <div className="w-8 h-px bg-travertine mb-5 relative z-10" />
              <p className="font-sans text-sm text-ink/65 leading-relaxed relative z-10">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
