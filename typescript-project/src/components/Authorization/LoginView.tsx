import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { LoginBody } from '../../types/login';
import { useLogIn } from '../../queries/user/useLogIn';

export const LoginView: React.FC = () => {
  const [loginBody, setLoginBody] = useState<LoginBody>({
    login: '',
    password: '',
  });

  const { logIn } = useLogIn(loginBody);

  const handleLogIn = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    await logIn();
  };

  return (
    <LoginForm
      loginBody={loginBody}
      setLoginBody={setLoginBody}
      onSubmit={handleLogIn}
    />
  );
};
