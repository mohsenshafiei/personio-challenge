import React from 'react';
import { expectSaga } from 'redux-saga-test-plan';
import { hierarchyChanged, removePerson } from '../../../src/store/hierarchy/saga';
import { store } from "../../../src/store/index";

describe('Change Hierarchy Snapshot Test', () => {
  const action1 = { type: 'CHANGE_HIERARCHY', personId: '00', leaderId: '001'};
  it('Hierarhcy change error snapshot', () => {
    return expectSaga(hierarchyChanged, action1)
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });

});

describe('Remove Person Snapshot Test', () => {
  let action = { type: 'REMOVE_MULTIPLE_PERSON', personId: '00'};
  it('remove multiple boss snapshot', () => {
    return expectSaga(removePerson, action)
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });
});
