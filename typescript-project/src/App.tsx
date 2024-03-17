import React from 'react';
import { Project } from './controllers/project';
import { User } from './controllers/user';
import { Storage } from './controllers/storage';
import { Priority } from './types/priority';
import { State } from './types/state';

export const App: React.FC = () => {
  const project = new Project('Project Name 2', 'Some Description')
  const user = new User('Sebastian', 'Oraczek');
  const storage = new Storage(
    "Storage Name",
    Priority.Minor,
    project.id,
    user.id,
    State.Todo,
    "Some description"
  );

  console.log(storage.getAll())

  return <>App</>;
};
