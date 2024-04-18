import { Divider, ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { routeBuilder, routes } from '../../routes/routes';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import DeleteIcon from '@mui/icons-material/Delete';
import { SELECTED_PROJECT_ID } from '../../utils/localStorage';
import { useRemoveTask } from '../../queries/task/useRemoveTask';

export const TaskDetailsNavbarMenuItems: React.FC = () => {
  const { projectId, storyId, taskId } = useParams<{
    projectId: string;
    storyId: string;
    taskId: string;
  }>();
  const history = useHistory();

  const { remove } = useRemoveTask(false);

  const handleChangeProject = (): void => {
    history.push(routes.projects);
    window.localStorage.removeItem(SELECTED_PROJECT_ID);
  };

  const handleRemoveStory = () => {
    remove(taskId);
    history.push(routeBuilder.tasks(projectId, storyId));
  };

  return (
    <>
      <MenuItem onClick={handleRemoveStory}>
        <ListItemIcon>
          <DeleteIcon fontSize='small' />
        </ListItemIcon>
        Delete task
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleChangeProject}>
        <ListItemIcon>
          <ReplyAllIcon fontSize='small' />
        </ListItemIcon>
        Change project
      </MenuItem>
    </>
  );
};
