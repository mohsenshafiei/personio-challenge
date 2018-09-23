import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import Home from '../ui/pages/Home.jsx';
import Hierarchy from '../ui/pages/Hierarchy.jsx';
import Error from '../ui/pages/Error.jsx';

const Router = ({ location, store }) => (
  <div className="router">
  <TransitionGroup className="transition-group">
    <CSSTransition key={location.key} classNames={'fade'} timeout={{ enter: 300, exit: 300 }}>
      <section className="route-section">
        <Switch location={location}>
          <Route exact path="/" render={() => <Home store={store}/>} />
          <Route exact path="/hierarchy" render={() => <Hierarchy store={store.hierarchy} />} />
          <Route render={() => <Error error={404}/>} />
        </Switch>
      </section>
    </CSSTransition>
  </TransitionGroup>
  </div>
);

Router.propTypes = {
  location: PropTypes.shape({
    location: PropTypes.object,
  }),
  store: PropTypes.object,
};

export default withRouter(Router);
