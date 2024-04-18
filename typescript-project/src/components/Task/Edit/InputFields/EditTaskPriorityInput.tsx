import React from 'react';
import {
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority } from '../../../../types/priority';
import { PRIORITY_ICONS } from '../../../../utils/priorityIcons';
import { TaskModel } from '../../../../types/task';

interface EditTaskPriorityInputProps {
  updatedTask: TaskModel;
  setUpdatedTask: (value: TaskModel) => void;
}

export const EditTaskPriorityInput: React.FC<EditTaskPriorityInputProps> = ({
  updatedTask,
  setUpdatedTask
}) => (
  <FormControl sx={formStyles.editFormControl} size='small'>
    <Select
      value={updatedTask.priority}
      onChange={(evt) =>
        setUpdatedTask({
          ...updatedTask,
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
  </FormControl >
);