import React from 'react';
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority, priorityIcons } from '../../../../types/priority';
import { StorageModel } from '../../../../types/storage';
import { State } from '../../../../types/state';
import { useGetAllUsers } from '../../../../api/user/useGetAllUsers';

interface EditStorageFormProps {
  storage: StorageModel;
  setUpdatedStorage: (value: StorageModel) => void;
}

export const EditStorageForm: React.FC<EditStorageFormProps> = ({
  storage,
  setUpdatedStorage,
}) => {
  const { name, state, owner, priority, description } = storage;

  const { data: allUsers } = useGetAllUsers();

  return (
    <Grid container sx={{ width: '60rem' }}>
      <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          sx={{ width: '20rem' }}
          variant='standard'
          type='text'
          value={name}
          onChange={(evt) =>
            setUpdatedStorage({
              ...storage,
              name: evt.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
        <Grid item xs={5}>
          <strong>Reporter</strong>
        </Grid>
        <Grid item xs={3}>
          {owner?.name}{' '}{owner?.surname}
        </Grid>
      </Grid>
      <Grid item xs={9} sx={{ marginTop: '4rem' }}>
        <TextField
          type='text'
          autoComplete='description'
          value={description}
          fullWidth
          multiline
          onChange={(evt) =>
            setUpdatedStorage({
              ...storage,
              description: evt.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={3}>
        <Grid container>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '1.3rem' }}>
            <strong>Status</strong>
          </Grid>
          <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'end' }}>
            <FormControl sx={formStyles.formControl} size='small'>
              <Select
                value={state}
                onChange={(evt) =>
                  setUpdatedStorage({
                    ...storage,
                    state: evt.target.value as State,
                  })
                }
              >
                {Object.values(State).map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '1.3rem' }}>
            <strong>Assigned to</strong>
          </Grid>
          <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'end' }}>
            <FormControl sx={formStyles.formControl} size='small'>
              <Select
                value={owner?.id}
                onChange={(evt) =>
                  setUpdatedStorage({
                    ...storage,
                    ownerId: evt.target.value
                  })
                }
              >
                {allUsers?.map((p) => (
                  <MenuItem key={p?.id} value={p?.id}>
                    {p?.name}{' '}{p?.surname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '1.3rem' }}>
            <strong>Priority</strong>
          </Grid>
          <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'end' }}>
            <FormControl sx={formStyles.formControl} size='small'>
              <Select
                value={priority}
                onChange={(evt) =>
                  setUpdatedStorage({
                    ...storage,
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
    </Grid >
  );
};
