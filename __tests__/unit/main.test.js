import React from 'react';
import { testSaga } from 'redux-saga-test-plan';
import { changeLanguage, notification, fileUpload } from '../../src/store/main/saga';
import actionTypes from "../../src/store/main/actionTypes";
import i18n from "../../src/i18n";

describe('CHANGE LANGUAGE', () => {
  const action1 = { type: actionTypes.SET_LANGUAGE , payload: 'En' };
  it('Should change Language', () => {
    const saga =  testSaga(changeLanguage, action1);
    saga.next().put({ type: actionTypes.CHANGE_LANGUAGE, payload: i18n.lang })
      .next().isDone();
  });
});

describe('Notification', () => {
  const action1 = { type: actionTypes.NOTIFICATION, style: 'error', title: 'This Action Is Not Possible, You Are Making a Loop!' };
  it('Should show a notification', () => {
    const saga =  testSaga(notification, action1);
    const action = { style: 'error', title: 'This Action Is Not Possible, You Are Making a Loop!'};
    saga.next().put({
      type: actionTypes.NOTIFICATION_CALL, payload: true, title: action.title, style: action.style,
    })
  });
});


describe('File Uploaded', () => {
  const action1 = { type: actionTypes.SAVE_JSON_FILE};
  it('Save the json file on server', () => {
    const saga =  testSaga(fileUpload, action1);
    saga.next().put({ type: actionTypes.JSON_FILE_UPLOADED_SUCCESSFUL, payload: true })
      .next().isDone();
  });
});
