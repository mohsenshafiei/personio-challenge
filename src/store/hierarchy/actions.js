export const fileUpload = payload => (
  {
    type: 'JSON_FILE_UPLOADED',
    payload,
  }
);

export const changeHierarchy = (personId, leaderId) => (
  {
    type: 'CHANGE_HIERARCHY',
    personId,
    leaderId,
  }
);
export const changeFilter = filter => (
  {
    type: 'CHANGE_FILTER',
    filter,
  }
);
export const toggleCollapse = personId => (
  {
    type: 'TOGGLE_COLLAPSE',
    personId,
  }
);
