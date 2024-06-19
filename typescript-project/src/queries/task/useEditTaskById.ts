import { useState } from 'react';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { TaskBasic } from '../../types/task';
import { ERROR_DELAY, REDIRECT_DELAY } from '../../utils/consts';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, QueryResponse } from '../../types/response';

type UseEditTaskByIdResult = { update: (taskId: string) => void };

export const useEditTaskById = (newTask: TaskBasic): UseEditTaskByIdResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const update = async (taskId: string): Promise<void> => {
    await axios
      .put(endpoints.task(taskId), newTask, {
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
