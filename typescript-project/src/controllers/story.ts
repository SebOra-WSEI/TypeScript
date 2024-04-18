import { v4 as uuidv4 } from 'uuid';
import { Priority } from '../types/priority';
import { State } from '../types/state';
import { Api } from './api';
import { DataType } from '../types/dataType';
import { StoryModel } from '../types/story';

export class Story extends Api<StoryModel> {
  constructor(
    name: string,
    priority: Priority,
    projectId: string,
    ownerId: string,
    state: State,
    description?: string
  ) {
    const id = uuidv4();
    const date = new Date();

    const story: StoryModel = {
      id,
      name,
      description,
      priority,
      projectId,
      date,
      ownerId,
      state,
      type: DataType.Story,
    };

    super(story, {
      idKey: 'id',
      nameKey: 'name',
      projectIdKey: 'projectId',
    });
  }
}
