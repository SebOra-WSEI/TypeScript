import { useState } from 'react';
import { EMPTY_PROJECT } from './project';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';

type UseRemoveProjectResult = { remove: (id: string) => void };

export const useRemoveProject = (isReload = true): UseRemoveProjectResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const remove = (id: string) => {
    const { status, response, message } = EMPTY_PROJECT.delete(id);

    if (status !== StatusCode.OK && message) {
      setError(message);
      setTimeout(() => {
        setError('');
      }, 100);
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
