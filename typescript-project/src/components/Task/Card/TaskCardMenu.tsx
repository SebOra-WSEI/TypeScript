import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskModel } from '../../../types/task';
import { useRemoveTask } from '../../../api/task/useRemoveTask';
import InfoIcon from '@mui/icons-material/Info';
import { useHistory, useParams } from 'react-router';
import { routeBuilder } from '../../../routes/routes';

interface TaskCardMenuProps {
  task: TaskModel;
}

export const TaskCardMenu: React.FC<TaskCardMenuProps> = ({
  task,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string;
  }>();

  const { remove } = useRemoveTask();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = (): void => setAnchorEl(null);

  const handleRemove = (): void => remove(task.id);

  const handleViewDetails = () =>
    history.push(routeBuilder.taskDetails(projectId, storyId, task.id));

  return (
    <>
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleViewDetails}>
          <ListItemIcon>
            <InfoIcon fontSize='small' />
          </ListItemIcon>
          View task details
        </MenuItem>
        <MenuItem onClick={handleRemove}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          Delete task
        </MenuItem>
      </Menu>
    </>
  );
};
