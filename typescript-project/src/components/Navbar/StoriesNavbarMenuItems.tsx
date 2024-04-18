import { Divider, ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { routes } from '../../routes/routes';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveProject } from '../../api/project/useRemoveProject';

interface StoriesNavbarMenuItemsProps {
  handleEditProjectOnOpen: () => void;
  handleCreateStoryOnOpen: () => void;
}

export const StoriesNavbarMenuItems: React.FC<StoriesNavbarMenuItemsProps> = ({
  handleEditProjectOnOpen,
  handleCreateStoryOnOpen,
}) => {
  const { projectId } = useParams<{ projectId: string }>();
  const history = useHistory();

  const { remove } = useRemoveProject(false);

  const handleRemoveProject = () => {
    remove(projectId);
    history.push(routes.projects);
  };

  return (
    <>
      <MenuItem onClick={handleEditProjectOnOpen}>
        <ListItemIcon>
          <ModeEditOutlineIcon fontSize='small' />
        </ListItemIcon>
        Edit project details
      </MenuItem>
      <MenuItem onClick={handleRemoveProject}>
        <ListItemIcon>
          <DeleteIcon fontSize='small' />
        </ListItemIcon>
        Delete project
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleCreateStoryOnOpen}>
        <ListItemIcon>
          <AddIcon fontSize='small' />
        </ListItemIcon>
        Create new story
      </MenuItem>
    </>
  );
};
