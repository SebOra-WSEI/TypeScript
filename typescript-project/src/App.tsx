import React from 'react';
import { AllProjects } from './controllers/allProjects';
import { Project } from './controllers/project';

export const App: React.FC = () => {
  const project = new Project('Project Name1', 'Some fake description');
  const allProjects = new AllProjects();

  console.log(project.get());

  return <>App</>;
};
