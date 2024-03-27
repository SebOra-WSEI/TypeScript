import { useEffect, useState } from 'react';
import { Project } from '../controllers/project';
import { FetchedData } from '../types/fetchedData';
import { ProjectModel } from '../types/project';
import { StatusCode } from '../types/statusCode';

const PROJECT = new Project('', '');

export const useGetAllProjects = (): FetchedData<ProjectModel[]> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  useEffect(() => {
    const { errorMessage, status, response, message } = PROJECT.getAll();

    if (!!errorMessage) {
      setError(errorMessage);
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
