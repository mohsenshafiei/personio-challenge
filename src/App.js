import React from 'react';
import { Provider } from 'react-redux';
import i18n from './i18n';
import ErrorBoundaryHandler from './ui/components/ErrorBoundaryHandler.jsx';
import Router from './router';
import Header from './ui/components/Header.jsx';
import Notification from './ui/components/Notification.jsx';
import store from './store';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: i18n.language,
    };
  }

  componentDidMount() {
    i18n.on('languageChanged', () => {
      this.setState({
        language: i18n.language,
      });
    });
  }

  render() {
    return (
      <ErrorBoundaryHandler>
        <Provider store={store}>
          <React.Fragment>
            <Header />
            <Router />
            <Notification />
          </React.Fragment>
        </Provider>
      </ErrorBoundaryHandler>
    );
  }
}

export default App;
