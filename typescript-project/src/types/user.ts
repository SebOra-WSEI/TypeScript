import { DataType } from './dataType';

interface UserBasic {
  name: string;
  surname: string;
  role: UserRole;
  type: DataType;
}

export interface UserModel extends UserBasic {
  id: string;
}

export enum UserRole {
  Admin = 'Admin',
  Developer = 'Developer',
  Devops = 'Devops',
}
