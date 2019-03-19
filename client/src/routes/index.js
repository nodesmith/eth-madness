import React from 'react'
import { Route, Switch } from 'react-router'
import CreateBracket from '../containers/CreateBracket';
import ShowBracket from '../containers/ShowBracket';
import AdminContainer from '../containers/AdminContainer';
import LeaderboardContainer from '../containers/LeaderboardContainer';
import HomePage from '../components/HomePage';

/**
 * Main routes for the application.
 */
const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/bracket/:entryIndex" component={ShowBracket} />
      <Route path="/leaders" component={LeaderboardContainer} />
      <Route path="/admin" component={AdminContainer} />
      <Route component={CreateBracket} />
    </Switch>
  </div>
)

export default routes;
