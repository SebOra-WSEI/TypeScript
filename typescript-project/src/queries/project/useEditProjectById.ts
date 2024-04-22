import { useState } from 'react';
import { EMPTY_PROJECT } from './project';
import { ProjectBasic } from '../../types/project';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { ERROR_DELAY, REDIRECT_DELAY } from '../../utils/consts';

type UseEditProjectResult = { update: (projectId: string) => void };

export const useEditProjectById = (
  newProjectDetails: ProjectBasic
): UseEditProjectResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const update = (projectId: string) => {
    const { status, response, message } = EMPTY_PROJECT.update(
      projectId,
      newProjectDetails
    );

    if (status !== StatusCode.OK && message) {
      setError(message);
      setTimeout(() => {
        setError('');
      }, ERROR_DELAY);
    }

    if (status === StatusCode.OK && response) {
      setMessage(message);

      setTimeout(() => {
        window.location.reload();
      }, REDIRECT_DELAY);
    }
  };

  useSetSeverity(error, message);

  return { update };
};
