import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useState } from 'react';
import { StorageFormBody } from '../../../types/storage';
import { Priority } from '../../../types/priority';
import { formStyles } from '../../../styles/formStyles';
import { CreateStorageForm } from './Form/CreateStorageForm';
import { useParams } from 'react-router';
import { useCreateStorage } from '../../../api/storage/useCreateStorage';
import {
  CURRENT_USER_ID,
  getFromLocalStorage,
} from '../../../utils/localStorage';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateStorageFormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { projectId } = useParams<{ projectId: string }>();

  const defaultStorage = {
    name: '',
    description: '',
    priority: Priority.High,
    projectId,
    ownerId: getFromLocalStorage(CURRENT_USER_ID),
  };

  const [storage, setStorage] = useState<StorageFormBody>(defaultStorage);

  const { create } = useCreateStorage(storage);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    create();
  };

  const handleOnClose = (): void => {
    setStorage(defaultStorage);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={formStyles.box} component='form' onSubmit={handleCreate}>
        <DialogContent>
          <CreateStorageForm storage={storage} setStorage={setStorage} />
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
