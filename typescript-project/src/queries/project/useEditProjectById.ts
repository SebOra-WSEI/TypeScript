import { useState } from 'react';
import { EMPTY_PROJECT } from './project';
import { ProjectBasic } from '../../types/project';
import { FetchedData } from '../../types/fetchedData';
import { Project } from '../../controllers/project';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';

type UseEditProjectResult = FetchedData<Project> & {
  update: (projectId: string) => void;
};

export const useEditProjectById = (
  newProjectDetails: ProjectBasic
): UseEditProjectResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const update = (projectId: string) => {
    const { status, errorMessage, response, message } = EMPTY_PROJECT.update(
      projectId,
      newProjectDetails
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
