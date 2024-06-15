import React from 'react';
import { Divider, ListItemIcon, MenuItem } from '@mui/material';
import { useHistory, useParams } from 'react-router';
import { routeBuilder } from '../../routes/routes';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveStory } from '../../queries/story/useRemoveStory';
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

interface TasksNavbarMenuItemsProps {
  handleCreateTaskOnOpen: () => void;
  handleEditStoryOnOpen: () => void;
}

export const TasksNavbarMenuItems: React.FC<TasksNavbarMenuItemsProps> = ({
  handleCreateTaskOnOpen,
  handleEditStoryOnOpen,
}) => {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string;
  }>();
  const history = useHistory();

  const { remove } = useRemoveStory(false);

  const handleRemoveStory = async (): Promise<void> => {
    await remove(storyId);
    history.push(routeBuilder.stories(projectId));
  };

  return (
    <>
      <MenuItem onClick={handleEditStoryOnOpen}>
        <ListItemIcon>
          <ModeEditOutlineIcon fontSize='small' />
        </ListItemIcon>
        Edit story details
      </MenuItem>
      <MenuItem onClick={handleRemoveStory}>
        <ListItemIcon>
          <DeleteIcon fontSize='small' />
        </ListItemIcon>
        Remove story
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleCreateTaskOnOpen}>
        <ListItemIcon>
          <AddIcon fontSize='small' />
        </ListItemIcon>
        Create new task
      </MenuItem>
      <Divider />
    </>
  );
};
