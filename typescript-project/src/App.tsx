import React from 'react';
import { AppNavigator } from './AppNavigator';
import { Box } from '@mui/material';
import { Project } from './controllers/project';

export const App: React.FC = () => {
  const project = new Project('Project Name 4', 'Some Description');
  project.create();
  // const user = new User('Sebastian', 'Oraczek');
  // const storage = new Storage(
  //   'Storage Name',
  //   Priority.Minor,
  //   project.id,
  //   user.id,
  //   State.Todo,
  //   'Some description'
  // );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppNavigator />
    </Box>
  );
};
