import { useState } from 'react';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { EMPTY_TASK } from './task';

type UseRemoveTaskResult = { remove: (id: string) => void };

export const useRemoveTask = (isReload = true): UseRemoveTaskResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const remove = (id: string) => {
    const { status, response, message } = EMPTY_TASK.delete(id);

    if (status !== StatusCode.OK && message) {
      setError(message);
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

  return { remove };
};
