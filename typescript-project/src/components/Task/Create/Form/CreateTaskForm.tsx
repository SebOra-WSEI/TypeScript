import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority } from '../../../../types/priority';
import { priorityIcons } from '../../../../utils/priorityIcons';
import { TaskFormBody } from '../../../../types/task';
import { storyPoints } from '../../../../utils/consts';
import { expectedWorkingDays } from '../../../../utils/expectedWorkingDays';

interface CreateTaskFormProps {
  task: TaskFormBody;
  setTask: (value: TaskFormBody) => void;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  task,
  setTask,
}) => {
  const [expectedDays, setExpectedDays] = useState<number>(0);
  const { name, description, priority, storyPoint } = task;

  return (
    <>
      <h3 style={formStyles.header}>Create new task</h3>
      <TextField
        label='Name *'
        variant='standard'
        type='text'
        autoComplete='name'
        autoFocus
        value={name}
        fullWidth
        onChange={(evt) =>
          setTask({
            ...task,
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
          setTask({
            ...task,
            description: evt.target.value,
          })
        }
      />
      <div style={formStyles.controlWrapper}>
        <FormControl sx={formStyles.prioritySelect} size='small'>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
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
        <FormControl sx={formStyles.storyPointSelect} size='small'>
          <InputLabel>Story point</InputLabel>
          <Select
            value={storyPoint}
            label='Story point'
            onChange={(evt) =>
              setTask({
                ...task,
                storyPoint: Number(evt.target.value),
              })
            }
          >
            {storyPoints.map((s) => (
              <MenuItem key={s} value={s.toString()}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TextField
        label='Expected days'
        type='number'
        size='small'
        value={expectedDays}
        sx={formStyles.expectedDays}
        onChange={(evt) => {
          setExpectedDays(parseInt(evt.target.value));

          setTask({
            ...task,
            endDate: expectedWorkingDays(parseInt(evt.target.value)),
          });
        }}
      />
    </>
  );
};
