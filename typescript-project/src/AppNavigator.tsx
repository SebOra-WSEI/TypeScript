import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProjectsListView } from './components/Project/ListView/ProjectsListView';
import { routes } from './routes/routes';
import { PageNotFoundMessage } from './components/common/Messages/PageNotFoundMessage';
import { StoryNavigator } from './components/Story/StoryNavigator';
import { LoginView } from './components/Authorization/LoginView';

export const AppNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.default} component={LoginView} exact />
    <Route path={routes.login} component={LoginView} exact />
    <Route path={routes.projects} component={ProjectsListView} exact />
    <Route path={routes.stories} component={StoryNavigator} />
    <Route path={routes.noPage} component={PageNotFoundMessage} />
  </Switch>
);
