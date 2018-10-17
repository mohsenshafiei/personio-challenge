import React from 'react';
import { changeLanguage, notification, fileUpload } from '../../../src/store/main/saga';
import actionTypes from "../../../src/store/main/actionTypes";
import { expectSaga } from 'redux-saga-test-plan';

describe('CHANGE LANGUAGE', () => {
  const action1 = { type: actionTypes.SET_LANGUAGE , payload: 'En' };
  it('change language snapshot', () => {
    return expectSaga(changeLanguage, action1)
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });
});

describe('Notification', () => {
  const action1 = { type: actionTypes.NOTIFICATION, style: 'error', title: 'This Action Is Not Possible, You Are Making a Loop!' };
  it('notification snapshot', () => {
    return expectSaga(notification, action1)
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });
});


describe('File Uploaded', () => {
  const action1 = { type: actionTypes.SAVE_JSON_FILE};
  it('file upload snapshot', () => {
    return expectSaga(fileUpload, action1)
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });
});
