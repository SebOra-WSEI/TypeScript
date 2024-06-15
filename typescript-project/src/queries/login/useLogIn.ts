import axios from 'axios';
import { useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { LoginBody } from '../../types/login';
import { endpoints, routeBuilder } from '../../routes/routes';
import { QueryResponse, ErrorResponse } from '../../types/response';
import { StatusCode } from '../../types/statusCode';
import { ERROR_DELAY, REDIRECT_DELAY } from '../../utils/consts';
import { UserModel } from '../../types/user';
import {
  setToLocalStorage,
  CURRENT_USER_ID,
  JWT_TOKEN,
} from '../../utils/localStorage';

type useLogInResult = FetchedData<UserModel> & { signIn: () => Promise<void> };

export const useLogIn = (body: LoginBody): useLogInResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const signIn = async (): Promise<void> => {
    await axios
      .post(endpoints.signIn, body)
      .then((res: QueryResponse<UserModel>) => {
        const { status, data } = res;

        if (status === StatusCode.OK && data.message) {
          setMessage(data.message);
          setToLocalStorage(CURRENT_USER_ID, data.data?.id ?? '');
          setToLocalStorage(JWT_TOKEN, data?.token ?? '');
        }

        setTimeout(() => {
          window.location.replace(routeBuilder.projects);
        }, REDIRECT_DELAY);
      })
      .catch((error: ErrorResponse<undefined>) => {
        const { status, data } = error.response;

        if (status !== StatusCode.OK && data.error) {
          setError(data.error);
        }

        setTimeout(() => {
          setError('');
        }, ERROR_DELAY);
      });
  };

  useSetSeverity(error, message);

  return {
    error,
    message,
    signIn,
  };
};
