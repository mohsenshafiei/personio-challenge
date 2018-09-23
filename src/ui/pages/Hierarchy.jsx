import React from 'react';
import List from '../components/List.jsx';

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
        <div className="list" >
          <List />
        </div>
      </div>
    );
  }
}

export default Hierarchy;
