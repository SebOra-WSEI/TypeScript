import { useState } from 'react';
import { Story } from '../../controllers/story';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { StoryBasic } from '../../types/story';
import { State } from '../../types/state';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { useParams } from 'react-router';

type UseCreateStoryResult = FetchedData<Story> & { create: () => void };

export const useCreateStory = (story: StoryBasic): UseCreateStoryResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { projectId } = useParams<{ projectId: string }>();

  const { name, priority, ownerId, description } = story;

  const newStory = new Story(
    name,
    priority,
    projectId,
    ownerId,
    State.Todo,
    description
  );

  const create = (): void => {
    const { status, response, message } = newStory.create();

    if (status !== StatusCode.Created && message) {
      setError(message);
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
