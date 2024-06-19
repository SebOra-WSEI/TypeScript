import React, { useEffect, useState } from 'react';
import { TaskBasic, TaskModel } from '../../../../types/task';
import { EditTaskForm } from './EditTaskForm';
import { useEditTaskById } from '../../../../queries/task/useEditTaskById';
import { ModalContent } from '../../../common/ModalContent';
import { updateTaskDates } from '../../../../utils/updateTaskDates';

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
  const [updatedTask, setUpdatedTask] = useState<TaskBasic>({
    ...task,
    ...(!task.assignedToId && {
      assignedToId: 'Unassigned',
    }),
  });

  useEffect(() => {
    setUpdatedTask(updateTaskDates(updatedTask));
  }, [updatedTask.state, setUpdatedTask]);

  const { update } = useEditTaskById(updatedTask);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await update(String(task.id));
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
