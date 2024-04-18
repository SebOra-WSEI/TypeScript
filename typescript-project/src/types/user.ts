import { DataType } from './dataType';

export interface UserModel {
  id: string;
  name: string;
  surname: string;
  role: UserRole;
  type: DataType;
}

export enum UserRole {
  Admin = 'Admin',
  Developer = 'Developer',
  Devops = 'Devops',
}
