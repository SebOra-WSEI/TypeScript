import { useState } from 'react';
import { StatusCode } from '../../types/statusCode';
import { EMPTY_STORY } from './story';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { REDIRECT_DELAY } from '../../utils/consts';

type UseRemoveStoryResult = { remove: (id: string) => void };

export const useRemoveStory = (isReload = true): UseRemoveStoryResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const remove = (id: string) => {
    const { status, response, message } = EMPTY_STORY.delete(id);

    if (status !== StatusCode.OK && message) {
      setError(message);
    }

    if (status === StatusCode.OK && response) {
      setMessage(message);

      isReload &&
        setTimeout(() => {
          window.location.reload();
        }, REDIRECT_DELAY);
    }
  };
  useSetSeverity(error, message);

  return { remove };
};
