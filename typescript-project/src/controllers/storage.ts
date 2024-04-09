import { v4 as uuidv4 } from 'uuid';
import { Priority } from '../types/priority';
import { State } from '../types/state';
import { Api } from './api';
import { ContentType } from '../types/contentType';
import { StatusCode } from '../types/statusCode';
import { StorageModel } from '../types/storage';
import { EMPTY_USER } from '../api/user/emptyUser';
import { Response } from '../types/response';

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

  getAllByProjectId(id: string): Response<Array<StorageModel>> {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Id cannot be empty',
        response: undefined,
      };
    }

    const storages = this.getAll().response as Array<StorageModel>;
    const filteredStorages = storages.filter((s) => s.projectId === id);
    const extendedStorages = filteredStorages.map((storage) => ({
      ...storage,
      owner: EMPTY_USER.getById(storage.ownerId).response,
    }));

    return {
      status: StatusCode.OK,
      response: extendedStorages,
    };
  }
}
