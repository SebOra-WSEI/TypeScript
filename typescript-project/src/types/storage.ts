import { Priority } from './priority';
import { State } from './state';

export interface StorageModel {
  id: string;
  name: string;
  description?: string;
  priority: Priority;
  projectId: string;
  date: Date;
  ownerId: string;
  state: State;
}

export type StorageFormBody = Pick<
  StorageModel,
  'name' | 'description' | 'priority' | 'projectId' | 'ownerId'
>;
