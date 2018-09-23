const initialState = {
  employees: null,
  upload: false,
};

const hierarchyReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'JSON_FILE_UPLOADED': {
      return {
        ...state,
        employees: action.payload,
      };
    }
    case 'JSON_FILE_UPLOADED_SUCCESSFUL': {
      return {
        ...state,
        upload: action.payload,
      };
    }
    default:
      return state;
  }
};

export default hierarchyReducers;
