import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { storyPoints } from '../../../../utils/consts';
import { TaskFormBody } from '../../../../types/task';

interface TaskStoryPointsInputProps {
  task: TaskFormBody;
  setTask: (value: TaskFormBody) => void;
}

export const TaskStoryPointsInput: React.FC<TaskStoryPointsInputProps> = ({
  task,
  setTask
}) => (
  <FormControl sx={styles.storyPointSelect} size='small'>
    <InputLabel>Story point</InputLabel>
    <Select
      value={task.storyPoint}
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
);

const styles = {
  storyPointSelect: {
    marginTop: '1.5rem',
    width: '8rem',
  },
}