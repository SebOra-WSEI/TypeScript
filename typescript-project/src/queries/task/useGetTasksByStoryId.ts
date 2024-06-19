import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { TaskModel } from '../../types/task';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { ErrorResponse, QueryResponse } from '../../types/response';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';

export const useGetTasksByStoryId = (
  storyId: string
): FetchedData<Array<TaskModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [tasks, setTasks] = useState<Array<TaskModel>>();

  useEffect(() => {
    axios
      .get(endpoints.tasks(storyId), {
        headers: { Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}` },
      })
      .then((res: QueryResponse<Array<TaskModel>>) => {
        const { status, data } = res;

        if (status === StatusCode.OK && data.data) {
          setTasks(data.data);
        }

        setIsLoading(false);
      })
      .catch((error: ErrorResponse<undefined>) => {
        const { status, data } = error.response;

        if (status !== StatusCode.OK && data.error) {
          setError(data.error);
          setIsLoading(false);
        }
      });
  }, []);

  return {
    loading: isLoading,
    error,
    data: tasks,
  };
};
