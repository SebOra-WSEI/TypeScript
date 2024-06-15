import { useEffect, useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { StatusCode } from '../../types/statusCode';
import { UserModel } from '../../types/user';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { JWT_TOKEN, getFromLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, QueryResponse } from '../../types/response';

export const useGetAllUsers = (): FetchedData<Array<UserModel>> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [projects, setProjects] = useState<Array<UserModel>>([]);

  useEffect(() => {
    axios
      .get(endpoints.users, {
        headers: { Authorization: `Bearer: ${getFromLocalStorage(JWT_TOKEN)}` },
      })
      .then((res: QueryResponse<Array<UserModel>>) => {
        const { status, data } = res;

        if (status === StatusCode.OK && data.data) {
          setProjects(data.data);
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
    data: projects,
  };
};
