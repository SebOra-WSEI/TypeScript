import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useState } from 'react';
import { formStyles } from '../../../../styles/formStyles';
import { StoryModel } from '../../../../types/story';
import { EditStoryForm } from '../Form/EditStoryForm';
import { useEditStoryById } from '../../../../api/story/useEditStoryById';

interface EditStoryModalProps {
  story: StoryModel;
  isOpen: boolean;
  onClose: () => void;
}

export const EditStoryModal: React.FC<EditStoryModalProps> = ({
  isOpen,
  onClose,
  story,
}) => {
  const [updatedStory, setUpdatedStory] = useState<StoryModel>(story);

  const { update } = useEditStoryById(updatedStory);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    update(story.id);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={formStyles.box} component='form' onSubmit={handleUpdate}>
        <DialogContent>
          <EditStoryForm
            updatedStory={updatedStory}
            setUpdatedStory={setUpdatedStory}
          />
        </DialogContent>
        <DialogActions sx={formStyles.dialogAction}>
          <Button
            onClick={onClose}
            variant='contained'
            color='error'
            style={formStyles.button}
          >
            Close
          </Button>
          <Button variant='outlined' type='submit' style={formStyles.button}>
            Update
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
