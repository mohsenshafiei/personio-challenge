const initialState = {
  language: 'En',
};

const mainReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE': {
      return {
        ...state,
        language: action.payload,
      };
    }
    default:
      return state;
  }
};

export default mainReducers;
