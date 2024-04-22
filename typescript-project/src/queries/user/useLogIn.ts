import { useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { User } from '../../controllers/user';
import { LoginBody } from '../../types/login';
import axios from 'axios';
import { endpoints, routeBuilder } from '../../routes/routes';
import { CURRENT_USER_ID, setToLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, LoggedUserResponse } from '../../types/response';
import { StatusCode } from '../../types/statusCode';
import { DataType } from '../../types/dataType';

const allUsers = [
  {
    name: 'Sebastian',
    surname: 'Oraczek',
    role: 'Admin',
    id: '17dd3204-8269-415d-85b1-832a17b760d6',
    login: 'Sebastian',
    password: 'abc',
  },
  {
    name: 'Jan',
    surname: 'Kowalski',
    role: 'Developer',
    id: '07376188-835d-4d95-ab8d-a0f5399d1199',
    login: 'Jan',
    password: 'abc',
  },
  {
    name: 'Aleksandra',
    surname: 'Nowak',
    role: 'Devops',
    id: 'c70676d5-8e88-4eba-a399-c4d683fe4a7f',
    login: 'Aleksandra',
    password: 'abc',
  },
];

type useLogInResult = FetchedData<User> & { logIn: () => Promise<void> };

export const useLogIn = (body: LoginBody): useLogInResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  setToLocalStorage(DataType.User, JSON.stringify(allUsers));

  const logIn = async (): Promise<void> => {
    await axios
      .post(endpoints.signIn, body)
      .then((res: LoggedUserResponse) => {
        const { message, status, response } = res.data;

        if (status === StatusCode.OK && response?.user) {
          setToLocalStorage(CURRENT_USER_ID, response.user.id);
          setMessage(message);

          setTimeout(() => {
            window.location.replace(routeBuilder.projects);
          }, 1000);
        }
      })
      .catch((error: ErrorResponse) => {
        const { status, message } = error.response?.data ?? {};

        if (status !== StatusCode.OK && message) {
          setError(message);
        }

        setTimeout(() => {
          setError('');
        }, 100);
      });
  };

  useSetSeverity(error, message);

  return {
    error,
    message,
    logIn,
  };
};
