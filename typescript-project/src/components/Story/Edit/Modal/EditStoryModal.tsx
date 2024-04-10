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
import { useEditStorageById } from '../../../../api/story/useEditStoryById';

interface EditStoryModalProps {
  story: StoryModel;
  isOpen: boolean;
  onClose: () => void;
}

export const EditStoryModal: React.FC<EditStoryModalProps> = ({
  isOpen,
  onClose,
  story: storage,
}) => {
  const [updatedStorage, setUpdatedStorage] = useState<StoryModel>(storage);

  const { update } = useEditStorageById(updatedStorage);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    update(storage?.id ?? '');
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={formStyles.box} component='form' onSubmit={handleUpdate}>
        <DialogContent>
          <EditStoryForm
            updatedStory={updatedStorage}
            setUpdatedStory={setUpdatedStorage}
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
