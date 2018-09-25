const initialState = {
  language: 'En',
  notification: false,
  notificationTitle: '',
  notificationStyle: 'success',
};

const mainReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE': {
      return {
        ...state,
        language: action.payload,
      };
    }
    case 'NOTIFICATION_CALL': {
      return {
        ...state,
        notification: action.payload,
        notificationTitle: action.title,
        notificationStyle: action.style,
      };
    }
    default:
      return state;
  }
};

export default mainReducers;
