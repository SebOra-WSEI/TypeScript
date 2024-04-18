import React from 'react';
import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority } from '../../../../types/priority';
import { State } from '../../../../types/state';
import { useGetAllUsers } from '../../../../api/user/useGetAllUsers';
import { priorityIcons } from '../../../../utils/priorityIcons';
import { TaskModel } from '../../../../types/task';

interface EditTaskFormProps {
  updatedTask: TaskModel;
  setUpdatedTask: (value: TaskModel) => void;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({
  updatedTask,
  setUpdatedTask,
}) => {
  const { name, state, priority, description, assignedToId } =
    updatedTask;

  const { data: allUsers } = useGetAllUsers();

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
        <Grid item xs={5}>
          <strong>Reporter</strong>
        </Grid>
        <Grid item xs={3}>
          {/* {owner?.name} {owner?.surname}  */}
          abc
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
                {allUsers?.map((user) => (
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
        </Grid>
      </Grid>
    </Grid>
  );
};
