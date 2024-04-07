export const routes = {
  home: '/',
  noPage: '*',
  project: '/projects/:projectId',
  projectsList: '/projects',
} as const;

export const routeBuilder = {
  project: (id: string): string =>
    `${routes.project.replace(':projectId', id)}`,
} as const;
