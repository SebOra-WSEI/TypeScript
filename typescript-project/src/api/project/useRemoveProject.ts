import { useState } from 'react';
import { EMPTY_PROJECT } from './emptyProject';
import { StatusCode } from '../../types/statusCode';
import { FetchedData } from '../../types/fetchedData';
import { Project } from '../../controllers/project';

type UseRemoveProjectResult = FetchedData<Project> & {
  remove: (id: string) => void;
};

export const useRemoveProject = (): UseRemoveProjectResult => {
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

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return {
    error,
    message,
    remove,
  };
};
