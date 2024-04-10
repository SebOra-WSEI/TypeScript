import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { StoryModel } from '../../../types/story';
import { useRemoveStory } from '../../../api/story/useRemoveStory';

interface StoryCardMenuMenuProps {
  story: StoryModel;
  handleEditStoryOnOpen: () => void;
}

export const StoryCardMenu: React.FC<StoryCardMenuMenuProps> = ({
  story,
  handleEditStoryOnOpen
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { remove } = useRemoveStory();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = (): void => setAnchorEl(null);

  const handleRemove = (): void => remove(story.id);

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
        <MenuItem onClick={handleRemove}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          Delete story
        </MenuItem>
      </Menu>
    </>
  );
};
