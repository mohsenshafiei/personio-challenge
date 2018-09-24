export const fileUploaded = payload => (
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
