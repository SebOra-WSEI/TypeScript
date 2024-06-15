import { useState } from 'react';
import { ProjectBasic } from '../../types/project';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { ERROR_DELAY, REDIRECT_DELAY } from '../../utils/consts';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, QueryResponse } from '../../types/response';

type UseEditProjectResult = { update: (projectId: string) => Promise<void> };

export const useEditProjectById = (
  newProjectDetails: ProjectBasic
): UseEditProjectResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const update = async (projectId: string): Promise<void> => {
    await axios
      .put(endpoints.project(projectId), newProjectDetails, {
        headers: { Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}` },
      })
      .then((res: QueryResponse<undefined>) => {
        const { status, data } = res;

        if (status === StatusCode.OK && data.message) {
          setMessage(data.message);
          setTimeout(() => {
            window.location.reload();
          }, REDIRECT_DELAY);
        }
      })
      .catch((error: ErrorResponse<undefined>) => {
        const { status, data } = error.response;

        if (status !== StatusCode.OK && data.error) {
          setError(data.error);

          setTimeout(() => {
            setError('');
          }, ERROR_DELAY);
        }
      });
  };

  useSetSeverity(error, message);

  return { update };
};
