import React from 'react';
import i18n from '../../i18n';
import { Link } from 'react-router-dom';
import Personio from './Personio.jsx';


const Header = () => (
    <div className="header-component">
      <Link className="logo" to="/">
        <Personio/>
      </Link>
      <a className="language">{i18n.t('language')}</a>
    </div>
);

export default Header;
