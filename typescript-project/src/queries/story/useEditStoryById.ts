import { useState } from 'react';
import { Story } from '../../controllers/story';
import { FetchedData } from '../../types/fetchedData';
import { StoryBasic } from '../../types/story';
import { EMPTY_STORY } from './story';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';

type UseEditStoryByIdResult = FetchedData<Story> & {
  update: (storyId: string) => void;
};

export const useEditStoryById = (
  newStory: StoryBasic
): UseEditStoryByIdResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const update = (storyId: string) => {
    const { status, response, message } = EMPTY_STORY.update(storyId, newStory);

    if (status !== StatusCode.OK && message) {
      setError(message);
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
