import { useState } from 'react';
import { EMPTY_PROJECT } from './project';
import { StatusCode } from '../../types/statusCode';
import { FetchedData } from '../../types/fetchedData';
import { Project } from '../../controllers/project';
import { useSetSeverity } from '../../hooks/useSetSeverity';

type UseRemoveProjectResult = FetchedData<Project> & {
  remove: (id: string) => void;
};

export const useRemoveProject = (isReload = true): UseRemoveProjectResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const remove = (id: string) => {
    const { status, errorMessage, response, message } =
      EMPTY_PROJECT.delete(id);

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