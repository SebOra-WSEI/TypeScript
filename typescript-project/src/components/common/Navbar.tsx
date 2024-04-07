import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ProjectModel } from '../../types/project';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router';
import { routes } from '../../routes/routes';

interface NavbarProps {
  project: ProjectModel | undefined
}

export const Navbar: React.FC<NavbarProps> = ({ project }) => {
  const history = useHistory();

  const { name, description } = project ?? {};

  const handleChangeProject = (): void => {
    history.push(routes.projectsList);
  }

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
        >
        </IconButton>
        <Typography variant='inherit' sx={{ flexGrow: 1 }}>
          {description}
        </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {name}
        </Typography>
        <Tooltip
          title='Change project'
          color="inherit"
          onClick={handleChangeProject}
        >
          <IconButton>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};