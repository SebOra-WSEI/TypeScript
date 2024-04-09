import { useState } from 'react';
import { StatusCode } from '../../types/statusCode';
import { FetchedData } from '../../types/fetchedData';
import { EMPTY_STORAGE } from './emptyStorage';
import { Storage } from '../../controllers/storage';

type UseRemoveStorageResult = FetchedData<Storage> & {
  remove: (id: string) => void;
};

export const useRemoveStorage = (): UseRemoveStorageResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const remove = (id: string) => {
    const { status, errorMessage, response, message } =
      EMPTY_STORAGE.delete(id);

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

  return {
    error,
    message,
    remove,
  };
};
