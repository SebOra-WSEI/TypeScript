import { Task } from '../../controllers/task';
import { DataType } from '../../types/dataType';
import { Priority } from '../../types/priority';
import { State } from '../../types/state';
import { TaskBasic } from '../../types/task';

export const EMPTY_TASK = new Task(
  '',
  '',
  '',
  Priority.High,
  State.Todo,
  new Date(),
  0,
  ''
);

export const defaultTask: TaskBasic = {
  name: '',
  description: '',
  priority: Priority.High,
  storyId: '',
  state: State.Todo,
  createdDate: new Date(),
  expectedEndTime: new Date(),
  storyPoint: 1,
  assignedToId: '',
  type: DataType.Task,
  endDate: undefined,
  startDate: undefined,
};
