import {
  SET_LANGUAGE,
} from './actionTypes';

const changeLanguage = payload => (
  {
    type: SET_LANGUAGE,
    payload,
  }
);

export default changeLanguage;
