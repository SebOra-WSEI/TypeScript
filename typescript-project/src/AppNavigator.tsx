import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProjectsListView } from './components/Project/ListView/ProjectsListView';
import { routes } from './routes/routes';
import { NotFound } from './components/common/NotFound';
import { StoriesView } from './components/Story/ListView/StoriesView';
import { TaskListView } from './components/Task/ListView/TaskListView';

export const AppNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.home} component={ProjectsListView} exact />
    <Route path={routes.projects} component={ProjectsListView} exact />
    <Route path={routes.stories} component={StoriesView} exact />
    <Route path={routes.tasks} component={TaskListView} exact />
    <Route path={routes.noPage} component={NotFound} />
  </Switch>
);
