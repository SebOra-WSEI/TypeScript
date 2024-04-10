import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProjectsListView } from './components/Project/ListView/ProjectsListView';
import { routes } from './routes/routes';
import { NotFound } from './components/common/NotFound';
import { StoryNavigator } from './components/Story/StoryNavigator';

export const AppNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.home} component={ProjectsListView} exact />
    <Route path={routes.projects} component={ProjectsListView} exact />
    <Route path={routes.stories} component={StoryNavigator} />
    <Route path={routes.noPage} component={NotFound} />
  </Switch>
);
