import { useState } from 'react';
import { Story } from '../../controllers/story';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { EMPTY_TASK } from './task';
import { TaskBasic } from '../../types/task';

type UseEditTaskByIdResult = FetchedData<Story> & {
  update: (taskId: string) => void;
};

export const useEditTaskById = (newTask: TaskBasic): UseEditTaskByIdResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const update = (taskId: string) => {
    const { status, errorMessage, response, message } = EMPTY_TASK.update(
      taskId,
      newTask
    );

    if (!!errorMessage) {
      setError(errorMessage);
    }

    if (status === StatusCode.OK && response) {
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
    update,
  };
};
