import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { PropsWithChildren, useState } from 'react';
import { ProjectModel } from '../../types/project';
import { StoryModel } from '../../types/story';
import SettingsIcon from '@mui/icons-material/Settings';
import { TaskModel } from '../../types/task';
import { NavbarBreadcrumbs } from './Breadcrumbs/NavbarBreadcrumbs';
import { useHistory } from 'react-router';
import { routes } from '../../routes/routes';
import { SELECTED_PROJECT_ID } from '../../utils/localStorage';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

interface NavbarProps extends PropsWithChildren {
  data: ProjectModel | StoryModel | TaskModel;
}

export const Navbar: React.FC<NavbarProps> = ({ data, children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const history = useHistory();

  const open = Boolean(anchorEl);

  const { name, description, type } = data ?? {};

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleIconClose = (): void => setAnchorEl(null);

  const handleChangeProject = (): void => {
    history.push(routes.projects);
    window.localStorage.removeItem(SELECTED_PROJECT_ID);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <NavbarBreadcrumbs type={type} />
          <Typography variant='h6' sx={styles.grow}>
            {name}
          </Typography>
          <Typography variant='inherit' sx={styles.grow}>
            {description}
          </Typography>
          <IconButton size='small' onClick={handleIconClick}>
            <Avatar sx={styles.settings}>
              <SettingsIcon />
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleIconClose}>
            {children}
            <Divider />
            <MenuItem onClick={handleChangeProject}>
              <ListItemIcon>
                <ReplyAllIcon fontSize='small' />
              </ListItemIcon>
              Change project
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

const styles = {
  grow: {
    flexGrow: 1,
  },
  settings: {
    background: 'inherit',
    marginLeft: 'auto',
  },
};
