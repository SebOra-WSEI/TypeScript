import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { StoryModel } from '../../types/story';
import { EMPTY_STORY } from './story';

export const useGetStoryById = (id: string): FetchedData<StoryModel> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [story, setStory] = useState<StoryModel>();

  useEffect(() => {
    const { status, response, message } = EMPTY_STORY.getById(id);

    if (status !== StatusCode.OK && message) {
      setError(message);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
      setStory(response);
      setMessage(message);
    }
  }, []);

  return {
    loading: isLoading,
    error,
    data: story,
    message,
  };
};
