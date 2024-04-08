import React from 'react';
import { Route, Switch } from 'react-router';
import { routes } from '../../routes/routes';
import { ProjectsListView } from './ListView/ProjectsListView';
import { ProjectDetails } from './Details/ProjectDetails';

export const ProjectNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.projects} component={ProjectsListView} exact />
    <Route path={routes.storages} component={ProjectDetails} exact />
  </Switch>
);
