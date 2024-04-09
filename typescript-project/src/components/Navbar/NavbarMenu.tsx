import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router';
import { routes } from '../../routes/routes';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import SettingsIcon from '@mui/icons-material/Settings';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveProject } from '../../api/project/useRemoveProject';
import { SELECTED_PROJECT_ID } from '../../utils/localStorage';

interface NavbarMenuProps {
  projectId: string;
  handleEditProjectOnOpen: () => void;
  handleCreateStorageOnOpen: () => void;
}

export const NavbarMenu: React.FC<NavbarMenuProps> = ({
  projectId,
  handleEditProjectOnOpen,
  handleCreateStorageOnOpen
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const history = useHistory();
  const open = Boolean(anchorEl);

  const { remove } = useRemoveProject(false);

  const handleChangeProject = (): void => {
    history.push(routes.projects);
    window.localStorage.removeItem(SELECTED_PROJECT_ID);
  };

  const handleRemoveProject = () => {
    remove(projectId);
    history.push(routes.projects)
  }

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleIconClose = (): void => setAnchorEl(null);

  return (
    <>
      <IconButton size='small' onClick={handleIconClick}>
        <Avatar sx={{ background: 'inherit', marginLeft: 'auto' }}>
          <SettingsIcon />
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleIconClose}
      >
        <MenuItem onClick={handleEditProjectOnOpen}>
          <ListItemIcon>
            <ModeEditOutlineIcon fontSize="small" />
          </ListItemIcon>
          Edit project details
        </MenuItem>
        <MenuItem onClick={handleRemoveProject}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete project
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCreateStorageOnOpen}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Create new storage
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleChangeProject}>
          <ListItemIcon>
            <ReplyAllIcon fontSize="small" />
          </ListItemIcon>
          Change project
        </MenuItem>
      </Menu>
    </>
  );
};
