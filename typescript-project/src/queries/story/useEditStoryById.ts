import { useState } from 'react';
import { StoryBasic } from '../../types/story';
import { EMPTY_STORY } from './story';
import { StatusCode } from '../../types/statusCode';
import { useSetSeverity } from '../../hooks/useSetSeverity';

type UseEditStoryByIdResult = { update: (storyId: string) => void };

export const useEditStoryById = (
  newStory: StoryBasic
): UseEditStoryByIdResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const update = (storyId: string) => {
    const { status, response, message } = EMPTY_STORY.update(storyId, newStory);

    if (status !== StatusCode.OK && message) {
      setError(message);
      setTimeout(() => {
        setError('');
      }, 100);
    }

    if (status === StatusCode.OK && response) {
      setMessage(message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  useSetSeverity(error, message);

  return { update };
};
