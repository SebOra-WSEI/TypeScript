import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { EMPTY_TASK } from './task';
import { TaskModel } from '../../types/task';

export const useGetTasksByStoryId = (
  storyId: string
): FetchedData<Array<TaskModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [tasks, setTasks] = useState<Array<TaskModel>>();

  useEffect(() => {
    const { status, response, message } = EMPTY_TASK.getAll();

    const filteredTasks = response?.filter((s) => s.storyId === storyId);

    if (status !== StatusCode.OK && message) {
      setError(message);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
      setTasks(filteredTasks);
    }
  }, []);

  return {
    loading: isLoading,
    error,
    data: tasks,
  };
};
