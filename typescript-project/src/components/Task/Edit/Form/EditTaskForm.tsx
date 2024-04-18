import React from 'react';
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority } from '../../../../types/priority';
import { State } from '../../../../types/state';
import { useGetAllUsers } from '../../../../api/user/useGetAllUsers';
import { priorityIcons } from '../../../../utils/priorityIcons';
import { TaskModel } from '../../../../types/task';
import { UserRole } from '../../../../types/user';
import { storyPoints } from '../../../../utils/consts';
import { cardStyles } from '../../../../styles/card';

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
    state,
    priority,
    description,
    assignedToId,
    storyPoint,
    createdDate,
    expectedEndTime,
    startDate,
    endDate
  } = updatedTask;

  const { data: allUsers } = useGetAllUsers();
  const enabledUsers = allUsers?.filter((u) => u.role !== UserRole.Admin);

  return (
    <Grid container sx={formStyles.grid}>
      <Grid item xs={7} sx={formStyles.title}>
        <TextField
          sx={formStyles.titleText}
          variant='standard'
          type='text'
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
            <FormControl sx={formStyles.editFormControl} size='small'>
              <Select
                value={state}
                onChange={(evt) =>
                  setUpdatedTask({
                    ...updatedTask,
                    state: evt.target.value as State,
                  })
                }
              >
                {Object.values(State).map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5} sx={formStyles.assignedTo}>
            <strong>Assigned to</strong>
          </Grid>
          <Grid item xs={7} sx={formStyles.selector}>
            <FormControl sx={formStyles.editFormControl} size='small'>
              <Select
                displayEmpty
                value={assignedToId || 'Unassigned'}
                onChange={(evt) =>
                  setUpdatedTask({
                    ...updatedTask,
                    state:
                      evt.target.value === 'Unassigned'
                        ? State.Todo
                        : State.Doing,
                    assignedToId: evt.target.value,
                  })
                }
              >
                <MenuItem value='Unassigned'>Unassigned</MenuItem>
                {enabledUsers?.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} {user.surname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sx={formStyles.priority}>
            <strong>Priority</strong>
          </Grid>
          <Grid item xs={8} sx={formStyles.selector}>
            <FormControl sx={formStyles.editFormControl} size='small'>
              <Select
                value={priority}
                onChange={(evt) =>
                  setUpdatedTask({
                    ...updatedTask,
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
          </Grid>
          <Grid item xs={5} sx={formStyles.priority}>
            <strong>Story Points</strong>
          </Grid>
          <Grid item xs={7} sx={formStyles.selector}>
            <FormControl sx={formStyles.editFormControl} size='small'>
              <Select
                value={storyPoint}
                onChange={(evt) =>
                  setUpdatedTask({
                    ...updatedTask,
                    storyPoint: Number(evt.target.value),
                  })
                }
              >
                {storyPoints.map((point) => (
                  <MenuItem key={point} value={point}>
                    <span style={{ marginLeft: '0.5rem' }}>{point}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} sx={cardStyles.gridText}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant='inherit' fontSize={15}>Start at:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='inherit' fontSize={15}>{startDate ? new Date(startDate).toLocaleString() : '-'}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} sx={cardStyles.gridText}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant='inherit' fontSize={15}>Expected end at:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='inherit' fontSize={15}>{new Date(expectedEndTime).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} sx={cardStyles.gridText}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant='inherit' fontSize={15}> End at:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='inherit' fontSize={15}>{endDate ? new Date(endDate).toLocaleString() : '-'}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  );
};
