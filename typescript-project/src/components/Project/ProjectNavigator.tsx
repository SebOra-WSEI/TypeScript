import React from 'react';
import { Route, Switch } from 'react-router';
import { routes } from '../../routes/routes';
import { ProjectsDefaultPage } from './DefaultPage/ProjectsDefaultPage';
import { StoragesDefaultPage } from '../Storage/DefaultPage/StoragesDefaultPage';

export const ProjectNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.projectsList} component={ProjectsDefaultPage} exact />
    <Route path={routes.project} component={StoragesDefaultPage} exact />
  </Switch>
);
