import { v4 as uuidv4 } from 'uuid';
import { Priority } from '../types/priority';
import { State } from '../types/state';
import { Api } from './api';
import { ContentType } from '../types/contentType';
import { StatusCode } from '../types/statusCode';

export interface StorageModel {
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
    };

    super(storage, ContentType.Storage, {
      idKey: 'id',
      nameKey: 'name',
      projectIdKey: 'projectId',
    });
  }

  getAllByProjectId(id: string) {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Id cannot be empty',
        response: undefined,
      };
    }

    const storages = this.getAll().response as Array<StorageModel>;
    const filteredStorages = storages.filter((s) => s.projectId === id);

    return {
      status: StatusCode.OK,
      response: filteredStorages,
    };
  }
}
