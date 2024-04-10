import { ContentType } from '../types/contentType';
import { Response } from '../types/response';
import { StatusCode } from '../types/statusCode';
import {
  SELECTED_PROJECT_ID,
  getFromLocalStorage,
  setToLocalStorage,
} from '../utils/localStorage';

type KeyOfType<T> = keyof T & string;
type Object<T> = T & { type: ContentType };

interface Parameters<T> {
  idKey: KeyOfType<T>;
  nameKey: KeyOfType<T>;
  projectIdKey?: KeyOfType<T>;
}

export class Api<T> {
  private object: Object<T>;

  private nameKey: KeyOfType<T>;
  private idKey: KeyOfType<T>;
  private projectIdKey: KeyOfType<T>;

  constructor(object: Object<T>, parameters: Parameters<T>) {
    this.object = object;

    this.nameKey = parameters.nameKey;
    this.idKey = parameters.idKey;
    this.projectIdKey = parameters?.projectIdKey as KeyOfType<T>;
  }

  getAll(): Response<Array<T>> {
    const value = getFromLocalStorage(this.object.type);

    return {
      status: StatusCode.OK,
      response: value ? JSON.parse(value) : [],
    };
  }

  getById(id: string): Response<T> {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: `${this.idKey} cannot be empty`,
        response: undefined,
      };
    }

    const allObjects = this.getAll().response as Array<T>;
    const project = allObjects.find((p) => p[this.idKey] === id);

    if (!project) {
      return {
        status: StatusCode.NotFound,
        errorMessage: `${this.object.type} not found`,
        response: undefined,
      };
    }

    return {
      status: StatusCode.OK,
      response: project,
    };
  }

  create(): Response<T> {
    if (this.object[this.nameKey] === '') {
      return {
        status: StatusCode.BadRequest,
        errorMessage: `${this.nameKey} cannot be empty`,
        response: undefined,
      };
    }

    const isNameTheSame = (existed: T): boolean =>
      existed[this.nameKey] === this.object[this.nameKey];

    const isProjectTheSame = (existed: T): boolean =>
      existed[this.projectIdKey] === getFromLocalStorage(SELECTED_PROJECT_ID);

    const allObjects = this.getAll().response as Array<T>;

    const isAlreadyExisted = allObjects.find((p) => {
      if (this.projectIdKey) {
        return isProjectTheSame(p) && isNameTheSame(p);
      }

      return isNameTheSame(p);
    });

    if (Boolean(isAlreadyExisted)) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: `${this.object.type} already exist`,
        response: undefined,
      };
    }

    allObjects.push(this.object);
    setToLocalStorage(this.object.type, JSON.stringify(allObjects));

    return {
      status: StatusCode.Created,
      message: `${this.object.type} has been created successfully`,
      response: this.object,
    };
  }

  delete(id: string): Response<T> {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: `${this.idKey} cannot be empty`,
        response: undefined,
      };
    }

    const currentObjectResponse = this.getById(id);
    if (Boolean(currentObjectResponse.errorMessage)) {
      return currentObjectResponse;
    }

    const allProjects = this.getAll().response as Array<T>;
    const newArray = allProjects.filter(
      (p) => p[this.idKey] !== currentObjectResponse.response?.[this.idKey]
    );

    setToLocalStorage(this.object.type, JSON.stringify(newArray));

    return {
      status: StatusCode.OK,
      message: `${this.object.type} removed successfully`,
      response: currentObjectResponse.response,
    };
  }

  update(id: string, newData: Partial<T>): Response<T> {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: `${this.idKey} cannot be empty`,
        response: undefined,
      };
    }
    if (Object.values(newData).some((v) => v === '')) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Fields cannot be empty',
        response: undefined,
      };
    }

    const currentObjectResponse = this.getById(id);
    if (Boolean(currentObjectResponse.errorMessage)) {
      return currentObjectResponse;
    }

    const updatedProject = {
      id,
      ...newData,
    } as T;

    const allObjects = this.getAll().response as Array<T>;
    const newArray = allObjects.map((p) => {
      if (p[this.idKey] === id) {
        return updatedProject;
      }
      return p;
    });

    setToLocalStorage(this.object.type, JSON.stringify(newArray));

    return {
      status: StatusCode.OK,
      message: `${this.object.type} has been updated successfully`,
      response: updatedProject,
    };
  }
}
