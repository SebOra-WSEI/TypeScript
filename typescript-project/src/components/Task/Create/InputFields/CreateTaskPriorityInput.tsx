import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority } from '../../../../types/priority';
import { PRIORITY_ICONS } from '../../../../utils/priorityIcons';
import { TaskBasic } from '../../../../types/task';

interface CreateTaskPriorityInputProps {
  task: TaskBasic;
  setTask: (value: TaskBasic) => void;
}

export const CreateTaskPriorityInput: React.FC<
  CreateTaskPriorityInputProps
> = ({ task, setTask }) => (
  <FormControl sx={formStyles.prioritySelect} size='small'>
    <InputLabel>Priority</InputLabel>
    <Select
      value={task.priority}
      label='Priority'
      onChange={(evt) =>
        setTask({
          ...task,
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
  </FormControl>
);
