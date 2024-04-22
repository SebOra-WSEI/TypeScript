import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { formStyles } from "../../../styles/formStyles";
import { STORY_POINTS } from "../../../utils/consts";
import { TaskBasic } from "../../../types/task";

interface StoryPointsInputProps {
  task: TaskBasic;
  setTask: (value: TaskBasic) => void;
  isLabelEnabled?: boolean
}

export const StoryPointsInput: React.FC<StoryPointsInputProps> = ({
  task,
  setTask,
  isLabelEnabled = false
}) => (
  <FormControl sx={formStyles.editFormControl} size='small'>
    {isLabelEnabled && (<InputLabel>Story point</InputLabel>)}
    <Select
      value={task.storyPoint}
      {...(isLabelEnabled && {
        label: 'Story point'
      })}
      onChange={(evt) =>
        setTask({
          ...task,
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