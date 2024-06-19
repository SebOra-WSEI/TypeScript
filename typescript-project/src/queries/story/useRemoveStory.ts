import { useState } from 'react';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { ERROR_DELAY, REDIRECT_DELAY } from '../../utils/consts';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, QueryResponse } from '../../types/response';
import { StoryModel } from '../../types/story';

type UseRemoveStoryResult = { remove: (id: string) => Promise<void> };

export const useRemoveStory = (isReload = true): UseRemoveStoryResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const remove = async (id: string): Promise<void> => {
    await axios
      .delete(endpoints.story(id), {
        headers: { Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}` },
      })
      .then((res: QueryResponse<StoryModel>) => {
        const { status, data } = res;

        if (status === StatusCode.OK && data.message) {
          setMessage(data.message);

          isReload &&
            setTimeout(() => {
              window.location.reload();
            }, REDIRECT_DELAY);
        }
      })
      .catch((error: ErrorResponse<undefined>) => {
        const { status, data } = error.response;

        if (status !== StatusCode.OK && data.error) {
          setError(data.error);
        }

        setTimeout(() => {
          setError('');
        }, ERROR_DELAY);
      });
  };

  useSetSeverity(error, message);

  return { remove };
};
