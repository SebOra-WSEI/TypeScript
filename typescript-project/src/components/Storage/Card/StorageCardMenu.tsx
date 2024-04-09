import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';

interface StorageCardMenuProps {
  handleRemove: () => void;
}

export const StorageCardMenu: React.FC<StorageCardMenuProps> = ({
  handleRemove,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = (): void => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem>
          <ListItemIcon>
            <ModeEditOutlineIcon fontSize='small' />
          </ListItemIcon>
          Edit storage details
        </MenuItem>
        <MenuItem onClick={handleRemove}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          Delete storage
        </MenuItem>
      </Menu>
    </>
  );
};
