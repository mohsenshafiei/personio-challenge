import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '../../i18n';
import Personio from './Personio.jsx';
import changeLanguage from '../../store/main/actions';

const Header = props => (
    <div className="header-component">
      <Link className="logo" to="/" >
        <Personio />
      </Link>
      <a className="language" onClick={ () => { props.changeLanguage(i18n.t('language')); } }>{i18n.t('language')}</a>
    </div>
);

Header.propTypes = {
  main: PropTypes.object,
  changeLanguage: PropTypes.func,
};

const mapStateToProps = state => ({
  main: state.main,
});
const mapDispatchToProps = dispatch => ({
  changeLanguage: (payload) => {
    dispatch(changeLanguage(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
