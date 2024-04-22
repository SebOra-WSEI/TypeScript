import React, { useState } from 'react';
import { CreateTaskForm } from './CreateTaskForm';
import { TaskBasic } from '../../../../types/task';
import { useCreateTask } from '../../../../queries/task/useCreateTask';
import { defaultTask } from '../../../../queries/task/task';
import { ModalContent } from '../../../common/ModalContent';

interface CreateTaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTaskFormModal: React.FC<CreateTaskFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [task, setTask] = useState<TaskBasic>(defaultTask);

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
    <ModalContent
      isOpen={isOpen}
      handleOnClose={handleOnClose}
      onSubmit={handleCreate}
      type='create'
    >
      <CreateTaskForm task={task} setTask={setTask} />
    </ModalContent>
  );
};
