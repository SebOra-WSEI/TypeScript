import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { UserModel } from '../../types/user';
import { EMPTY_USER } from './emptyUser';
import { LOADING_DELAY } from '../../utils/consts';

export const useGetAllUsers = (): FetchedData<Array<UserModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<Array<UserModel>>([]);

  useEffect(() => {
    const { status, response, message } = EMPTY_USER.getAll();

    if (status !== StatusCode.OK && message) {
      setError(message);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, LOADING_DELAY);
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
