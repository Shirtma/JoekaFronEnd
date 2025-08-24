import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Rooms from './rooms';
import Spaces from '../Spaces'

function RoomsComponent() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={ match.path } component={ Rooms } />
      <Route path={`${match.path}/space/:id`} component={Spaces} />
    </Switch>
  );
}

export default RoomsComponent;
