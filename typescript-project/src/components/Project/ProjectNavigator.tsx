import React from 'react';
import { Route, Switch } from 'react-router';
import { routes } from '../../routes/routes';
import { ProjectsPage } from './List/ProjectsPage';
import { ProjectDetailsPage } from './Details/ProjectDetailsPage';

export const ProjectNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.projectsList} component={ProjectsPage} exact />
    <Route path={routes.project} component={ProjectDetailsPage} exact />
  </Switch>
);
