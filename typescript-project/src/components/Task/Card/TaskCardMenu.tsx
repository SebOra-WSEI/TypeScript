import React, { useState } from 'react';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { TaskModel } from '../../../types/task';
import { useRemoveTask } from '../../../queries/task/useRemoveTask';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskCardMenuProps {
  task: TaskModel;
  handleEditTaskOnOpen: () => void;
}

export const TaskCardMenu: React.FC<TaskCardMenuProps> = ({
  task,
  handleEditTaskOnOpen,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { remove } = useRemoveTask();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = (): void => setAnchorEl(null);
  const handleRemove = (): void => remove(task.id);

  return (
    <>
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditTaskOnOpen}>
          <ListItemIcon>
            <ModeEditOutlineIcon fontSize='small' />
          </ListItemIcon>
          Edit task details
        </MenuItem>
        <MenuItem onClick={handleRemove}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          Remove task
        </MenuItem>
      </Menu>
    </>
  );
};
