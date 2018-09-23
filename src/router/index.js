import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import Home from '../ui/pages/Home.jsx';
import Hierarchy from '../ui/pages/Hierarchy.jsx';
import Error from '../ui/pages/Error.jsx';

const Router = ({ location }) => (
  <div className="router">
  <TransitionGroup className="transition-group">
    <CSSTransition key={location.key} classNames={'fade'} timeout={{ enter: 300, exit: 300 }}>
      <section className="route-section">
        <Switch location={location}>
          <Route exact path="/" component={Home}/>
          <Route exact path="/hierarchy" component={Hierarchy} />
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
};

export default withRouter(Router);
