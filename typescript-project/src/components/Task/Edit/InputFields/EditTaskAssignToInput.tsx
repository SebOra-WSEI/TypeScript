import React from 'react';
import {
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { State } from '../../../../types/state';
import { useGetAllUsers } from '../../../../queries/user/useGetAllUsers';
import { UserRole } from '../../../../types/user';
import { TaskModel } from '../../../../types/task';

interface EditTaskAssignToInputProps {
  updatedTask: TaskModel;
  setUpdatedTask: (value: TaskModel) => void;
}

export const EditTaskAssignToInput: React.FC<EditTaskAssignToInputProps> = ({
  updatedTask,
  setUpdatedTask,
}) => {
  const { data } = useGetAllUsers();

  const enabledUsers = data?.filter((u) => u.role !== UserRole.Admin);

  return (
    (
      <FormControl sx={formStyles.editFormControl} size='small'>
        <Select
          displayEmpty
          value={updatedTask.assignedToId || 'Unassigned'}
          onChange={(evt) =>
            setUpdatedTask({
              ...updatedTask,
              state:
                evt.target.value === 'Unassigned'
                  ? State.Todo
                  : State.Doing,
              assignedToId: evt.target.value,
            })
          }
        >
          <MenuItem value='Unassigned'>Unassigned</MenuItem>
          {enabledUsers?.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name} {user.surname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  )
}