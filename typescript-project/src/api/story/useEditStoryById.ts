import { useState } from 'react';
import { Story } from '../../controllers/story';
import { FetchedData } from '../../types/fetchedData';
import { UpdatedStoryFormBody } from '../../types/story';
import { EMPTY_STORY } from './emptyStory';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';

type UseEditStorageByIdResult = FetchedData<Story> & {
  update: (storageId: string) => void;
};

export const useEditStorageById = (
  newStorage: UpdatedStoryFormBody
): UseEditStorageByIdResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const update = (storageId: string) => {
    const { status, errorMessage, response, message } = EMPTY_STORY.update(
      storageId,
      newStorage
    );

    if (!!errorMessage) {
      setError(errorMessage);
    }

    if (status === StatusCode.OK && response) {
      setMessage(message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  useSetSeverity(error, message);

  return {
    error,
    message,
    update,
  };
};
