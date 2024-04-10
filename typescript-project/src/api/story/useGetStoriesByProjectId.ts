import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { EMPTY_STORY } from './emptyStory';
import { StoryModel } from '../../types/story';

export const useGetStoragesByProjectId = (
  id: string
): FetchedData<Array<StoryModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [storages, setStorages] = useState<Array<StoryModel>>();

  useEffect(() => {
    const { errorMessage, status, response } =
      EMPTY_STORY.getAllByProjectId(id);

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
