import React from 'react';
import Router from './router';

import i18n from './i18n';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: i18n.t('title'),
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
