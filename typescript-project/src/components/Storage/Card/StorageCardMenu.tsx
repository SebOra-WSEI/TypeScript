import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { StorageModel } from '../../../types/storage';
import { useRemoveStorage } from '../../../api/storage/useRemoveStorage';

interface StorageCardMenuProps {
  storage: StorageModel;
  handleEditStorageOnOpen: () => void;
}

export const StorageCardMenu: React.FC<StorageCardMenuProps> = ({
  storage,
  handleEditStorageOnOpen
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { remove } = useRemoveStorage();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = (): void => setAnchorEl(null);

  const handleRemove = (): void => remove(storage.id);

  return (
    <>
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditStorageOnOpen}>
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
