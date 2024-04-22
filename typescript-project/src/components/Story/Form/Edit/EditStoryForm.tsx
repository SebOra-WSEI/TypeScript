import React from 'react';
import { Grid, TextField } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { StoryBasic } from '../../../../types/story';
import { StoryAssignToInput } from '../InputFields/StoryAssignToInput';
import { StoryStatusInput } from '../InputFields/StoryStatusInput';
import { PriorityInput } from '../../../common/InputFields/PriorityInput';

interface EditStoryFormProps {
  updatedStory: StoryBasic;
  setUpdatedStory: (value: StoryBasic) => void;
}

export const EditStoryForm: React.FC<EditStoryFormProps> = ({
  updatedStory,
  setUpdatedStory,
}) => {
  const { name, state, owner, description, assignedToId } = updatedStory;

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
            <StoryStatusInput
              updatedStory={updatedStory}
              setUpdatedStory={setUpdatedStory}
              state={state}
            />
          </Grid>
          <Grid item xs={5} sx={formStyles.assignedTo}>
            <strong>Assigned to</strong>
          </Grid>
          <Grid item xs={7} sx={formStyles.selector}>
            <StoryAssignToInput
              updatedStory={updatedStory}
              setUpdatedStory={setUpdatedStory}
              assignedToId={assignedToId ?? ''}
            />
          </Grid>
          <Grid item xs={4} sx={formStyles.priority}>
            <strong>Priority</strong>
          </Grid>
          <Grid item xs={8} sx={formStyles.selector}>
            <PriorityInput
              item={updatedStory}
              setItem={setUpdatedStory}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
