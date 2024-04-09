import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useState } from 'react';
import { formStyles } from '../../../../styles/formStyles';
import { StorageModel } from '../../../../types/storage';
import { EditStorageForm } from '../Form/EditStorageForm';
import { useEditStorageById } from '../../../../api/storage/useEditStorageById';

interface EditStorageModalProps {
  storage: StorageModel;
  isOpen: boolean;
  onClose: () => void;
}

export const EditStorageModal: React.FC<EditStorageModalProps> = ({
  isOpen,
  onClose,
  storage,
}) => {
  const [updatedStorage, setUpdatedStorage] =
    useState<StorageModel>(storage);

  const { update } = useEditStorageById(updatedStorage);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    update && update(storage?.id ?? '');
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={formStyles.box} component='form' onSubmit={handleUpdate}>
        <DialogContent>
          <EditStorageForm
            storage={updatedStorage}
            setUpdatedStorage={setUpdatedStorage}
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
