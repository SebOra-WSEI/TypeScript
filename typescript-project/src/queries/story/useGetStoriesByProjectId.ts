import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { EMPTY_STORY } from './story';
import { StoryModel } from '../../types/story';
import { EMPTY_USER } from '../user/emptyUser';

export const useGetStoriesByProjectId = (
  projectId: string
): FetchedData<Array<StoryModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [stories, setStories] = useState<Array<StoryModel>>();

  useEffect(() => {
    const { status, errorMessage, response } = EMPTY_STORY.getAll();

    const filteredStories = response?.filter((s) => s.projectId === projectId);
    const extendedStories = filteredStories?.map((story) => ({
      ...story,
      owner: EMPTY_USER.getById(story.ownerId).response,
    }));

    if (!!errorMessage) {
      setError(errorMessage);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
      setStories(extendedStories);
    }
  }, []);

  return {
    loading: isLoading,
    error,
    data: stories,
  };
};