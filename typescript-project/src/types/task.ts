import { DataType } from './dataType';
import { Priority } from './priority';
import { State } from './state';

export interface TaskBasic {
  name: string;
  description: string;
  priority: Priority;
  storyId: string;
  state: State;
  createdDate: Date;
  expectedEndTime: Date;
  storyPoint: number;
  assignedToId: string;
  type: DataType;
  startDate?: Date;
  endDate?: Date;
}

export interface TaskModel extends TaskBasic {
  id: string;
}
