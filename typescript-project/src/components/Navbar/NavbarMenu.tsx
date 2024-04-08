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

interface NavbarMenuProps {
  projectId: string;
  handleOnEditOpen: () => void;
}

export const NavbarMenu: React.FC<NavbarMenuProps> = ({
  projectId,
  handleOnEditOpen
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const { remove } = useRemoveProject(false);

  const open = Boolean(anchorEl);

  const handleChangeProject = (): void => {
    history.push(routes.projects);
  };

  const handleRemove = () => {
    remove(projectId);
    history.push(routes.projects)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = (): void => setAnchorEl(null);

  return (
    <>
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
        <MenuItem>
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
