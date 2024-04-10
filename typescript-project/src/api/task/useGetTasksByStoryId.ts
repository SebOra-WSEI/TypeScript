import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { EMPTY_TASK } from './emptyTask';
import { TaskModel } from '../../types/task';

export const useGetTasksByStoryId = (
  id: string
): FetchedData<Array<TaskModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [tasks, setTasks] = useState<Array<TaskModel>>();

  useEffect(() => {
    const { errorMessage, status, response } = EMPTY_TASK.getAllByStoryId(id);

    if (!!errorMessage) {
      setError(errorMessage);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
      setTasks(response);
    }
  }, []);

  return {
    loading: isLoading,
    error,
    data: tasks,
  };
};
