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
import { useEditTaskById } from '../../../../queries/task/useEditTaskById';
import { State } from '../../../../types/state';

interface EditTaskModalProps {
  task: TaskModel;
  isOpen: boolean;
  onClose: () => void;
}

const switch1 = (task: TaskModel): TaskModel => {
  switch (task.state) {
    case State.Doing:
      if (!!task.endDate) {
        task.endDate = undefined;
        break;
      }
      task.startDate = new Date();
      break;
    case State.Done:
      task.endDate = new Date();
      break;
    default:
      task.startDate = undefined;
      task.endDate = undefined;
      break;
  }

  return task
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const [updatedTask, setUpdatedTask] = useState<TaskModel>(task);

  useEffect(() => {
    setUpdatedTask(switch1(updatedTask))
  }, [updatedTask.state, setUpdatedTask])

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
