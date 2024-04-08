import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ExploreIcon from '@mui/icons-material/Explore';

export const StorageCardMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = (): void => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <ExploreIcon fontSize="small" />
          </ListItemIcon>
          View details
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ModeEditOutlineIcon fontSize="small" />
          </ListItemIcon>
          Edit project details
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete storage
        </MenuItem>
      </Menu>
    </>
  );
};