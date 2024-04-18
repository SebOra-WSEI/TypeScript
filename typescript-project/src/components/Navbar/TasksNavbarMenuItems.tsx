import { Divider, ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { routeBuilder } from '../../routes/routes';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveStory } from '../../queries/story/useRemoveStory';
import AddIcon from '@mui/icons-material/Add';

interface TasksNavbarMenuItemsProps {
  handleCreateTaskOnOpen: () => void;
}

export const TasksNavbarMenuItems: React.FC<TasksNavbarMenuItemsProps> = ({
  handleCreateTaskOnOpen,
}) => {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string;
  }>();
  const history = useHistory();

  const { remove } = useRemoveStory(false);

  const handleRemoveStory = () => {
    remove(storyId);
    history.push(routeBuilder.stories(projectId));
  };

  return (
    <>
      <MenuItem onClick={handleCreateTaskOnOpen}>
        <ListItemIcon>
          <AddIcon fontSize='small' />
        </ListItemIcon>
        Create new task
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleRemoveStory}>
        <ListItemIcon>
          <DeleteIcon fontSize='small' />
        </ListItemIcon>
        Delete Story
      </MenuItem>
    </>
  );
};
