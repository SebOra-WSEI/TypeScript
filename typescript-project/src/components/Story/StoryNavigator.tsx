import React from "react";
import { Route, Switch } from "react-router";
import { routes } from "../../routes/routes";
import { StoriesView } from "./ListView/StoriesView";
import { TasksView } from "../Task/ListView/TasksView";

export const StoryNavigator: React.FC = () => (
  <Switch>
    <Route path={routes.stories} component={StoriesView} exact />
    <Route path={routes.tasks} component={TasksView} exact />
  </Switch>
)