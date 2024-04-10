export const routes = {
  home: '/',
  noPage: '*',
  stories: '/projects/:projectId/stories',
  projects: '/projects',
  tasks: '/projects/:projectId/stories/:storyId/tasks',
  taskDetails: '/projects/:projectId/stories/:storyId/tasks/:taskId',
} as const;

export const routeBuilder = {
  projects: routes.projects,
  stories: (projectId: string): string =>
    `${routes.stories.replace(':projectId', projectId)}`,
  tasks: (projectId: string, storyId: string): string =>
    `${routes.tasks.replace(':projectId', projectId).replace(':storyId', storyId)}`,
  taskDetails: (projectId: string, storyId: string, taskId: string) =>
    `${routes.taskDetails.replace(':projectId', projectId).replace(':storyId', storyId).replace(':taskId', taskId)}`,
} as const;
