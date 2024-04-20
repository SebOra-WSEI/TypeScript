import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority } from '../../../../types/priority';
import { StoryBasic } from '../../../../types/story';
import { PRIORITY_ICONS } from '../../../../utils/priorityIcons';

interface EditStoryPriorityInputProps {
  updatedStory: StoryBasic;
  setUpdatedStory: (value: StoryBasic) => void;
  priority: Priority;
}

export const EditStoryPriorityInput: React.FC<EditStoryPriorityInputProps> = ({
  updatedStory,
  setUpdatedStory,
  priority,
}) => (
  <FormControl sx={formStyles.editFormControl} size='small'>
    <Select
      value={priority}
      onChange={(evt) =>
        setUpdatedStory({
          ...updatedStory,
          priority: evt.target.value as Priority,
        })
      }
    >
      {Object.values(Priority).map((p) => (
        <MenuItem key={p} value={p}>
          <span>{PRIORITY_ICONS[p]}</span>
          <span style={formStyles.menuItem}>{p}</span>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
