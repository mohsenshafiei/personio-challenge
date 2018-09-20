import React from 'react';

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
      </div>
    );
  }
}

export default App;
