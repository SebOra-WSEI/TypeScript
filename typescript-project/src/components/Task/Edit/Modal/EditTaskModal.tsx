import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Modal,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formStyles } from '../../../../styles/formStyles';
import { TaskModel } from '../../../../types/task';
import { EditTaskForm } from '../Form/EditTaskForm';
import { useEditTaskById } from '../../../../api/task/useEditTaskById';
import { State } from '../../../../types/state';

interface EditTaskModalProps {
  task: TaskModel;
  isOpen: boolean;
  onClose: () => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const [updatedTask, setUpdatedTask] = useState<TaskModel>(task);

  useEffect(() => {
    switch (updatedTask.state) {
      case State.Doing:
        if (!!updatedTask.endDate) {
          updatedTask.endDate = undefined;
          break;
        }
        updatedTask.startDate = new Date();
        break;
      case State.Done:
        updatedTask.endDate = new Date();
        break;
      default:
        updatedTask.startDate = undefined;
        updatedTask.endDate = undefined;
        break;
    }
  }, [updatedTask.state])

  const { update } = useEditTaskById(updatedTask);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    update(task.id);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={formStyles.box} component='form' onSubmit={handleUpdate}>
        <DialogContent>
          <EditTaskForm
            updatedTask={updatedTask}
            setUpdatedTask={setUpdatedTask}
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
