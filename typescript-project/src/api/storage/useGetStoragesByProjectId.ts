import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { EMPTY_STORAGE } from './emptyStorage';
import { StorageModel } from '../../types/storage';

export const useGetStoragesByProjectId = (
  id: string
): FetchedData<Array<StorageModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [storages, setStorages] = useState<Array<StorageModel>>();

  useEffect(() => {
    const { errorMessage, status, response } =
      EMPTY_STORAGE.getAllByProjectId(id);

    if (!!errorMessage) {
      setError(errorMessage);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
      setStorages(response);
    }
  }, []);

  return {
    loading: isLoading,
    error,
    data: storages,
  };
};
