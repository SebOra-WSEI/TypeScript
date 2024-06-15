import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { StoryModel } from '../../types/story';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, QueryResponse } from '../../types/response';

export const useGetStoriesByProjectId = (
  projectId: string
): FetchedData<Array<StoryModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [stories, setStories] = useState<Array<StoryModel>>();

  useEffect(() => {
    axios
      .get(endpoints.stories(projectId), {
        headers: { Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}` },
      })
      .then((res: QueryResponse<Array<StoryModel>>) => {
        const { status, data } = res;

        if (status === StatusCode.OK && data.data) {
          setStories(data.data);
        }

        setIsLoading(false);
      })
      .catch((error: ErrorResponse<undefined>) => {
        const { status, data } = error.response;

        if (status !== StatusCode.OK && data.error) {
          setError(data.error);
          setIsLoading(false);
        }
      });
  }, []);

  return {
    loading: isLoading,
    error,
    data: stories,
  };
};
