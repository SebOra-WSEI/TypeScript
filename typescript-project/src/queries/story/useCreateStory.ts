import { useState } from 'react';
import { StatusCode } from '../../types/statusCode';
import { StoryBasic, StoryModel } from '../../types/story';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { useParams } from 'react-router';
import { ERROR_DELAY, REDIRECT_DELAY } from '../../utils/consts';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, QueryResponse } from '../../types/response';

type UseCreateStoryResult = { create: () => Promise<void> };

export const useCreateStory = (story: StoryBasic): UseCreateStoryResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { projectId } = useParams<{ projectId: string }>();

  const create = async (): Promise<void> => {
    await axios
      .post(endpoints.stories(projectId), story, {
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
