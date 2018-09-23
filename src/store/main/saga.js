import { takeEvery } from 'redux-saga/effects';
import i18n from '../../i18n';

function changeLanguage() {
  if (i18n.language !== 'en') {
    i18n.lang = 'en';
    i18n.changeLanguage('en', (err) => {
      if (err) {
        return false;
      }
      window.localStorage.setItem('locale', 'en');
      return true;
    });
  } else {
    i18n.lang = 'de';
    i18n.changeLanguage('de', (err) => {
      if (err) {
        return false;
      }
      window.localStorage.setItem('locale', 'de');
      return true;
    });
  }
}

export default [
  takeEvery('CHANGE_LANGUAGE', changeLanguage),
];
