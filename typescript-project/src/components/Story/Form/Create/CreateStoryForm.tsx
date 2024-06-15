import React, { useEffect } from 'react';
import { TextField, Typography } from '@mui/material';
import { StoryBasic } from '../../../../types/story';
import { PriorityInput } from '../../../common/InputFields/PriorityInput';
import { formStyles } from '../../../../styles/formStyles';
import { useParams } from 'react-router';

interface CreateStoryFormProps {
  story: StoryBasic;
  setStory: (value: StoryBasic) => void;
}

export const CreateStoryForm: React.FC<CreateStoryFormProps> = ({
  story,
  setStory,
}) => {
  const { name, description } = story;

  const { projectId } = useParams<{ projectId: string }>()

  useEffect(() => {
    setStory({
      ...story,
      projectId
    })
  }, [])

  return (
    <>
      <Typography color='secondary' sx={formStyles.centeredHeader}>
        Create new story
      </Typography>
      <TextField
        label='Name *'
        variant='standard'
        type='text'
        autoComplete='name'
        autoFocus
        value={name}
        fullWidth
        onChange={(evt) =>
          setStory({
            ...story,
            name: evt.target.value,
          })
        }
      />
      <TextField
        label='Description'
        variant='standard'
        type='text'
        autoComplete='description'
        value={description}
        fullWidth
        onChange={(evt) =>
          setStory({
            ...story,
            description: evt.target.value,
          })
        }
      />
      <PriorityInput item={story} setItem={setStory} isLabelEnabled />
    </>
  );
};
