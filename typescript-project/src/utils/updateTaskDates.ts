import { State } from '../types/state';
import { TaskBasic } from '../types/task';

export const updateTaskDates = (task: TaskBasic): TaskBasic => {
  switch (task.state) {
    case State.Doing:
      if (!!task.endDate) {
        task.endDate = undefined;
        break;
      }
      task.startDate = String(new Date().getTime());
      break;
    case State.Done:
      task.endDate = String(new Date().getTime());
      break;
    default:
      task.startDate = undefined;
      task.endDate = undefined;
      break;
  }

  return task;
};
