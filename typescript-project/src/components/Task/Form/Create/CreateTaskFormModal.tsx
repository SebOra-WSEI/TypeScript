import React, { useState } from 'react';
import { CreateTaskForm } from './CreateTaskForm';
import { TaskBasic } from '../../../../types/task';
import { useCreateTask } from '../../../../queries/task/useCreateTask';
import { ModalContent } from '../../../common/ModalContent';
import { Priority } from '../../../../types/priority';
import { State } from '../../../../types/state';

const defaultTask: TaskBasic = {
  name: '',
  description: '',
  priority: Priority.High,
  state: State.Todo,
  createdDate: String(new Date().getTime()),
  startDate: undefined,
  expectedEndTime: String(new Date().getTime()),
  endDate: undefined,
  storyPoint: 1,
  storyId: '',
};

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

  const handleCreate = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    await create();
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
