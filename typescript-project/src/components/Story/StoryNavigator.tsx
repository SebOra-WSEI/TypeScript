import React from 'react';
import { Route, Switch } from 'react-router';
import { routes } from '../../routes/routes';
import { StoriesView } from './ListView/StoriesView';
import { TaskNavigator } from '../Task/TaskNavigator';

export const StoryNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.stories} component={StoriesView} exact />
    <Route path={routes.tasks} component={TaskNavigator} />
  </Switch>
);
