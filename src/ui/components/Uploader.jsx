import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../i18n';

const Uploader = (props) => {
  const {
    onSelect,
  } = props;

  const onChange = (file) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const content = fileReader.result;
      onSelect(content);
    };
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
