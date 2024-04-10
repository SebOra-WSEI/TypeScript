import React from 'react';
import { Route, Switch } from 'react-router';
import { routes } from '../../routes/routes';
import { TasksView } from '../Task/ListView/TasksView';
import { TaskDetailsPage } from './Details/TaskDetailsPage';

export const TaskNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.tasks} component={TasksView} exact />
    <Route path={routes.taskDetails} component={TaskDetailsPage} exact />
  </Switch>
);
