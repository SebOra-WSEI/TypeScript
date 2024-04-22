import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { State } from '../../../../types/state';
import { StoryBasic } from '../../../../types/story';

interface StoryStatusInputProps {
  updatedStory: StoryBasic;
  setUpdatedStory: (value: StoryBasic) => void;
  state: State;
}

export const StoryStatusInput: React.FC<StoryStatusInputProps> = ({
  updatedStory,
  setUpdatedStory,
  state,
}) => (
  <FormControl sx={formStyles.formControl} size='small'>
    <Select
      value={state}
      onChange={(evt) =>
        setUpdatedStory({
          ...updatedStory,
          state: evt.target.value as State,
        })
      }
    >
      {Object.values(State).map((state) => (
        <MenuItem key={state} value={state}>
          {state}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
