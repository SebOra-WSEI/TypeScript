import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { formStyles } from '../../../styles/formStyles';
import { Priority } from '../../../types/priority';
import { StoryFormBody } from '../../../types/story';
import { priorityIcons } from '../../../utils/priorityIcons';

interface CreateStoryFormProps {
  story: StoryFormBody;
  setStory: (value: StoryFormBody) => void;
}

export const CreateStoryForm: React.FC<CreateStoryFormProps> = ({
  story,
  setStory,
}) => {
  const { name, description, priority } = story;

  return (
    <>
      <h3 style={formStyles.header}>Create new story</h3>
      <TextField
        label='Name *'
        variant='standard'
        type='text'
        autoComplete='name'
        autoFocus
        value={name}
        fullWidth
        onChange={(evt) =>
          setStory({
            ...story,
            name: evt.target.value,
          })
        }
      />
      <TextField
        label='Description'
        variant='standard'
        type='text'
        autoComplete='description'
        value={description}
        fullWidth
        onChange={(evt) =>
          setStory({
            ...story,
            description: evt.target.value,
          })
        }
      />
      <FormControl sx={formStyles.prioritySelect} size='small'>
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
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
    </>
  );
};
