import React from 'react';
import { TextField } from '@mui/material';
import { formStyles } from '../../../../styles/formStyles';
import { StoryBasic } from '../../../../types/story';
import { PriorityInput } from '../../../common/InputFields/PriorityInput';

interface CreateStoryFormProps {
  story: StoryBasic;
  setStory: (value: StoryBasic) => void;
}

export const CreateStoryForm: React.FC<CreateStoryFormProps> = ({
  story,
  setStory,
}) => {
  const { name, description } = story;

  return (
    <>
      <h3 style={formStyles.header}>Create new story</h3>
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
      <PriorityInput
        item={story}
        setItem={setStory}
        isLabelEnabled
      />
    </>
  );
};
