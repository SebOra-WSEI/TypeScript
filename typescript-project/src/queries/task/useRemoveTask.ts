import { useState } from 'react';
import { StatusCode } from '../../types/statusCode';
import { FetchedData } from '../../types/fetchedData';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { Task } from '../../controllers/task';
import { EMPTY_TASK } from './task';

type UseRemoveTaskResult = FetchedData<Task> & {
  remove: (id: string) => void;
};

export const useRemoveTask = (isReload = true): UseRemoveTaskResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const remove = (id: string) => {
    const { status, errorMessage, response, message } = EMPTY_TASK.delete(id);

    if (!!errorMessage) {
      setError(errorMessage);
    }

    if (status === StatusCode.OK && response) {
      setMessage(message);

      isReload &&
        setTimeout(() => {
          window.location.reload();
        }, 1000);
    }
  };
  useSetSeverity(error, message);

  return {
    error,
    message,
    remove,
  };
};
