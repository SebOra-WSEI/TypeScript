import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { TaskModel } from '../../types/task';
import { EMPTY_TASK } from './task';

export const useGetTaskById = (id: string): FetchedData<TaskModel> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [task, setTask] = useState<TaskModel>();

  useEffect(() => {
    const { status, response, message } = EMPTY_TASK.getById(id);

    if (status !== StatusCode.OK && message) {
      setError(message);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
      setTask(response);
      setMessage(message);
    }
  }, []);

  return {
    loading: isLoading,
    error,
    data: task,
    message,
  };
};
