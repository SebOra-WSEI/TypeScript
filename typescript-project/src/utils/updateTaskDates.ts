import { State } from '../types/state';
import { TaskModel } from '../types/task';

export const updateTaskDates = (task: TaskModel): TaskModel => {
  switch (task.state) {
    case State.Doing:
      if (!!task.endDate) {
        task.endDate = undefined;
        break;
      }
      task.startDate = new Date();
      break;
    case State.Done:
      task.endDate = new Date();
      break;
    default:
      task.startDate = undefined;
      task.endDate = undefined;
      break;
  }

  return task;
};
