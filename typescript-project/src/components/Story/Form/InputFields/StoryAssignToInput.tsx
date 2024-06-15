import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { StoryModel } from '../../../../types/story';
import { State } from '../../../../types/state';
import { useGetAllUsers } from '../../../../queries/user/useGetAllUsers';

interface StoryAssignToInputProps {
  updatedStory: StoryModel;
  setUpdatedStory: (value: StoryModel) => void;
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
        value={assignedToId || ''}
        onChange={(evt) =>
          setUpdatedStory({
            ...updatedStory,
            state: evt.target.value === 'Unassigned' ? State.Todo : State.Doing,
            assignedToId: evt.target.value,
          })
        }
      >
        <MenuItem value={''}>Unassigned</MenuItem>
        {allUsers?.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name} {user.surname}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
