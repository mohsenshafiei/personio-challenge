import React from 'react';
import { testSaga } from 'redux-saga-test-plan';
import { hierarchyChanged } from '../../../src/store/hierarchy/saga';
import { removePerson } from '../../../src/store/hierarchy/saga';
import actionTypes from "../../../src/store/hierarchy/actionTypes";
import { store } from "../../../src/store/index";
import {getPerson} from "../../../src/store/hierarchy/functions";

describe('Change Hierarchy Test', () => {
  const action1 = { type: 'CHANGE_HIERARCHY', personId: '00', leaderId: '001'};
  it('Should call  notification', () => {
    const saga =  testSaga(hierarchyChanged, action1);
    saga
      .next().put({ type: actionTypes.NOTIFICATION, title: 'This Action Is Not Possible, You Are Making a Loop!', style: 'error' })
      .next().isDone();
  });

  const action2 = { type: 'CHANGE_HIERARCHY', personId: '_0_0_0_1', leaderId: '_0'};
  it('Should change the hierarchy', () => {
    const saga =  testSaga(hierarchyChanged, action2);
    saga
      .next().select(state => getPerson(state.hierarchy.employees, action2.personId))
      .next().put({ type: actionTypes.REMOVE_PERSON, personId: action2.personId })
      .next().put({ type: actionTypes.ADD_PERSON, leaderId: action2.leaderId, person })
      .next().isDone();
  });
});

describe('Remove Person Test', () => {
  let action = { type: 'REMOVE_MULTIPLE_PERSON', personId: '00'};
  it('Should remove a person', () => {
    const saga =  testSaga(removePerson, action);
    saga
      .next().put({ type: actionTypes.REMOVE_PERSON, personId: action.personId })
      .next().put({ type: actionTypes.DETECT_MULTIPLE_BOSS })
      .next().isDone();
  });
});
