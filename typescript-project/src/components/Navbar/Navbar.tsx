import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { ProjectModel } from '../../types/project';
import { NavbarMenu } from './NavbarMenu';

interface NavbarProps {
  project: ProjectModel;
  handleEditProjectOnOpen: () => void;
  handleCreateStorageOnOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  project,
  handleCreateStorageOnOpen,
  handleEditProjectOnOpen
}) => {
  const { name, description, id } = project ?? {};

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 2 }}>
            {name}
          </Typography>
          <Typography variant='inherit' sx={{ flexGrow: 1 }}>
            {description}
          </Typography>
          <NavbarMenu
            projectId={id}
            handleEditProjectOnOpen={handleEditProjectOnOpen}
            handleCreateStorageOnOpen={handleCreateStorageOnOpen}
          />
        </Toolbar>
      </AppBar>
    </>
  );
};
