import { Response } from '../types/response';
import { StatusCode } from '../types/statusCode';
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorage';

export class Api<T> {
  object: T & { type: string };
  key: keyof T & string;
  idKey: keyof T & string;

  constructor(
    object: T & { type: string },
    id: keyof T & string,
    k: keyof T & string
  ) {
    this.object = object;
    this.idKey = id;
    this.key = k;
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
        errorMessage: 'Id cannot be empty',
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
    if (this.object[this.key] === '') {
      return {
        status: StatusCode.BadRequest,
        errorMessage: `${this.key} cannot be empty`,
        response: undefined,
      };
    }

    const allObjects = this.getAll().response as Array<T>;

    if (allObjects.find((p) => p[this.key] === this.object[this.key])) {
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
        errorMessage: 'Id cannot be empty',
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
        errorMessage: 'Id cannot be empty',
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
