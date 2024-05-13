import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { TaskBasic } from '../../../../types/task';
import { TaskStateInput } from '../InputFields/TaskStateInput';
import { TaskAssignToInput } from '../InputFields/TaskAssignToInput';
import { TaskDateFields } from '../InputFields/TaskDateFields';
import { PriorityInput } from '../../../common/InputFields/PriorityInput';
import { StoryPointsInput } from '../../../common/InputFields/StoryPointsInput';

interface EditTaskFormProps {
  updatedTask: TaskBasic;
  setUpdatedTask: (value: TaskBasic) => void;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({
  updatedTask,
  setUpdatedTask,
}) => {
  const {
    name,
    description,
    createdDate,
    expectedEndTime,
    startDate,
    endDate,
  } = updatedTask;

  return (
    <Grid container sx={formStyles.gridContainer}>
      <Grid item xs={7} sx={formStyles.centeredHeader}>
        <TextField
          sx={formStyles.titleText}
          variant='standard'
          type='text'
          autoFocus
          value={name}
          onChange={(evt) =>
            setUpdatedTask({
              ...updatedTask,
              name: evt.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={5} sx={formStyles.reporterField}>
        <Grid item xs={4}>
          <Typography fontSize={15} color='secondary'>Created at:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='inherit' fontSize={15}>
            <Typography fontSize={13} color='secondary'>{new Date(createdDate).toLocaleString()}</Typography>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={8} sx={formStyles.descriptionField}>
        <TextField
          type='text'
          autoComplete='description'
          value={description}
          fullWidth
          multiline
          onChange={(evt) =>
            setUpdatedTask({
              ...updatedTask,
              description: evt.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={4} sx={formStyles.statusField}>
            <Typography color='secondary' fontSize={15}>Status</Typography>
          </Grid>
          <Grid item xs={8} sx={formStyles.selectorField}>
            <TaskStateInput
              updatedTask={updatedTask}
              setUpdatedTask={setUpdatedTask}
            />
          </Grid>
          <Grid item xs={5} sx={formStyles.assignedToField}>
            <Typography color='secondary' fontSize={15}>Assigned to</Typography>
          </Grid>
          <Grid item xs={7} sx={formStyles.selectorField}>
            <TaskAssignToInput
              updatedTask={updatedTask}
              setUpdatedTask={setUpdatedTask}
            />
          </Grid>
          <Grid item xs={4} sx={formStyles.priorityField}>
            <Typography color='secondary' fontSize={15}>Priority</Typography>
          </Grid>
          <Grid item xs={8} sx={formStyles.selectorField}>
            <PriorityInput item={updatedTask} setItem={setUpdatedTask} />
          </Grid>
          <Grid item xs={5} sx={formStyles.priorityField}>
            <Typography color='secondary' fontSize={15}>Story Points</Typography>
          </Grid>
          <Grid item xs={7} sx={formStyles.selectorField}>
            <StoryPointsInput task={updatedTask} setTask={setUpdatedTask} />
          </Grid>
        </Grid>
      </Grid>
      <TaskDateFields
        expectedEndTime={expectedEndTime}
        endDate={endDate}
        startDate={startDate}
      />
    </Grid>
  );
};
