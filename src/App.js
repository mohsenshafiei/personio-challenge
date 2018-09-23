import React from 'react';
import { Provider } from 'react-redux';
import Router from './router';
import Header from './ui/components/Header.jsx';
import store from './store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <div>
          <Header />
          <Router store={store}/>
        </div>
      </Provider>
    );
  }
}

export default App;
