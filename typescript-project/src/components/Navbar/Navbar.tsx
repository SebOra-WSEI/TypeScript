import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { ProjectModel } from '../../types/project';
import { NavbarMenu } from './NavbarMenu';
import { StoryModel } from '../../types/story';

interface NavbarProps {
  context: ProjectModel | StoryModel;
  handleEditProjectOnOpen: () => void;
  handleCreateStoryOnOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  context,
  handleCreateStoryOnOpen,
  handleEditProjectOnOpen,
}) => {
  const { name, description, id } = context ?? {};
  console.log(context)
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 2 }}>
            {name}
          </Typography>
          <Typography variant='inherit' sx={{ flexGrow: 1 }}>
            {description}
          </Typography>
          <NavbarMenu
            projectId={id}
            handleEditProjectOnOpen={handleEditProjectOnOpen}
            handleCreateStoryOnOpen={handleCreateStoryOnOpen}
          />
        </Toolbar>
      </AppBar>
    </>
  );
};
