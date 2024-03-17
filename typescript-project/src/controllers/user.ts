import { v4 as uuidv4 } from 'uuid';
import { Response } from '../types/response';
import { StatusCode } from '../types/statusCode';
import { UserModel } from '../types/user';
import { USERS_LOCAL_STORAGE_KEY } from '../utils/consts';
import { getFromLocalStorage } from '../utils/getFromLocalStorage';

export class User {
  name: string;
  surname: string;

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }

  getAll(): Response<Array<UserModel>> {
    return {
      status: StatusCode.OK,
      response: getFromLocalStorage(USERS_LOCAL_STORAGE_KEY),
    };
  }

  getById(id: string): Response<UserModel> {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Id cannot be empty',
        response: undefined,
      };
    }

    const allUsers = this.getAll().response as Array<UserModel>;
    const user = allUsers.find((p) => p.id === id);

    if (!user) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: `User not found`,
        response: undefined,
      };
    }

    return {
      status: StatusCode.OK,
      response: user,
    };
  }

  create(): Response<UserModel> {
    const newProject: UserModel = {
      id: uuidv4(),
      name: this.name,
      surname: this.surname,
    };

    const allProjects = this.getAll().response as Array<UserModel>;

    if (
      allProjects.find(
        ({ name, surname }) => name === this.name && surname === this.surname
      )
    ) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: `User already exist`,
        response: undefined,
      };
    }

    allProjects.push(newProject);
    window.localStorage.setItem(
      USERS_LOCAL_STORAGE_KEY,
      JSON.stringify(allProjects)
    );

    return {
      status: StatusCode.Created,
      message: 'User has been created successfully',
      response: newProject,
    };
  }

  delete(id: string): Response<UserModel> {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Id cannot be empty',
        response: undefined,
      };
    }

    const currentUserResponse = this.getById(id);

    if (Boolean(currentUserResponse.errorMessage)) {
      return currentUserResponse;
    }

    const allUsers = this.getAll().response as Array<UserModel>;
    const newArray = allUsers.filter(
      (p) => p.id !== currentUserResponse.response?.id
    );

    window.localStorage.setItem(
      USERS_LOCAL_STORAGE_KEY,
      JSON.stringify(newArray)
    );

    return {
      status: StatusCode.OK,
      message: 'User removed successfully',
      response: currentUserResponse.response,
    };
  }

  update(id: string, newData: Partial<UserModel>): Response<UserModel> {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Id cannot be empty',
        response: undefined,
      };
    }

    const { name: newName, surname: newSurname } = newData;
    if (!newName || !newSurname) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Fields cannot be empty',
        response: undefined,
      };
    }

    const currentUserResponse = this.getById(id);
    if (Boolean(currentUserResponse.errorMessage)) {
      return currentUserResponse;
    }

    const {
      id: currProjectId,
      name,
      surname,
    } = currentUserResponse.response as UserModel;

    if (name === newName || surname === newSurname) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Name or Surname value is the same as previous one',
        response: currentUserResponse.response,
      };
    }

    const updatedProject: UserModel = {
      id: currProjectId,
      name: newName || name,
      surname: newSurname || surname,
    };

    const allUsers = this.getAll().response as Array<UserModel>;
    const newArr = allUsers.map((p) => {
      if (p.id === currProjectId) {
        return updatedProject;
      }
      return p;
    });

    window.localStorage.setItem(
      USERS_LOCAL_STORAGE_KEY,
      JSON.stringify(newArr)
    );

    return {
      status: StatusCode.OK,
      message: 'User has been updated successfully',
      response: updatedProject,
    };
  }
}
