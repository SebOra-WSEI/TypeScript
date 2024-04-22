import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { EMPTY_STORY } from './story';
import { StoryModel } from '../../types/story';
import { EMPTY_USER } from '../user/emptyUser';
import { LOADING_DELAY } from '../../utils/consts';

export const useGetStoriesByProjectId = (
  projectId: string
): FetchedData<Array<StoryModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [stories, setStories] = useState<Array<StoryModel>>();

  useEffect(() => {
    const { status, message, response } = EMPTY_STORY.getAll();

    const filteredStories = response?.filter((s) => s.projectId === projectId);
    const extendedStories = filteredStories?.map((story) => ({
      ...story,
      owner: EMPTY_USER.getById(story.ownerId).response,
    }));

    if (status !== StatusCode.OK && message) {
      setError(message);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, LOADING_DELAY);
      setStories(extendedStories);
    }
  }, []);

  return {
    loading: isLoading,
    error,
    data: stories,
  };
};
