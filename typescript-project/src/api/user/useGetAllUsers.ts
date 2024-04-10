import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { UserModel } from '../../types/user';
import { EMPTY_USER } from './emptyUser';

export const useGetAllUsers = (): FetchedData<UserModel[]> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<UserModel[]>([]);

  useEffect(() => {
    const { errorMessage, status, response, message } = EMPTY_USER.getAll();

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