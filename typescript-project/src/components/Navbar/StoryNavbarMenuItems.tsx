import {
  Divider,
  ListItemIcon,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { routeBuilder, routes } from '../../routes/routes';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { SELECTED_PROJECT_ID } from '../../utils/localStorage';
import { useRemoveStory } from '../../api/story/useRemoveStory';

export const StoryNavbarMenuItems: React.FC = () => {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string
  }>();
  const history = useHistory();

  const { remove } = useRemoveStory(false);

  const handleChangeProject = (): void => {
    history.push(routes.projects);
    window.localStorage.removeItem(SELECTED_PROJECT_ID);
  };

  const handleRemoveStory = () => {
    remove(storyId);
    history.push(routeBuilder.stories(projectId));
  };

  return (
    <>
      <MenuItem onClick={handleRemoveStory}>
        <ListItemIcon>
          <DeleteIcon fontSize='small' />
        </ListItemIcon>
        Delete storage
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
