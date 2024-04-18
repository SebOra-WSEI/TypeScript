import { v4 as uuidv4 } from 'uuid';
import { Priority } from '../types/priority';
import { State } from '../types/state';
import { Api } from './api';
import { ContentType } from '../types/contentType';
import { TaskModel } from '../types/task';

export class Task extends Api<TaskModel> {
  constructor(
    name: string,
    description: string,
    storyId: string,
    priority: Priority,
    state: State,
    startDate: Date,
    endDate: Date,
    storyPoint: number,
    assignedToId: string
  ) {
    const id = uuidv4();
    const createdDate = new Date();

    const task: TaskModel = {
      id,
      name,
      description,
      storyId,
      priority,
      state,
      createdDate,
      startDate,
      endDate,
      storyPoint,
      assignedToId,
      type: ContentType.Task,
    };

    super(task, {
      idKey: 'id',
      nameKey: 'name',
      projectIdKey: 'storyId',
    });
  }
}
