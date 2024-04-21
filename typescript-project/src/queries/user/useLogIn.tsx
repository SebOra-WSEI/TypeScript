import { useState } from 'react';
import { FetchedData } from '../../types/fetchedData';
import { useSetSeverity } from '../../hooks/useSetSeverity';
import { User } from '../../controllers/user';
import { LoginBody } from '../../types/login';
import axios from 'axios';
import { endpoints, routeBuilder } from '../../routes/routes';
import { UserRole } from '../../types/user';
import { CURRENT_USER_ID, setToLocalStorage } from '../../utils/localStorage';
import { ErrorResponse, LoggedUserResponse } from '../../types/response';
import { StatusCode } from '../../types/statusCode';
import { useHistory } from 'react-router';

type useLogInResult = FetchedData<User> & { logIn: () => Promise<void> };

export const useLogIn = (
  body: LoginBody
): useLogInResult => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const history = useHistory();

  const logIn = async (): Promise<void> => {
    await axios
      .post(endpoints.signIn, body)
      .then((res: LoggedUserResponse) => {
        const { message, status, response } = res.data;

        const { name, surname, role } = response?.user ?? {};

        const user = new User(name ?? '', surname ?? '', role ?? UserRole.Admin);

        user.create();
        setToLocalStorage(CURRENT_USER_ID, user.id)


        if (status === StatusCode.OK && response) {
          setMessage(message);

          setTimeout(() => {
            history.push(routeBuilder.projects)
          }, 1000);
        }
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
