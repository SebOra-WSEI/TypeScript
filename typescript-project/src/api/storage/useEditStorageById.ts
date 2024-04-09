import { useState } from 'react';
import { Storage } from '../../controllers/storage';
import { FetchedData } from '../../types/fetchedData';
import { UpdatedStorageFormBody } from '../../types/storage';
import { EMPTY_STORAGE } from './emptyStorage';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';

type UseEditStorageByIdResult = FetchedData<Storage> & {
  update?: (storageId: string) => void;
};

export const useEditStorageById = (
  newStorage: UpdatedStorageFormBody
): UseEditStorageByIdResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const update = (storageId: string) => {
    const { status, errorMessage, response, message } = EMPTY_STORAGE.update(
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
