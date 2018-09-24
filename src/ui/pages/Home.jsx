import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '../../i18n';
import Uploader from '../components/Uploader.jsx';
import Personio from '../components/Personio.jsx';

import { fileUpload } from '../../store/hierarchy/actions';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaded: false,
    };
  }

  render() {
    return (<div className="home">
      <div className="logo">
        <Personio/>
      </div>
      <div className="motto">
        <h4>{i18n.t('motto')}</h4>
      </div>
      {!this.state.uploaded
        && <Uploader
          classname="upload"
          onSelect={ (e) => {
            this.setState({ uploaded: true });
            this.props.upload(JSON.parse(e));
          }
          }
      />}
      {this.state.uploaded
        && <div className="links">
        <Link className="links__item" to='/hierarchy'>{i18n.t('links.hierarchy')}</Link>
      </div>}
    </div>);
  }
}

Home.propTypes = {
  upload: PropTypes.func,
};

const mapStateToProps = state => ({
  hierarchy: state.hierarchy,
});
const mapDispatchToProps = dispatch => ({
  upload: (file) => {
    dispatch(fileUpload(file));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
