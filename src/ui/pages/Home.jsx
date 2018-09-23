import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import i18n from '../../i18n';
import Uploader from '../components/Uploader.jsx';
import Personio from '../components/Personio.jsx';

import jsonFileUploaded from '../../store/hierarchy/actions';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaded: false,
    };
  }

  render() {
    const {
      store,
    } = this.props;

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
            store.dispatch(jsonFileUploaded(JSON.parse(e)));
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
  store: PropTypes.object,
};

export default Home;
