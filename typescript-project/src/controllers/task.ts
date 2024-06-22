import { v4 as uuidv4 } from 'uuid';
import { Priority } from '../types/priority';
import { State } from '../types/state';
import { Api } from './api';
import { DataType } from '../types/dataType';
import { TaskModel } from '../types/task';

/**
 * @deprecated Used only to the old implementation based on localStorage
 */
export class Task extends Api<TaskModel> {
  constructor(
    name: string,
    description: string,
    storyId: string,
    priority: Priority,
    state: State,
    expectedEndTime: string,
    storyPoint: number,
    assignedToId: number,
    startDate?: string,
    endDate?: string
  ) {
    const id = uuidv4();
    const createdDate = String(new Date().getTime());

    const task: TaskModel = {
      id: Number(id),
      name,
      description,
      storyId,
      priority,
      state,
      createdDate,
      startDate,
      endDate,
      expectedEndTime,
      storyPoint,
      assignedToId,
    };

    super(
      { ...task, type: DataType.Task },
      {
        idKey: 'id',
        nameKey: 'name',
        projectIdKey: 'storyId',
      }
    );
  }
}
