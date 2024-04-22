import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { ProjectModel } from '../../types/project';
import { StatusCode } from '../../types/statusCode';
import { EMPTY_PROJECT } from './project';
import { LOADING_DELAY } from '../../utils/consts';

export const useGetProjectById = (id: string): FetchedData<ProjectModel> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [project, setProject] = useState<ProjectModel>();

  useEffect(() => {
    const { status, response, message } = EMPTY_PROJECT.getById(id);

    if (status !== StatusCode.OK && message) {
      setError(message);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, LOADING_DELAY);
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
