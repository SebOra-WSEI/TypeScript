const HOST = 'http://localhost:3000';

export const routes = {
  default: '/',
  login: '/login',
  noPage: '*',
  stories: '/projects/:projectId/stories',
  projects: '/projects',
  tasks: '/projects/:projectId/stories/:storyId/tasks',
} as const;

export const routeBuilder = {
  projects: routes.projects,
  stories: (projectId: string): string =>
    `${routes.stories.replace(':projectId', projectId)}`,
  tasks: (projectId: string, storyId: string): string =>
    `${routes.tasks.replace(':projectId', projectId).replace(':storyId', storyId)}`,
} as const;

export const endpoints = {
  project: (id: string) => `${HOST}/projects/${id}`,
  projects: `${HOST}/projects`,
  signIn: `${HOST}/sign-in`,
  stories: (projectId: string) => `${HOST}/stories?projectId=${projectId}`,
  story: (id: string) => `${HOST}/stories/${id}`,
  user: (id: string) => `${HOST}/users/${id}`,
} as const;
