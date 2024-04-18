import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useState } from 'react';
import { StoryFormBody } from '../../../../types/story';
import { Priority } from '../../../../types/priority';
import { formStyles } from '../../../../styles/formStyles';
import { CreateStoryForm } from '../Form/CreateStoryForm';
import { useParams } from 'react-router';
import { useCreateStory } from '../../../../api/story/useCreateStory';
import {
  CURRENT_USER_ID,
  getFromLocalStorage,
} from '../../../../utils/localStorage';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateStoryFormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { projectId } = useParams<{ projectId: string }>();

  const defaultStory = {
    name: '',
    description: '',
    priority: Priority.High,
    projectId,
    ownerId: getFromLocalStorage(CURRENT_USER_ID),
  };

  const [story, setStory] = useState<StoryFormBody>(defaultStory);

  const { create } = useCreateStory(story);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    create();
  };

  const handleOnClose = (): void => {
    setStory(defaultStory);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={formStyles.box} component='form' onSubmit={handleCreate}>
        <DialogContent>
          <CreateStoryForm story={story} setStory={setStory} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOnClose}
            variant='contained'
            color='error'
            style={formStyles.button}
          >
            Close
          </Button>
          <Button variant='outlined' type='submit' style={formStyles.button}>
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
