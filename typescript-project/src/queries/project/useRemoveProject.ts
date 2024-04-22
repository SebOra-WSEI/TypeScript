import { useState } from 'react';
import { EMPTY_PROJECT } from './project';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { REDIRECT_DELAY } from '../../utils/consts';

type UseRemoveProjectResult = { remove: (id: string) => void };

export const useRemoveProject = (isReload = true): UseRemoveProjectResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const remove = (id: string) => {
    const { status, response, message } = EMPTY_PROJECT.delete(id);

    if (status !== StatusCode.OK && message) {
      setError(message);
    }

    if (status === StatusCode.OK && response) {
      setMessage(message);

      isReload &&
        setTimeout(() => {
          window.location.reload();
        }, REDIRECT_DELAY);
    }
  };

  useSetSeverity(error, message);

  return { remove };
};
