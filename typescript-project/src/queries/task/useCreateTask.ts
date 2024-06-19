import { useState } from 'react';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { TaskBasic } from '../../types/task';
import { useParams } from 'react-router';
import { ERROR_DELAY, REDIRECT_DELAY } from '../../utils/consts';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, QueryResponse } from '../../types/response';
import { StoryModel } from '../../types/story';

type UseCreateTaskResult = { create: () => void };

export const useCreateTask = (task: TaskBasic): UseCreateTaskResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { storyId } = useParams<{ storyId: string }>();

  const create = async (): Promise<void> => {
    await axios
      .post(endpoints.tasks(storyId), task, {
        headers: {
          Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}`,
        },
      })
      .then((res: QueryResponse<StoryModel>) => {
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
