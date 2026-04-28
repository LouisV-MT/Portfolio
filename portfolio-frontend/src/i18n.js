import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';

i18n
  // Detects user's browser language (e.g., 'fr-CA' becomes 'fr')
  .use(LanguageDetector)
  // Passes i18n instance to react-i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
    },
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;