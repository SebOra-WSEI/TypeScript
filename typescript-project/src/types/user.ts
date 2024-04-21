export interface UserModel {
  id: string;
  name: string;
  surname: string;
  role: UserRole;
}

export enum UserRole {
  Admin = 'Admin',
  Developer = 'Developer',
  Devops = 'Devops',
}

export interface LoggedUser {
  token: string;
  refreshToken: string;
  user?: UserModel;
}
