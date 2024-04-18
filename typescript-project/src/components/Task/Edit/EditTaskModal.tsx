import React, { useEffect, useState } from 'react';
import { TaskModel } from '../../../types/task';
import { EditTaskForm } from './EditTaskForm';
import { useEditTaskById } from '../../../queries/task/useEditTaskById';
import { ModalContent } from '../../common/Modal/ModalContext';
import { updateTaskDates } from '../../../utils/updateTaskDates';

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
  const [updatedTask, setUpdatedTask] = useState<TaskModel>({
    ...task,
    ...(!task.assignedToId && {
      assignedToId: 'Unassigned',
    }),
  });

  useEffect(() => {
    setUpdatedTask(updateTaskDates(updatedTask));
  }, [updatedTask.state, setUpdatedTask]);

  const { update } = useEditTaskById(updatedTask);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    update(task.id);
  };

  return (
    <ModalContent
      isOpen={isOpen}
      handleOnClose={onClose}
      onSubmit={handleUpdate}
      type='update'
    >
      <EditTaskForm updatedTask={updatedTask} setUpdatedTask={setUpdatedTask} />
    </ModalContent>
  );
};
