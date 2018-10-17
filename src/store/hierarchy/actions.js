import actionTypes from './actionTypes';

export const fileUpload = payload => (
  {
    type: actionTypes.JSON_FILE_UPLOADED,
    payload,
  }
);

export const changeHierarchy = (personId, leaderId) => (
  {
    type: actionTypes.CHANGE_HIERARCHY,
    personId,
    leaderId,
  }
);

export const changeFilter = filter => (
  {
    type: actionTypes.CHANGE_FILTER,
    filter,
  }
);

export const toggleCollapse = personId => (
  {
    type: actionTypes.TOGGLE_COLLAPSE,
    personId,
  }
);

export const detectMultipleBoss = () => (
  {
    type: actionTypes.DETECT_MULTIPLE_BOSS,
  }
);

export const removePerson = personId => (
  {
    type: actionTypes.REMOVE_MULTIPLE_PERSON,
    personId,
  }
);
