import { useState } from 'react';
import { Project } from '../../controllers/project';
import { ProjectBasic } from '../../types/project';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';

type UseCreateProjectResult = { create: () => void };

export const useCreateProject = (
  project: ProjectBasic
): UseCreateProjectResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { name, description } = project;
  const newProject = new Project(name, description);

  const create = (): void => {
    const { status, response, message } = newProject.create();

    if (status !== StatusCode.Created && message) {
      setError(message);
      setTimeout(() => {
        setError('');
      }, 100);
    }

    if (status === StatusCode.Created && response) {
      setMessage(message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  useSetSeverity(error, message);

  return { create };
};
