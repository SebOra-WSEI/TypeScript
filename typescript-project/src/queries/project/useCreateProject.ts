import { useState } from 'react';
import { ProjectBasic, ProjectModel } from '../../types/project';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { ERROR_DELAY, REDIRECT_DELAY } from '../../utils/consts';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, QueryResponse } from '../../types/response';

type UseCreateProjectResult = { create: () => void };

export const useCreateProject = (
  project: ProjectBasic
): UseCreateProjectResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const create = async (): Promise<void> => {
    axios
      .post(endpoints.projects, project, {
        headers: {
          Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}`,
        },
      })
      .then((res: QueryResponse<ProjectModel>) => {
        const { status, data } = res;

        if (status === StatusCode.Created && data.message) {
          setMessage(data.message);

          setTimeout(() => {
            window.location.reload();
          }, REDIRECT_DELAY);
        }
      })
      .catch((error: ErrorResponse<undefined>) => {
        const { status, data } = error.response;

        if (status !== StatusCode.Created && data.error) {
          setError(data.error);
          setTimeout(() => {
            setError('');
          }, ERROR_DELAY);
        }
      });
  };

  useSetSeverity(error, message);

  return { create };
};
