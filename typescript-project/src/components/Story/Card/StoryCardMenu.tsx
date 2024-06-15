import React, { useState } from 'react';
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import { StoryModel } from '../../../types/story';
import { useRemoveStory } from '../../../queries/story/useRemoveStory';
import { useHistory, useParams } from 'react-router';
import { routeBuilder } from '../../../routes/routes';
import ExploreIcon from '@mui/icons-material/Explore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';

interface StoryCardMenuProps {
  story: StoryModel;
  handleEditStoryOnOpen: () => void;
}

export const StoryCardMenu: React.FC<StoryCardMenuProps> = ({
  story,
  handleEditStoryOnOpen,
}) => {
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { remove } = useRemoveStory();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = (): void => setAnchorEl(null);
  const handleRemove = async (): Promise<void> => await remove(story.id);
  const handleExplore = (): void =>
    history.push(routeBuilder.tasks(projectId, story.id));

  return (
    <>
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditStoryOnOpen}>
          <ListItemIcon>
            <ModeEditOutlineIcon fontSize='small' />
          </ListItemIcon>
          Edit story details
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleExplore}>
          <ListItemIcon>
            <ExploreIcon fontSize='small' />
          </ListItemIcon>
          Explore story
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleRemove}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          Remove story
        </MenuItem>
      </Menu>
    </>
  );
};
