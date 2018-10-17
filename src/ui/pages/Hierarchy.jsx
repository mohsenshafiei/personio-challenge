import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '../components/List.jsx';
import Filter from '../components/Filter.jsx';
import i18n from '../../i18n';
import { changeFilter, detectMultipleBoss } from '../../store/hierarchy/actions';

const Hierarchy = props => (
    <div className="hierarchy">
      <Filter
        title={i18n.t('filter.title')}
        items={[
          { title: i18n.t('filter.all'), id: 0 },
          { title: i18n.t('filter.name'), id: 1 },
          { title: i18n.t('filter.position'), id: 2 },
          { title: i18n.t('filter.multipleBoss'), id: 3 },
        ]}
        onSelect={(filter) => {
          props.changeFilter(filter.id);
          if (filter.id === 3) {
            props.detectMultipleBoss();
          }
        }}
        display="inline-block"
      />
      <div className="list">
        <List language={i18n.language} />
      </div>
    </div>
);

const mapDispatchToProps = dispatch => ({
  changeFilter: (filter) => {
    dispatch(changeFilter(filter));
  },
  detectMultipleBoss: (filter) => {
    dispatch(detectMultipleBoss(filter));
  },
});

Hierarchy.propTypes = {
  changeFilter: PropTypes.func,
  detectMultipleBoss: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Hierarchy);
