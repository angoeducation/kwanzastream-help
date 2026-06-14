import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from './locales/pt.json';
import en from './locales/en.json';
import ptBR from './locales/pt-BR.json';
import fr from './locales/fr.json';
import es from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      'pt-BR': { translation: ptBR },
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
    },
    lng: 'pt',
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'pt-BR', 'en', 'fr', 'es'],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
