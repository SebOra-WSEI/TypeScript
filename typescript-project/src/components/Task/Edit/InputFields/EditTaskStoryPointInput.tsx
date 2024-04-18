import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { TaskModel } from '../../../../types/task';
import { STORY_POINTS } from '../../../../utils/consts';

interface EditTaskStoryPointInputProps {
  updatedTask: TaskModel;
  setUpdatedTask: (value: TaskModel) => void;
}

export const EditTaskStoryPointInput: React.FC<
  EditTaskStoryPointInputProps
> = ({ updatedTask, setUpdatedTask }) => (
  <FormControl sx={formStyles.editFormControl} size='small'>
    <Select
      value={updatedTask.storyPoint}
      onChange={(evt) =>
        setUpdatedTask({
          ...updatedTask,
          storyPoint: Number(evt.target.value),
        })
      }
    >
      {STORY_POINTS.map((point) => (
        <MenuItem key={point} value={point}>
          <span style={formStyles.menuItem}>{point}</span>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
