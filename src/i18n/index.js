import i18next from 'i18next';
import En from './languages/en';
import De from './languages/de';

i18next.init({
  lng: window.localStorage.getItem('locale') || 'En',
  resources: {
    En,
    De,
  },
});

export default i18next;
