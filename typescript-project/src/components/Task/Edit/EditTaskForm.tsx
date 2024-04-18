import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { formStyles } from '../../../styles/formStyles';
import { TaskModel } from '../../../types/task';
import { EditTaskStateInput } from './InputFields/EditTaskStateInput';
import { EditTaskAssignToInput } from './InputFields/EditTaskAssignToInput';
import { EditTaskPriorityInput } from './InputFields/EditTaskPriorityInput';
import { EditTaskStoryPointInput } from './InputFields/EditTaskStoryPointInput';
import { EditTaskDateFields } from './InputFields/EditTaskDateFields';

interface EditTaskFormProps {
  updatedTask: TaskModel;
  setUpdatedTask: (value: TaskModel) => void;
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
    <Grid container sx={formStyles.grid}>
      <Grid item xs={7} sx={formStyles.title}>
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
      <Grid item xs={5} sx={formStyles.reporter}>
        <Grid item xs={4}>
          <strong>Created at:</strong>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='inherit' fontSize={15}>
            {new Date(createdDate).toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={8} sx={formStyles.description}>
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
          <Grid item xs={4} sx={formStyles.status}>
            <strong>Status</strong>
          </Grid>
          <Grid item xs={8} sx={formStyles.selector}>
            <EditTaskStateInput
              updatedTask={updatedTask}
              setUpdatedTask={setUpdatedTask}
            />
          </Grid>
          <Grid item xs={5} sx={formStyles.assignedTo}>
            <strong>Assigned to</strong>
          </Grid>
          <Grid item xs={7} sx={formStyles.selector}>
            <EditTaskAssignToInput
              updatedTask={updatedTask}
              setUpdatedTask={setUpdatedTask}
            />
          </Grid>
          <Grid item xs={4} sx={formStyles.priority}>
            <strong>Priority</strong>
          </Grid>
          <Grid item xs={8} sx={formStyles.selector}>
            <EditTaskPriorityInput
              updatedTask={updatedTask}
              setUpdatedTask={setUpdatedTask}
            />
          </Grid>
          <Grid item xs={5} sx={formStyles.priority}>
            <strong>Story Points</strong>
          </Grid>
          <Grid item xs={7} sx={formStyles.selector}>
            <EditTaskStoryPointInput
              updatedTask={updatedTask}
              setUpdatedTask={setUpdatedTask}
            />
          </Grid>
        </Grid>
      </Grid>
      <EditTaskDateFields
        expectedEndTime={expectedEndTime}
        endDate={endDate}
        startDate={startDate}
      />
    </Grid>
  );
};
