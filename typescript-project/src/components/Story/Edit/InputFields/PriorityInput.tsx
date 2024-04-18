import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority } from '../../../../types/priority';
import { StoryModel } from '../../../../types/story';
import { priorityIcons } from '../../../../utils/priorityIcons';

interface PriorityInputProps {
  updatedStory: StoryModel;
  setUpdatedStory: (value: StoryModel) => void;
  priority: Priority
}

export const PriorityInput: React.FC<PriorityInputProps> = ({
  updatedStory,
  setUpdatedStory,
  priority
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
          <span>{priorityIcons[p]}</span>
          <span style={{ marginLeft: '0.5rem' }}>{p}</span>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);