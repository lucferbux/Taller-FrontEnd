import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enus from './locales/en-us.json';
import eses from './locales/es-es.json';

const resources = {
  en: {
    translation: enus
  },
  es: {
    translation: eses
  }
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
