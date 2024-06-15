import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { UserModel } from '../../types/user';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { ErrorResponse, QueryResponse } from '../../types/response';

export const useGetUserById = (id: string): FetchedData<UserModel> => {
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    axios
      .get(endpoints.user(id), {
        headers: {
          Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}`,
        },
      })
      .then((res: QueryResponse<UserModel>) => {
        const { status, data } = res;

        if (status === StatusCode.OK && data.data) {
          setUser(data.data);
        }
      })
      .catch((error: ErrorResponse<undefined>) => {
        const { status, data } = error.response;

        if (status !== StatusCode.OK && data.error) {
          setError(data.error);
        }
      });
  }, []);

  return {
    error,
    data: user,
  };
};
