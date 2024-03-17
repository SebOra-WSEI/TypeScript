import React from 'react';
import { Project } from './controllers/project';
import { User } from './controllers/user';

export const App: React.FC = () => {
  const project = new Project('Project Name 2', 'Some Description')
  const user = new User('Sebastian', 'Oraczek');

  console.log(user.name)
  return <>App</>;
};
