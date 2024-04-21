import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { ProjectModel } from '../../types/project';
import { StatusCode } from '../../types/statusCode';
import { EMPTY_PROJECT } from './project';

export const useGetAllProjects = (): FetchedData<Array<ProjectModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<Array<ProjectModel>>([]);

  useEffect(() => {
    const { status, response, message } = EMPTY_PROJECT.getAll();

    if (status !== StatusCode.OK && message) {
      setError(message);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
      setProjects(response);
      setMessage(message);
    }
  }, []);

  return {
    loading: isLoading,
    error,
    data: projects,
    message,
  };
};
