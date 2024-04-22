import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { State } from '../../../../types/state';
import { TaskBasic } from '../../../../types/task';

interface TaskStateInputProps {
  updatedTask: TaskBasic;
  setUpdatedTask: (value: TaskBasic) => void;
}

export const TaskStateInput: React.FC<TaskStateInputProps> = ({
  updatedTask,
  setUpdatedTask,
}) => (
  <FormControl sx={formStyles.editFormControl} size='small'>
    <Select
      value={updatedTask.state}
      onChange={(evt) =>
        setUpdatedTask({
          ...updatedTask,
          state: evt.target.value as State,
          ...(evt.target.value === State.Todo && {
            assignedToId: 'Unassigned',
          }),
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
