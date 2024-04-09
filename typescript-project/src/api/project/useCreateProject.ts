import { useState } from 'react';
import { Project } from '../../controllers/project';
import { ProjectFormBody } from '../../types/project';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';

type UseCreateProjectResult = FetchedData<Project> & { create: () => void };

export const useCreateProject = (
  project: ProjectFormBody
): UseCreateProjectResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { name, description } = project;
  const newProject = new Project(name, description);

  const create = (): void => {
    const { status, errorMessage, response, message } = newProject.create();

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
