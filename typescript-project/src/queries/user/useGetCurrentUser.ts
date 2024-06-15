import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { UserModel } from '../../types/user';
import {
  CURRENT_USER_ID,
  JWT_TOKEN,
  getFromLocalStorage,
} from '../../utils/localStorage';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { ErrorResponse, QueryResponse } from '../../types/response';

export const useGetCurrentUser = (): FetchedData<UserModel> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<UserModel>();

  const userId = getFromLocalStorage(CURRENT_USER_ID);

  useEffect(() => {
    axios
      .get(endpoints.user(userId), {
        headers: {
          Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}`,
        },
      })
      .then((res: QueryResponse<UserModel>) => {
        const { status, data } = res;

        if (status === StatusCode.OK && data.data) {
          setIsLoading(false);
          setUser(data.data);
        }
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
    data: user,
  };
};
