import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';

const Error = props => (
  <div className="error">
    { props.error === 404
    && <div className="not-found-page">
          <h4 className="not-found-page__title">{props.error}</h4>
          <p className="not-found-page__subtitle">{i18n.t('errors.notFoundPage')}</p>
          <Link className="not-found-page__link" to="/">{i18n.t('links.goBackHomePage')}</Link>
       </div>
    }
  </div>
);

Error.propTypes = {
  error: PropTypes.number,
};
export default Error;
