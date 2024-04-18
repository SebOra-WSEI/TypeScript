import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useState } from 'react';
import { formStyles } from '../../../../styles/formStyles';
import { CreateTaskForm } from '../Form/CreateTaskForm';
import { TaskFormBody } from '../../../../types/task';
import { useCreateTask } from '../../../../queries/task/useCreateTask';
import { defaultTask } from '../../../../queries/task/task';

interface CreateTaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTaskFormModal: React.FC<CreateTaskFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [task, setTask] = useState<TaskFormBody>(defaultTask);

  const { create } = useCreateTask(task);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    create();
  };

  const handleOnClose = (): void => {
    setTask(defaultTask);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={formStyles.box} component='form' onSubmit={handleCreate}>
        <DialogContent>
          <CreateTaskForm task={task} setTask={setTask} />
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
