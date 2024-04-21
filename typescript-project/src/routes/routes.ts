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
  signIn: `${HOST}/sign-in`,
} as const;
