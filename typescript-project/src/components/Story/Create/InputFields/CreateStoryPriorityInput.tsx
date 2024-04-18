import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority } from '../../../../types/priority';
import { priorityIcons } from '../../../../utils/priorityIcons';
import { StoryFormBody } from '../../../../types/story';

interface CreateStoryPriorityInputProps {
  story: StoryFormBody;
  setStory: (value: StoryFormBody) => void;
}

export const CreateStoryPriorityInput: React.FC<CreateStoryPriorityInputProps> = ({
  story,
  setStory,
}) => (
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
          <span>{priorityIcons[p]}</span>
          <span style={{ marginLeft: '0.5rem' }}>{p}</span>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)