export enum Role {
  admin = 'admin',
  developer = 'developer',
  devops = 'devops',
}

export interface User {
  id: number;
  name: string;
  surname: string;
  login: string;
  password: string;
  role: Role;
}

export type UserResponse = Omit<User, 'password'>;