import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '../locales/en/common.json'
import sv from '../locales/sv/common.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      sv: { common: sv },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    detection: {
      // We handle locale from URL param manually; this just reads it
      order: ['path', 'localStorage', 'navigator'],
      lookupLocalStorage: 'hbn_language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
