import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SeverityOption } from '../../../types/severity';
import { StorageFormBody } from '../../../types/storage';
import { Priority } from '../../../types/priority';
import { State } from '../../../types/state';
import { formStyles } from '../../../styles/formStyles';
import { CreateStorageForm } from './Form/CreateStorageForm';
import { useParams } from 'react-router';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSeverity: (value: SeverityOption) => void;
  setSeverityText: (value: string) => void;
}

export const CreateStorageFormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  setSeverity,
  setSeverityText
}) => {
  const { projectId } = useParams<{ projectId: string }>();

  const [storage, setStorage] = useState<StorageFormBody>({
    name: '',
    description: '',
    priority: Priority.High,
    projectId,
    date: new Date(),
    ownerId: '',
    state: State.Todo
  });

  console.log(storage)

  // const { error, message, create } = useCreateProject(project);

  // useEffect(() => {
  //   if (error) {
  //     setSeverity(SeverityOption.Error);
  //     setSeverityText(error);
  //   }

  //   if (message) {
  //     setSeverity(SeverityOption.Success);
  //     setSeverityText(message);
  //   }
  // }, [error, message]);

  // const handleCreate = (event: React.FormEvent<HTMLFormElement>): void => {
  //   event.preventDefault();

  //   create();
  //   setSeverityText('');
  // };

  const handleOnClose = (): void => {
    // setProject({ name: '', description: '' });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={formStyles.box} component='form'>
        <DialogContent>
          <CreateStorageForm
            storage={storage}
            setStorage={setStorage}
          />
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
          <Button
            variant='outlined'
            type='submit'
            style={formStyles.button}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
