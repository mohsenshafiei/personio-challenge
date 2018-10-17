import { takeEvery, put } from 'redux-saga/effects';
import { delay, setLanguage } from './helpers';
import actionTypes from './actionTypes';
import i18n from '../../i18n';

export function* changeLanguage() {
  yield setLanguage();
  yield put({ type: actionTypes.CHANGE_LANGUAGE, payload: i18n.lang });
  return true;
}

export function* fileUpload() {
  // you can send it to server here
  yield put({ type: actionTypes.JSON_FILE_UPLOADED_SUCCESSFUL, payload: true });
}
export function* notification(action) {
  yield put({
    type: actionTypes.NOTIFICATION_CALL,
    payload: true,
    title: action.title,
    style: action.style,
  });
  yield delay(3000);
  yield put({ type: actionTypes.NOTIFICATION_CALL, payload: false, title: action.title });
}

export default [
  takeEvery(actionTypes.SET_LANGUAGE, changeLanguage),
  takeEvery(actionTypes.NOTIFICATION, notification),
  takeEvery(actionTypes.SAVE_JSON_FILE, fileUpload),
];
