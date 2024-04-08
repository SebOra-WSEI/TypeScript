export const routes = {
  home: '/',
  noPage: '*',
  storages: '/projects/:projectId/storages',
  projects: '/projects',
} as const;

export const routeBuilder = {
  storages: (id: string): string =>
    `${routes.storages.replace(':projectId', id)}`,
} as const;
