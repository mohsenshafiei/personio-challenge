import i18next from 'i18next';
import en from './languages/en';
import de from './languages/de';

i18next.init({
  lng: window.localStorage.getItem('locale') || 'en',
  resources: {
    en,
    de,
  },
});

export default i18next;
