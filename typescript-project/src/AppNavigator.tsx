import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProjectsDefaultPage } from './components/Project/DefaultPage/ProjectsDefaultPage';
import { routes } from './routes/routes';
import { NotFound } from './components/common/NotFound';
import { ProjectNavigator } from './components/Project/ProjectNavigator';

export const AppNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.home} component={ProjectsDefaultPage} exact />
    <Route path={routes.projectsList} component={ProjectNavigator} />
    <Route path={routes.noPage} component={NotFound} />
  </Switch>
);
