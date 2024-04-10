import { Priority } from './priority';
import { State } from './state';
import { UserModel } from './user';

export interface StoryModel {
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

export type StoryFormBody = Pick<
  StoryModel,
  'name' | 'description' | 'priority' | 'projectId' | 'ownerId'
>;

export type UpdatedStoryFormBody = Pick<
  StoryModel,
  'name' | 'description' | 'priority' | 'state'
>;
