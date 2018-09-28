import {
  put, takeEvery, select,
} from 'redux-saga/effects';

const getPerson = (employees = [], personId) => {
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

function* hierarchyChanged(action) {
  if (action.leaderId.indexOf(action.personId) === 0) {
    yield put({ type: 'NOTIFICATION', title: 'This Action Is Not Possible, You Are Making a Loop!', style: 'error' });
  } else {
    const person = yield select(state => getPerson(state.hierarchy.employees, action.personId));
    if (person) {
      yield put({ type: 'REMOVE_PERSON', personId: action.personId });
      yield put({ type: 'ADD_PERSON', leaderId: action.leaderId, person });
    }
  }
}
function* removeMultiplePerson(action) {
  yield put({ type: 'REMOVE_PERSON', personId: action.personId });
  yield put({ type: 'DETECT_MULTIPLE_BOSS' });
}

function* fileUpload() {
  // you can send it to server here
  yield put({ type: 'JSON_FILE_UPLOADED_SUCCESSFUL', payload: true });
}

export default [
  takeEvery('JSON_FILE_UPLOADED', fileUpload),
  takeEvery('CHANGE_HIERARCHY', hierarchyChanged),
  takeEvery('REMOVE_MULTIPLE_PERSON', removeMultiplePerson),
];
