import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProjectsPage } from './components/Project/List/ProjectsPage';
import { routeBuilder } from './routes/routes';
import { NotFound } from './components/common/NotFound';
import { CreateProjectPage } from './components/Project/Create/CreatePage';

export const AppNavigator: React.FC = () => (
  <Switch>
    <Route path={routeBuilder.home} component={ProjectsPage} exact />
    <Route path={routeBuilder.projects} component={ProjectsPage} exact />
    <Route path={routeBuilder.addProject} component={CreateProjectPage} exact />
    <Route path={routeBuilder.noPage} component={NotFound} />
  </Switch>
);
