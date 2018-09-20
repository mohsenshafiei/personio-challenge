import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Home Page',
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <Link to='/hierarchy'>Hierarchy</Link>
      </div>
    );
  }
}

export default Home;