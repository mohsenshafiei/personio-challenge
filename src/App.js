import React from 'react';
import Router from './router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Hello Personio',
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <Router />
      </div>
    );
  }
}

export default App;
