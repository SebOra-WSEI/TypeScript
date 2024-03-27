import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProjectsPage } from './components/ProjectsPage/ProjectPage';
import { routeBuilder } from './routes/routes';
import { NotFound } from './components/common/NotFound';

export const AppNavigator: React.FC = () => (
  <Switch>
    <Route path={routeBuilder.home} component={ProjectsPage} exact />
    <Route path={routeBuilder.projects} component={ProjectsPage} exact />
    <Route path={routeBuilder.noPage} component={NotFound} />
  </Switch>
);