import i18next from 'i18next';
import En from './languages/en';
import De from './languages/de';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  resources: {
    en: En,
    es: De,
  },
});

export default i18next;
