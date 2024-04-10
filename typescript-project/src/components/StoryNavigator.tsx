import React from "react";
import { Route, Switch } from "react-router";
import { routes } from "../routes/routes";
import { StoriesView } from "./Story/ListView/StoriesView";
import { TaskListView } from "./Task/ListView/TaskListView";

export const StoryNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.stories} component={StoriesView} exact />
    <Route path={routes.tasks} component={TaskListView} exact />
  </Switch>
)