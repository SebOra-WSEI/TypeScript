import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { UserModel } from '../../types/user';
import { EMPTY_USER } from './emptyUser';
import { CURRENT_USER_ID, getFromLocalStorage } from '../../utils/localStorage';
import { LOADING_DELAY } from '../../utils/consts';

export const useGetCurrentUser = (): FetchedData<UserModel> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserModel>();

  const userId = getFromLocalStorage(CURRENT_USER_ID);

  useEffect(() => {
    const { status, response, message } = EMPTY_USER.getById(userId);

    if (status !== StatusCode.OK && message) {
      setError(message);
      setIsLoading(false);
    }

    if (status === StatusCode.OK && response) {
      setTimeout(() => {
        setIsLoading(false);
      }, LOADING_DELAY);
      setUser(response);
      setMessage(message);
    }
  }, []);

  return {
    loading: isLoading,
    error,
    data: user,
    message,
  };
};
