import { put, takeEvery, select } from 'redux-saga/effects';
import { transformEmployees, updateEmployeesIds, getPerson } from './helpers';
import actionTypes from './actionTypes';

export function* hierarchyChanged(action) {
  if (action.leaderId.indexOf(action.personId) === 0) {
    yield put({
      type: actionTypes.NOTIFICATION,
      title: 'This Action Is Not Possible, You Are Making a Loop!',
      style: 'error',
    });
  } else {
    const person = yield select(state => getPerson(state.hierarchy.employees, action.personId));
    if (person) {
      yield put({ type: actionTypes.REMOVE_PERSON, personId: action.personId });
      yield put({ type: actionTypes.ADD_PERSON, leaderId: action.leaderId, person });
    }
  }
}

export function* removePerson(action) {
  yield put({ type: actionTypes.REMOVE_PERSON, personId: action.personId });
  yield put({ type: actionTypes.DETECT_MULTIPLE_BOSS });
}

export function* fileUpload(action) {
  const data = JSON.parse(action.payload);
  const employees = transformEmployees(data);
  window.localStorage.setItem('file', JSON.stringify(updateEmployeesIds(employees)));
  yield put({
    type: actionTypes.JSON_FILE_UPLOADED_SUCCESSFUL,
    payload: true,
    data: updateEmployeesIds(employees),
  });
}

export function* init() {
  const persistedJson = window.localStorage.getItem('file');
  const persistedData = JSON.parse(persistedJson);
  if (persistedData) {
    yield put({
      type: actionTypes.INIT_APP_OK,
      data: persistedData,
    });
  }
}

export default [
  takeEvery(actionTypes.INIT_APP, init),
  takeEvery(actionTypes.JSON_FILE_UPLOADED, fileUpload),
  takeEvery(actionTypes.CHANGE_HIERARCHY, hierarchyChanged),
  takeEvery(actionTypes.REMOVE_MULTIPLE_PERSON, removePerson),
];
