import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../ui/pages/Home.jsx';
import Hierarchy from '../ui/pages/Hierarchy.jsx';

const Router = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/hierarchy' component={Hierarchy}/>
  </Switch>
);
export default Router;
