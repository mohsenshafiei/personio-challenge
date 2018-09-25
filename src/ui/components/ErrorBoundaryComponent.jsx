import React from 'react';
import PropTypes from 'prop-types';
import Personio from './Personio.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="logo">
            <Personio/>
          </div>
          <h1 className="title">Oops, something went wrong :(</h1>
        </div>
      );
    }
    return this.props.children;
  }
}


ErrorBoundary.propTypes = {
  children: PropTypes.object,
};

export default ErrorBoundary;
