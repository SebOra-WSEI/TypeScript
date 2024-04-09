import { useState } from 'react';
import { Storage } from '../../controllers/storage';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { StorageFormBody } from '../../types/storage';
import { State } from '../../types/state';

type UseCreateStorageResult = FetchedData<Storage> & { create: () => void };

export const useCreateStorage = (
  storage: StorageFormBody
): UseCreateStorageResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { name, priority, projectId, ownerId, description } = storage;
  const newStorage = new Storage(
    name,
    priority,
    projectId,
    ownerId,
    State.Todo,
    description
  );

  const create = (): void => {
    const { status, errorMessage, response, message } = newStorage.create();

    if (!!errorMessage) {
      setError(errorMessage);
    }

    if (status === StatusCode.Created && response) {
      setMessage(message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return {
    error,
    message,
    create,
  };
};
