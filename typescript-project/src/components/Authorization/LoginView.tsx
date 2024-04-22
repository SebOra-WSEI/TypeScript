import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { LoginBody } from '../../types/login';
import { useLogIn } from '../../queries/userAPI/useLogIn';
import { useGetCurrentUser } from '../../queries/user/useGetCurrentUser';
import { UserAlreadyLoggedMessage } from '../common/Messages/UserAlreadyLoggedMessage';

export const LoginView: React.FC = () => {
  const [loginBody, setLoginBody] = useState<LoginBody>({
    login: '',
    password: '',
  });

  const { data } = useGetCurrentUser();
  const { signIn } = useLogIn(loginBody);

  const handleLogIn = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    signIn();
  };

  if (data?.id) {
    return <UserAlreadyLoggedMessage />
  }

  return (
    <LoginForm
      loginBody={loginBody}
      setLoginBody={setLoginBody}
      onSubmit={handleLogIn}
    />
  );
};
