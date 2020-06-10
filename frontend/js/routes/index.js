import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import RecipeLookUp from '../components/RecipeLookup';


const AppRouter = ({history}) => (
  <ConnectedRouter history={history}>
      
      <Switch>
        <Route path="/lookup" component={RecipeLookUp}  />
        <Route path="/lookup/:search" component={RecipeLookUp}  /> 
      </Switch>
      
  </ConnectedRouter>
);

export default AppRouter;