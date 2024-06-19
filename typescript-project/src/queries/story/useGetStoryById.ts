import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { StoryModel } from '../../types/story';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, QueryResponse } from '../../types/response';

export const useGetStoryById = (id: string): FetchedData<StoryModel> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [story, setStory] = useState<StoryModel>();

  useEffect(() => {
    axios
      .get(endpoints.story(id), {
        headers: { Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}` },
      })
      .then((res: QueryResponse<StoryModel>) => {
        const { status, data } = res;

        if (status === StatusCode.OK && data.data) {
          setStory(data.data);
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
    data: story,
  };
};
