import { Priority } from './priority';
import { State } from './state';
import { UserModel } from './user';

export interface StorageModel {
  id: string;
  name: string;
  description?: string;
  priority: Priority;
  projectId: string;
  date: Date;
  ownerId: string;
  state: State;
  owner?: UserModel;
  assignedToId?: string;
}

export interface StorageModel1 extends StorageModel {
  owner?: UserModel;
}

export type StorageFormBody = Pick<
  StorageModel,
  'name' | 'description' | 'priority' | 'projectId' | 'ownerId'
>;

export type UpdatedStorageFormBody = Pick<
  StorageModel,
  'name' | 'description' | 'priority' | 'state'
>;
