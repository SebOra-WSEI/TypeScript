import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from '../types/statusCode';
import { Response } from '../types/response';
import { ProjectModel } from '../types/project';
import { LOCAL_STORAGE_KEY } from '../utils/consts';
import { getAllProjectsFromLocalStorage } from '../utils/getProjectsFromLocalStorage';

export class Project {
  name: string;
  description?: string;

  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
  }

  getAll(): Response<Array<ProjectModel>> {
    return {
      status: StatusCode.OK,
      response: getAllProjectsFromLocalStorage(),
    };
  }

  getById(id: string): Response<ProjectModel> {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Id cannot be empty',
        response: undefined,
      };
    }

    const allProjects = this.getAll().response as Array<ProjectModel>;
    const project = allProjects.find((p) => p.id === id);

    if (!project) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: `Project not found`,
        response: undefined,
      };
    }

    return {
      status: StatusCode.OK,
      response: project,
    };
  }

  create(): Response<ProjectModel> {
    const newProject: ProjectModel = {
      id: uuidv4(),
      name: this.name,
      description: this.description,
    };

    const allProjects = this.getAll().response as Array<ProjectModel>;

    if (allProjects.find((p) => p.name === this.name)) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: `Project "${this.name}" already exist`,
        response: undefined,
      };
    }

    allProjects.push(newProject);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allProjects));

    return {
      status: StatusCode.Created,
      message: 'Project has been created successfully',
      response: newProject,
    };
  }

  delete(id: string): Response<ProjectModel> {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Id cannot be empty',
        response: undefined,
      };
    }

    const currentProjectResponse = this.getById(id);

    if (Boolean(currentProjectResponse.errorMessage)) {
      return currentProjectResponse;
    }

    const allProjects = this.getAll().response as Array<ProjectModel>;
    const newArray = allProjects.filter(
      (p) => p.id !== currentProjectResponse.response?.id
    );

    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newArray));

    return {
      status: StatusCode.OK,
      message: 'Project removed successfully',
      response: currentProjectResponse.response,
    };
  }

  update(id: string, newData: Partial<ProjectModel>): Response<ProjectModel> {
    if (!id.length) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Id cannot be empty',
        response: undefined,
      };
    }

    const { name: newName, description: newDescription } = newData;
    if (!newName || !newDescription) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Fields cannot be empty',
        response: undefined,
      };
    }

    const currentProjectResponse = this.getById(id);
    if (Boolean(currentProjectResponse.errorMessage)) {
      return currentProjectResponse;
    }

    const {
      id: currProjectId,
      name,
      description,
    } = currentProjectResponse.response as ProjectModel;

    if (name === newName || description === newDescription) {
      return {
        status: StatusCode.BadRequest,
        errorMessage: 'Name or description value is the same as previous one',
        response: currentProjectResponse.response,
      };
    }

    const updatedProject: ProjectModel = {
      id: currProjectId,
      name: newName || name,
      description: newDescription || description,
    };

    const allProjects = this.getAll().response as Array<ProjectModel>;
    const newArr = allProjects.map((p) => {
      if (p.id === currProjectId) {
        return updatedProject;
      }
      return p;
    });

    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newArr));

    return {
      status: StatusCode.OK,
      message: 'Project has been updated successfully',
      response: updatedProject,
    };
  }
}
