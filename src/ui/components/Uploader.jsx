import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../i18n';

const Uploader = (props) => {
  const {
    onSelect,
  } = props;

  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    onSelect(content);
  };

  const onChange = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className="uploader-component">
    <div className="uploader-btn-wrapper">
      <button className="btn">{i18n.t('inputs.uploader')}</button>
      <input type="file" accept="application/json" onChange={(e) => { onChange(e.target.files[0]); }} />
    </div>
    </div>
  );
};

Uploader.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default Uploader;
