import { ContentType } from './contentType';
import { Priority } from './priority';
import { State } from './state';

export interface TaskModel {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  storyId: string;
  state: State;
  createdDate: Date;
  startDate: Date;
  expectedEndTime: Date;
  endDate?: Date;
  storyPoint: number;
  assignedToId: string;
  type: ContentType;
}

export type TaskFormBody = Pick<
  TaskModel,
  | 'name'
  | 'description'
  | 'priority'
  | 'state'
  | 'createdDate'
  | 'endDate'
  | 'storyPoint'
  | 'assignedToId'
  | 'expectedEndTime'
>;
