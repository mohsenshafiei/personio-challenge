import React from 'react';

class Hierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Hierarchy Page',
    };
  }

  render() {
    return (
      <div>{this.state.title}</div>
    );
  }
}

export default Hierarchy;
