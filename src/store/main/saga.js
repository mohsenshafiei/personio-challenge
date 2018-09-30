import { takeEvery, put } from 'redux-saga/effects';
import i18n from '../../i18n';

import actionTypes from './actionTypes';

const delay = ms => new Promise(res => setTimeout(res, ms));

function* changeLanguage() {
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
  yield put({ type: actionTypes.CHANGE_LANGUAGE, payload: i18n.lang });
  return true;
}

function* fileUpload() {
  // you can send it to server here
  yield put({ type: actionTypes.JSON_FILE_UPLOADED_SUCCESSFUL, payload: true });
}
function* notification(action) {
  yield put({
    type: actionTypes.NOTIFICATION_CALL, payload: true, title: action.title, style: action.style,
  });
  yield delay(3000);
  yield put({ type: actionTypes.NOTIFICATION_CALL, payload: false, title: action.title });
}

export default [
  takeEvery(actionTypes.SET_LANGUAGE, changeLanguage),
  takeEvery(actionTypes.NOTIFICATION, notification),
  takeEvery(actionTypes.SAVE_JSON_FILE, fileUpload),
];
