export const routes = {
  home: '/',
  noPage: '*',
  stories: '/projects/:projectId/stories',
  projects: '/projects',
} as const;

export const routeBuilder = {
  stories: (id: string): string =>
    `${routes.stories.replace(':projectId', id)}`,
} as const;
