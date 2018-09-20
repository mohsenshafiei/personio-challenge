import React from 'react';
import i18n from '../../i18n';

const Header = () => (
    <div className="header-component">
      <a className="language">{i18n.t('language')}</a>
    </div>
);

export default Header;
