import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { ProjectModel } from '../../types/project';
import { StatusCode } from '../../types/statusCode';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, QueryResponse } from '../../types/response';

export const useGetProjectById = (id: string): FetchedData<ProjectModel> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [project, setProject] = useState<ProjectModel>();

  useEffect(() => {
    axios
      .get(endpoints.project(id), {
        headers: { Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}` },
      })
      .then((res: QueryResponse<ProjectModel>) => {
        const { status, data } = res;

        if (status === StatusCode.OK && data.data) {
          setProject(data.data);
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
    data: project,
  };
};
