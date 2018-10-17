import mainReducers from '../../src/store/main/reducers';
import actionTypes from "../../src/store/main/actionTypes";

describe('Hierarchy Reducer', () => {
  it('should return the initial state', () => {
    expect(mainReducers(undefined, {})).toEqual({
      language: 'En',
      notification: false,
      notificationTitle: '',
      notificationStyle: 'success',
    });
  });

  it('should handle CHANGE_LANGUAGE', () => {
    const action = {
      type: 'CHANGE_LANGUAGE',
      payload: 'En'
    };
    expect(mainReducers({}, action)).toEqual({
      language: 'En',
    });

    const action1 = {
      type: 'CHANGE_LANGUAGE',
      payload: 'Dn'
    };
    expect(mainReducers({}, action1)).toEqual({
      language: 'Dn',
    });
  });

  it('should handle NOTIFICATION_CALL', () => {
    const action = {
      type: 'NOTIFICATION_CALL' , payload: true, title: 'Hello', style: 'error',
    };
    expect(mainReducers({}, action)).toEqual({
      notification: true,
      notificationTitle: 'Hello',
      notificationStyle: 'error',
    });

    const action1 = {
      type: 'NOTIFICATION_CALL' , payload: false, title: 'Hello', style: 'error',
    };
    expect(mainReducers({}, action1)).toEqual({
      notification: false,
      notificationTitle: 'Hello',
      notificationStyle: 'error',
    });
  });

});
