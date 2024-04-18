import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { State } from '../../../../types/state';
import { StoryModel } from '../../../../types/story';

interface EditStoryStatusInputProps {
  updatedStory: StoryModel;
  setUpdatedStory: (value: StoryModel) => void;
  state: State;
}

export const EditStoryStatusInput: React.FC<EditStoryStatusInputProps> = ({
  updatedStory,
  setUpdatedStory,
  state,
}) => (
  <FormControl sx={formStyles.editFormControl} size='small'>
    <Select
      value={state}
      onChange={(evt) =>
        setUpdatedStory({
          ...updatedStory,
          state: evt.target.value as State,
        })
      }
    >
      {Object.values(State).map((s) => (
        <MenuItem key={s} value={s}>
          {s}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
