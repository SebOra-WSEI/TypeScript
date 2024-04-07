import { useState } from 'react';
import { Project } from '../../controllers/project';
import { ProjectFormBody } from '../../types/project';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';

type UseCreateProjectResult = FetchedData<Project> & { create: () => void };

export const useCreateProject = (
  project: ProjectFormBody
): UseCreateProjectResult => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { name, description } = project;
  const newProject = new Project(name, description);

  const create = () => {
    const { status, errorMessage, response, message } = newProject.create();

    if (!!errorMessage) {
      setError(errorMessage);
      setIsLoading(false);
    }

    if (status === StatusCode.Created && response) {
      setIsLoading(false);
      setMessage(message);

      setTimeout(() => {
        window.location.reload();
      }, 700);
    }
  };

  return {
    loading: isLoading,
    error,
    message,
    data: newProject,
    create,
  };
};
