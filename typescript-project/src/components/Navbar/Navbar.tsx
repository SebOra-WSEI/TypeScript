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
import React from 'react';
import { ProjectModel } from '../../types/project';
import { useHistory } from 'react-router';
import { routes } from '../../routes/routes';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import SettingsIcon from '@mui/icons-material/Settings';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveProject } from '../../api/project/useRemoveProject';

interface NavbarProps {
  project: ProjectModel;
  handleOnEditOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ project, handleOnEditOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const { remove } = useRemoveProject(false);

  const { name, description, id } = project ?? {};
  const open = Boolean(anchorEl);

  const handleChangeProject = (): void => {
    history.push(routes.projectsList);
  };

  const handleRemove = () => {
    remove(id);
    history.push(routes.projectsList)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = (): void => setAnchorEl(null);

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {name}
        </Typography>
        <Typography variant='inherit' sx={{ flexGrow: 1 }}>
          {description}
        </Typography>
        <IconButton size='small' onClick={handleClick}>
          <Avatar sx={{ background: 'inherit', marginLeft: 'auto' }}>
            <SettingsIcon />
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleOnEditOpen}>
            <ListItemIcon>
              <ModeEditOutlineIcon fontSize="small" />
            </ListItemIcon>
            Edit project details
          </MenuItem>
          <MenuItem onClick={handleRemove}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete project
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleChangeProject}>
            <ListItemIcon>
              <ReplyAllIcon fontSize="small" />
            </ListItemIcon>
            Change project
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
