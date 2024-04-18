import { DataType } from './dataType';
import { Priority } from './priority';
import { State } from './state';

export interface StoryModel {
  id: string;
  name: string;
  description?: string;
  priority: Priority;
  projectId: string;
  date: Date;
  ownerId: string;
  state: State;
  assignedToId?: string;
  type: DataType;
}

export type StoryFormBody = Omit<StoryModel, 'id' | 'date' | 'state' | 'type'>;
