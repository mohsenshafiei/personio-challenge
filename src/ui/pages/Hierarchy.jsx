import React from 'react';
import List from '../components/List.jsx';
import Filter from '../components/Filter.jsx';

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
          title="Filter Items"
          items={[
            { title: 'Names', id: 1 },
            { title: 'Positions', id: 2 },
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
