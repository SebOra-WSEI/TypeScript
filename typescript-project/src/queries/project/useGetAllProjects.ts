import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { ProjectModel } from '../../types/project';
import { StatusCode } from '../../types/statusCode';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, QueryResponse } from '../../types/response';

export const useGetAllProjects = (): FetchedData<Array<ProjectModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<Array<ProjectModel>>([]);

  useEffect(() => {
    axios
      .get(endpoints.projects, {
        headers: { Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}` },
      })
      .then((res: QueryResponse<Array<ProjectModel>>) => {
        const { status, data } = res;

        if (status === StatusCode.OK && data.data) {
          setProjects(data.data);
        }

        setIsLoading(false);
      })
      .catch((error: ErrorResponse<undefined>) => {
        const { status, data } = error.response;

        if (status !== StatusCode.OK && data.error) {
          setMessage(data.message);
          setError(data.error);
          setIsLoading(false);
        }
      });
  }, []);

  return {
    loading: isLoading,
    error,
    data: projects,
    message,
  };
};
