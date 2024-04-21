import { useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { User } from '../../controllers/user';
import { LoginBody } from '../../types/login';
import axios from 'axios';
import { endpoints, routeBuilder } from '../../routes/routes';
import { UserModel, UserRole } from '../../types/user';
import { CURRENT_USER_ID, setToLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, LoggedUserResponse } from '../../types/response';
import { StatusCode } from '../../types/statusCode';
import { useHistory } from 'react-router';
import { EMPTY_USER } from './emptyUser';

type useLogInResult = FetchedData<User> & { logIn: () => Promise<void> };

export const useLogIn = (body: LoginBody): useLogInResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const history = useHistory();

  const logIn = async (): Promise<void> => {
    await axios
      .post(endpoints.signIn, body)
      .then((res: LoggedUserResponse) => {
        const { message, status, response } = res.data;
        const { name, surname, role } = response?.user ?? {};

        const allUsers = EMPTY_USER.getAll().response as Array<UserModel>;
        const existingUser = allUsers.find(
          (u) => u.name === name && u.surname === surname
        );

        if (status === StatusCode.OK && existingUser) {
          setToLocalStorage(CURRENT_USER_ID, existingUser.id);
          setMessage(message);

          setTimeout(() => {
            history.push(routeBuilder.projects);
          }, 1000);
          return;
        }

        // Create a new user
        const newUser = new User(
          name ?? '',
          surname ?? '',
          role ?? UserRole.Admin
        );
        newUser.create();

        setToLocalStorage(CURRENT_USER_ID, newUser.id);
        setMessage(message);

        setTimeout(() => {
          history.push(routeBuilder.projects);
        }, 1000);
      })
      .catch((error: ErrorResponse) => {
        const { status, message } = error.response?.data ?? {};

        if (status !== StatusCode.OK && message) {
          setError(message);
        }
      });
  };

  useSetSeverity(error, message);

  return {
    error,
    message,
    logIn,
  };
};
