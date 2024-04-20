import { useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { Task } from '../../controllers/task';
import { TaskBasic } from '../../types/task';
import { useParams } from 'react-router';

type UseCreateTaskResult = FetchedData<Task> & { create: () => void };

export const useCreateTask = (task: TaskBasic): UseCreateTaskResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { storyId } = useParams<{ storyId: string }>();

  const {
    name,
    description,
    priority,
    state,
    storyPoint,
    assignedToId,
    expectedEndTime,
    endDate,
    startDate,
  } = task;

  const newTask = new Task(
    name,
    description,
    storyId,
    priority,
    state,
    expectedEndTime,
    storyPoint,
    assignedToId,
    startDate,
    endDate
  );

  const create = (): void => {
    const { status, errorMessage, response, message } = newTask.create();

    if (!!errorMessage) {
      setError(errorMessage);
    }

    if (status === StatusCode.Created && response) {
      setMessage(message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  useSetSeverity(error, message);

  return {
    error,
    message,
    create,
  };
};
