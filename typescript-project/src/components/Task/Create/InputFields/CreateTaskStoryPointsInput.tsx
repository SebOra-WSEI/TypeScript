import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { STORY_POINTS } from '../../../../utils/consts';
import { TaskFormBody } from '../../../../types/task';

interface CreateTaskStoryPointsInputProps {
  task: TaskFormBody;
  setTask: (value: TaskFormBody) => void;
}

export const CreateTaskStoryPointsInput: React.FC<CreateTaskStoryPointsInputProps> = ({
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
      {STORY_POINTS.map((s) => (
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