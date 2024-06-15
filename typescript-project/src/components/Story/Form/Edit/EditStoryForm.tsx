import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { StoryModel } from '../../../../types/story';
import { StoryAssignToInput } from '../InputFields/StoryAssignToInput';
import { StoryStatusInput } from '../InputFields/StoryStatusInput';
import { PriorityInput } from '../../../common/InputFields/PriorityInput';
import { useGetUserById } from '../../../../queries/user/useGetUserById';

interface EditStoryFormProps {
  updatedStory: StoryModel;
  setUpdatedStory: (value: StoryModel) => void;
}

export const EditStoryForm: React.FC<EditStoryFormProps> = ({
  updatedStory,
  setUpdatedStory,
}) => {
  const { name, state, description, assignedToId, userId } = updatedStory;

  const { data: user } = useGetUserById(userId)

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
            setUpdatedStory({
              ...updatedStory,
              name: evt.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={5} sx={formStyles.reporterField}>
        <Grid item xs={5}>
          <Typography color='secondary'>
            <strong>Reporter</strong>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography color='secondary' fontSize={14}>
            {user?.name} {user?.surname}
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
            setUpdatedStory({
              ...updatedStory,
              description: evt.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={4} sx={formStyles.statusField}>
            <Typography color='secondary'>
              <strong>Status</strong>
            </Typography>
          </Grid>
          <Grid item xs={8} sx={formStyles.selectorField}>
            <StoryStatusInput
              updatedStory={updatedStory}
              setUpdatedStory={setUpdatedStory}
              state={state}
            />
          </Grid>
          <Grid item xs={5} sx={formStyles.assignedToField}>
            <Typography color='secondary'>
              <strong>Assigned to</strong>
            </Typography>
          </Grid>
          <Grid item xs={7} sx={formStyles.selectorField}>
            <StoryAssignToInput
              updatedStory={updatedStory}
              setUpdatedStory={setUpdatedStory}
              assignedToId={assignedToId ?? ''}
            />
          </Grid>
          <Grid item xs={4} sx={formStyles.priorityField}>
            <Typography color='secondary'>
              <strong>Priority</strong>
            </Typography>
          </Grid>
          <Grid item xs={8} sx={formStyles.selectorField}>
            <PriorityInput item={updatedStory} setItem={setUpdatedStory} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
