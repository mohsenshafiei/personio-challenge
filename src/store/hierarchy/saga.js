import {
  put, takeEvery,
} from 'redux-saga/effects';

function* jsonFileUploaded() {
  yield put({ type: 'JSON_FILE_UPLOADED_SUCCESSFUL', payload: true });
}

export default [
  takeEvery('JSON_FILE_UPLOADED', jsonFileUploaded),
];
