export const routes = {
  home: '/',
  noPage: '*',
  stories: '/projects/:projectId/stories',
  projects: '/projects',
  tasks: '/projects/:projectId/stories/:storyId/tasks',
} as const;

export const routeBuilder = {
  stories: (projectId: string): string =>
    `${routes.stories.replace(':projectId', projectId)}`,
  tasks: (projectId: string, storyId: string): string =>
    `${routes.tasks.replace(':projectId', projectId).replace(':storyId', storyId)}`,
} as const;
