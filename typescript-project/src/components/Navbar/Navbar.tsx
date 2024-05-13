import React, { PropsWithChildren, useState } from 'react';
import {
  AppBar,
  Avatar,
  FormControlLabel,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { ProjectModel } from '../../types/project';
import { StoryModel } from '../../types/story';
import { TaskModel } from '../../types/task';
import { NavbarBreadcrumbs } from './Breadcrumbs/NavbarBreadcrumbs';
import { useHistory } from 'react-router';
import { routes } from '../../routes/routes';
import { SELECTED_PROJECT_ID } from '../../utils/localStorage';
import { Link } from 'react-router-dom';
import { handleLogout } from '../../utils/logout';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { ThemeSwitch } from './Theme/ThemeSwitch';
import { useAppContextProvider } from '../../AppContext';

interface NavbarProps extends PropsWithChildren {
  data?: ProjectModel | StoryModel | TaskModel;
}

export const Navbar: React.FC<NavbarProps> = ({ data, children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, setMode } = useAppContextProvider();
  const history = useHistory();

  const open = Boolean(anchorEl);

  const { name, description } = data ?? {};

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleIconClose = (): void => setAnchorEl(null);

  const handleChangeProject = (): void => {
    history.push(routes.projects);
    window.localStorage.removeItem(SELECTED_PROJECT_ID);
  };

  const handleMode = (): void => {
    mode === 'light'
      ? setMode('dark')
      : setMode('light')
  };

  return (
    <AppBar>
      <Toolbar>
        <NavbarBreadcrumbs />
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
          {window.location.pathname !== routes.projects && (
            <MenuItem onClick={handleChangeProject}>
              <ListItemIcon>
                <ReplyAllIcon fontSize='small' />
              </ListItemIcon>
              Change project
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            <Link to={routes.login} style={styles.link}>
              Log out
            </Link>
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={<ThemeSwitch />}
              label="Theme"
              onChange={handleMode}
              checked={mode === 'dark'}
            />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
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
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
};