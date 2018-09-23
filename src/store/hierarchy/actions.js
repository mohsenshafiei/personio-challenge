const jsonFileUploaded = payload => (
  {
    type: 'JSON_FILE_UPLOADED',
    payload,
  }
);

export default jsonFileUploaded;
