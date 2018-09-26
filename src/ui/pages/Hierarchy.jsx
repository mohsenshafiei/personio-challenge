import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '../components/List.jsx';
import Filter from '../components/Filter.jsx';
import i18n from '../../i18n';

import { changeFilter } from '../../store/hierarchy/actions';

class Hierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Personio Company Hierarchy',
    };
  }

  render() {
    return (
      <div className="hierarchy">
        <Filter
          title={i18n.t('filter.title')}
          items={[
            { title: i18n.t('filter.all'), id: 0 },
            { title: i18n.t('filter.name'), id: 1 },
            { title: i18n.t('filter.position'), id: 2 },
          ]}
          onSelect={(filter) => {
            this.props.changeFilter(filter.title);
          }}
          display="inline-block"
        />
        <div className="list" >
          <List />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeFilter: (filter) => {
    dispatch(changeFilter(filter));
  },
});

Hierarchy.propTypes = {
  changeFilter: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Hierarchy);
