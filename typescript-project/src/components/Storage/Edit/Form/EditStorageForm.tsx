import React from 'react';
import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority, priorityIcons } from '../../../../types/priority';
import { StorageModel } from '../../../../types/storage';
import { State } from '../../../../types/state';
import { useGetAllUsers } from '../../../../api/user/useGetAllUsers';

interface EditStorageFormProps {
  updatedStorage: StorageModel;
  setUpdatedStorage: (value: StorageModel) => void;
}

export const EditStorageForm: React.FC<EditStorageFormProps> = ({
  updatedStorage,
  setUpdatedStorage,
}) => {
  const { name, state, owner, priority, description, assignedToId } =
    updatedStorage;

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
            setUpdatedStorage({
              ...updatedStorage,
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
          {owner?.name} {owner?.surname}
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
            setUpdatedStorage({
              ...updatedStorage,
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
                  setUpdatedStorage({
                    ...updatedStorage,
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
                  setUpdatedStorage({
                    ...updatedStorage,
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
                  setUpdatedStorage({
                    ...updatedStorage,
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
