import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { StoryBasic } from '../../../../types/story';
import { State } from '../../../../types/state';
import { useGetAllUsers } from '../../../../queries/user/useGetAllUsers';

interface StoryAssignToInputProps {
  updatedStory: StoryBasic;
  setUpdatedStory: (value: StoryBasic) => void;
  assignedToId: string;
}

export const StoryAssignToInput: React.FC<StoryAssignToInputProps> = ({
  updatedStory,
  setUpdatedStory,
  assignedToId,
}) => {
  const { data: allUsers } = useGetAllUsers();

  return (
    <FormControl sx={formStyles.formControl} size='small'>
      <Select
        displayEmpty
        value={assignedToId || 'Unassigned'}
        onChange={(evt) =>
          setUpdatedStory({
            ...updatedStory,
            state: evt.target.value === 'Unassigned' ? State.Todo : State.Doing,
            assignedToId: evt.target.value,
          })
        }
      >
        <MenuItem value='Unassigned'>Unassigned</MenuItem>
        {allUsers?.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name} {user.surname}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
