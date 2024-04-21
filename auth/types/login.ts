import { User } from './user';

export interface LoginBody {
  login: string;
  password: string;
}

export interface LoggedUser {
  token: string;
  refreshToken: string;
  user?: User;
}
