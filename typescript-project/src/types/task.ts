import { DataType } from './dataType';
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
  expectedEndTime: Date;
  startDate?: Date;
  endDate?: Date;
  storyPoint: number;
  assignedToId: string;
  type: DataType;
}

export type TaskFormBody = Omit<TaskModel, 'id' | 'type'>;
