import { useState } from 'react';
import { StatusCode } from '../../types/statusCode';
import { FetchedData } from '../../types/fetchedData';
import { EMPTY_STORY } from './story';
import { Story } from '../../controllers/story';
import { useSetSeverity } from '../../hooks/useSetSeverity';

type UseRemoveStoryResult = FetchedData<Story> & {
  remove: (id: string) => void;
};

export const useRemoveStory = (isReload = true): UseRemoveStoryResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const remove = (id: string) => {
    const { status, errorMessage, response, message } = EMPTY_STORY.delete(id);

    if (!!errorMessage) {
      setError(errorMessage);
    }

    if (status === StatusCode.OK && response) {
      setMessage(message);

      isReload &&
        setTimeout(() => {
          window.location.reload();
        }, 1000);
    }
  };
  useSetSeverity(error, message);

  return {
    error,
    message,
    remove,
  };
};
