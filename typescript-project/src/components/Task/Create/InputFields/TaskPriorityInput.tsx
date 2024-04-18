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
import { TaskFormBody } from '../../../../types/task';

interface TaskPriorityInputProps {
  task: TaskFormBody;
  setTask: (value: TaskFormBody) => void;
}

export const TaskPriorityInput: React.FC<TaskPriorityInputProps> = ({
  task,
  setTask,
}) => (
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
          <span>{priorityIcons[p]}</span>
          <span style={{ marginLeft: '0.5rem' }}>{p}</span>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)