import { useState } from 'react';
import { Story } from '../../controllers/story';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { StoryFormBody } from '../../types/story';
import { State } from '../../types/state';
import { useSetSeverity } from '../../hooks/useSetSeverity';

type UseCreateStoryResult = FetchedData<Story> & { create: () => void };

export const useCreateStory = (story: StoryFormBody): UseCreateStoryResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { name, priority, projectId, ownerId, description } = story;
  const newStory = new Story(
    name,
    priority,
    projectId,
    ownerId,
    State.Todo,
    description
  );

  const create = (): void => {
    const { status, errorMessage, response, message } = newStory.create();

    if (!!errorMessage) {
      setError(errorMessage);
    }

    if (status === StatusCode.Created && response) {
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
    create,
  };
};
