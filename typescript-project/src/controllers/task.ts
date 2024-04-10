import { v4 as uuidv4 } from 'uuid';
import { Priority } from '../types/priority';
import { State } from '../types/state';
import { Api } from './api';
import { ContentType } from '../types/contentType';

interface TaskModel {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  storyId: string;
  state: State;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
  storyPoint: number;
  assignedToId: string;
}

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
    };

    super(task, ContentType.Story, {
      idKey: 'id',
      nameKey: 'name',
      projectIdKey: 'storyId',
    });
  }
}
