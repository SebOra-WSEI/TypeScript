import React from 'react';
import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { Priority } from '../../../../types/priority';
import { StoryModel } from '../../../../types/story';
import { State } from '../../../../types/state';
import { useGetAllUsers } from '../../../../api/user/useGetAllUsers';
import { priorityIcons } from '../../../../utils/priorityIcons';

interface EditStoryFormProps {
  updatedStory: StoryModel;
  setUpdatedStory: (value: StoryModel) => void;
}

export const EditStoryForm: React.FC<EditStoryFormProps> = ({
  updatedStory,
  setUpdatedStory,
}) => {
  const { name, state, owner, priority, description, assignedToId } =
    updatedStory;

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
            setUpdatedStory({
              ...updatedStory,
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
            setUpdatedStory({
              ...updatedStory,
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
                  setUpdatedStory({
                    ...updatedStory,
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
                  setUpdatedStory({
                    ...updatedStory,
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
                  setUpdatedStory({
                    ...updatedStory,
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
