import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import Seo from '../components/Seo.jsx'

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
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

const LocationIcon = () => (
  <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)
const PhoneIcon = () => (
  <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)
const MailIcon = () => (
  <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

export default function Contact() {
  const { locale } = useParams()
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')
    const subject = encodeURIComponent(`Enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:mariacapor@homebynox.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  const details = [
    { key: 'address', Icon: LocationIcon },
    { key: 'phone', Icon: PhoneIcon },
    { key: 'email', Icon: MailIcon },
  ]

  const inputClass =
    'bg-transparent border-0 border-b border-linen py-3 px-0 focus:outline-none focus:border-secondary transition-colors font-sans text-sm text-ink placeholder-ink/40'

  return (
    <>
      <Seo pageKey="contact" locale={locale} slug="contact" />

      <main className="bg-background pt-32">

        {/* ── IDENTITY HERO ── */}
        <Section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-32">
          <div className="lg:col-span-7">
            <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.2em] uppercase text-secondary mb-4">
              {t('contact.hero.label')}
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-8">
              {t('contact.hero.title')}{' '}
              <span className="italic font-normal text-secondary">{t('contact.hero.titleAccent')}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-sans text-sm md:text-base text-ink/70 leading-relaxed max-w-2xl">
              {t('contact.hero.intro')}
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <div className="aspect-[4/3] lg:aspect-square bg-limestone overflow-hidden">
              <img
                src="images/maria-portrait.png"
                alt="Maria Capor"
                className="w-full h-full object-cover scale-110 grayscale-[0.15] hover:grayscale-0 transition-all duration-700"
                style={{ objectPosition: '55% center' }}
              />
            </div>
          </motion.div>
        </Section>

        {/* ── DETAILS + FORM ── */}
        <Section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Studio details */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div>
              <motion.h2 variants={fadeUp} className="font-serif text-2xl md:text-3xl text-ink mb-8 pb-4 border-b border-linen">
                {t('contact.studio.heading')}
              </motion.h2>
              <div className="flex flex-col gap-7">
                {details.map(({ key, Icon }) => (
                  <motion.div key={key} variants={fadeUp} className="flex items-start gap-5">
                    <Icon />
                    <div>
                      <h4 className="font-sans text-[10px] tracking-widest uppercase text-ink mb-1">
                        {t(`contact.studio.${key}.label`)}
                      </h4>
                      <p className="font-sans text-sm text-ink/65 leading-relaxed">
                        {t(`contact.studio.${key}.value`)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={fadeUp} className="aspect-video bg-limestone overflow-hidden border border-linen/20">
              <img src="images/article.png" alt="" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* Form */}
          <motion.div variants={fadeUp} className="lg:col-span-7 bg-surface p-8 md:p-14 border border-linen/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-travertine/20 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl" />
            <h3 className="font-serif text-3xl md:text-4xl text-ink mb-10">
              {t('contact.form.heading')}
            </h3>

            {sent ? (
              <p className="font-sans text-sm text-ink/70 leading-relaxed">
                Thank you — your email client should now be open. If not, please write to{' '}
                <a href="mailto:mariacapor@homebynox.com" className="text-secondary underline">mariacapor@homebynox.com</a>.
              </p>
            ) : (
              <form className="flex flex-col gap-9" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[10px] tracking-widest uppercase text-secondary">
                      {t('contact.form.name.label')}
                    </label>
                    <input name="name" type="text" required placeholder={t('contact.form.name.placeholder')} className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[10px] tracking-widest uppercase text-secondary">
                      {t('contact.form.email.label')}
                    </label>
                    <input name="email" type="email" required placeholder={t('contact.form.email.placeholder')} className={inputClass} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[10px] tracking-widest uppercase text-secondary">
                    {t('contact.form.message.label')}
                  </label>
                  <textarea name="message" rows="4" required placeholder={t('contact.form.message.placeholder')} className={`${inputClass} resize-none`} />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-primary text-linen px-12 py-4 font-sans text-[11px] uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors flex items-center justify-center gap-3"
                  >
                    {t('contact.form.submit')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </Section>

        {/* ── PHILOSOPHY QUOTE ── */}
        <Section className="bg-limestone/50 py-12 md:py-16 px-6 mt-24 md:mt-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} className="font-serif text-6xl text-secondary leading-none mb-6">"</motion.div>
            <motion.p variants={fadeUp} className="font-serif text-2xl md:text-3xl text-ink italic leading-relaxed mb-8">
              {t('contact.quote.text')}
            </motion.p>
            <motion.div variants={fadeUp} className="w-20 h-px bg-secondary mx-auto mb-5" />
            <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-widest uppercase text-secondary">
              {t('contact.quote.author')}
            </motion.p>
          </div>
        </Section>

      </main>
    </>
  )
}
