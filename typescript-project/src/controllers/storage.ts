import { v4 as uuidv4 } from 'uuid';
import { Priority } from '../types/priority';
import { State } from '../types/state';
import { Api } from './api';
import { ClassType } from '../types/class';

interface StorageModel {
  id: string;
  name: string;
  description?: string;
  priority: Priority;
  projectId: string;
  date: Date;
  ownerId: string;
  state: State;
}

export class Storage extends Api<StorageModel> {
  protected id: string;
  public name: string;
  public description?: string;
  public priority: Priority;
  protected projectId: string;
  protected date: Date;
  protected ownerId: string;
  public state: State;

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

    const storage = {
      id,
      name,
      description,
      priority,
      projectId,
      date,
      ownerId,
      state,
      type: ClassType.Storage,
    };

    super(storage, 'id', 'name');

    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.projectId = projectId;
    this.date = date;
    this.ownerId = ownerId;
    this.state = state;
  }
}
