import i18n from '../../i18n';

export const delay = ms => new Promise(res => setTimeout(res, ms));

export const setLanguage = () => {
  if (i18n.language !== 'En') {
    i18n.lang = 'En';
    i18n.changeLanguage('En', (err) => {
      if (err) {
        return false;
      }
      window.localStorage.setItem('locale', 'En');
      return true;
    });
  } else {
    i18n.lang = 'De';
    i18n.changeLanguage('De', (err) => {
      if (err) {
        return false;
      }
      window.localStorage.setItem('locale', 'De');
      return true;
    });
  }
};
