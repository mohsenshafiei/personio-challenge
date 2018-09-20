import i18next from 'i18next';
import En from './languages/en';
import De from './languages/de';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: window.localStorage.getItem('locale') ? window.localStorage.getItem('locale') : 'en',
  resources: {
    en: En,
    de: De,
  },
});

export default i18next;
