import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { ProjectModel } from '../../types/project';
import { StatusCode } from '../../types/statusCode';
import { EMPTY_PROJECT } from './emptyProject';

export const useGetProjectById = (id: string): FetchedData<ProjectModel> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [project, setProject] = useState<ProjectModel>();

  useEffect(() => {
    const { errorMessage, status, response, message } =
      EMPTY_PROJECT.getById(id);

    if (!!errorMessage) {
      setError(errorMessage);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
      setProject(response);
      setMessage(message);
    }
  }, []);

  return {
    loading: isLoading,
    error,
    data: project,
    message,
  };
};
