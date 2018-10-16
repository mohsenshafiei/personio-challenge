import {
  put, takeEvery, select,
} from 'redux-saga/effects';

import actionTypes from './actionTypes';

export const getPerson = (employees = [], personId) => {
  let employee = employees.find(person => person.id === personId);
  if (employee) {
    return employee;
  }
  for (let i = 0; i < employees.length; i += 1) {
    employee = getPerson(employees[i].employees, personId);
    if (employee) {
      return employee;
    }
  }
  return undefined;
};

export function* hierarchyChanged(action) {
  if (action.leaderId.indexOf(action.personId) === 0) {
    yield put({ type: actionTypes.NOTIFICATION, title: 'This Action Is Not Possible, You Are Making a Loop!', style: 'error' });
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

export function* fileUpload() {
  // you can send it to server here
  yield put({ type: actionTypes.JSON_FILE_UPLOADED_SUCCESSFUL, payload: true });
}

export default [
  takeEvery(actionTypes.JSON_FILE_UPLOADED, fileUpload),
  takeEvery(actionTypes.CHANGE_HIERARCHY, hierarchyChanged),
  takeEvery(actionTypes.REMOVE_MULTIPLE_PERSON, removePerson),
];
