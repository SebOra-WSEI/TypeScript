import React from 'react';
import { Route, Switch } from 'react-router';
import { routes } from '../../routes/routes';
import { TasksView } from '../Task/ListView/TasksView';

export const TaskNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.tasks} component={TasksView} exact />
  </Switch>
);
