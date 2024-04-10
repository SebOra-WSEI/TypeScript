import React from 'react';
import { Route, Switch } from 'react-router';
import { routes } from '../../routes/routes';
import { ProjectsListView } from './ListView/ProjectsListView';
import { StoriesView } from '../Story/ListView/StoriesView';

export const ProjectNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.projects} component={ProjectsListView} exact />
    <Route path={routes.stories} component={StoriesView} exact />
  </Switch>
);
