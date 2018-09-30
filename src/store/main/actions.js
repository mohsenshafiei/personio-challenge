import actionTypes from './actionTypes';

const changeLanguage = payload => (
  {
    type: actionTypes.SET_LANGUAGE,
    payload,
  }
);

export default changeLanguage;
