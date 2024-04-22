import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { formStyles } from '../../../styles/formStyles';
import { Priority } from '../../../types/priority';
import { PRIORITY_ICONS } from '../../../utils/priorityIcons';
import { StoryBasic } from '../../../types/story';

interface CreateStoryPriorityInputProps {
  story: StoryBasic;
  setStory: (value: StoryBasic) => void;
}

export const CreateStoryPriorityInput: React.FC<
  CreateStoryPriorityInputProps
> = ({ story, setStory }) => (
  <FormControl sx={formStyles.prioritySelect} size='small'>
    <InputLabel>Priority</InputLabel>
    <Select
      value={story.priority}
      label='Priority'
      onChange={(evt) =>
        setStory({
          ...story,
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
