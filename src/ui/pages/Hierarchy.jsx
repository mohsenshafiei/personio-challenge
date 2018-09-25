import React from 'react';
import List from '../components/List.jsx';
import Filter from '../components/Filter.jsx';
import i18n from '../../i18n';

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
            { title: i18n.t('filter.name'), id: 1 },
            { title: i18n.t('filter.position'), id: 2 },
          ]}
          onSelect={(id) => {
            console.log(id);
          }}
          display="inline"
        />
        <div className="list" >
          <List />
        </div>
      </div>
    );
  }
}

export default Hierarchy;
