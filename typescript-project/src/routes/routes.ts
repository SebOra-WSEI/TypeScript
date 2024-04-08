export const routes = {
  home: '/',
  noPage: '*',
  projectDetails: '/projects/:projectId',
  projectsList: '/projects',
} as const;

export const routeBuilder = {
  projectDetails: (id: string): string =>
    `${routes.projectDetails.replace(':projectId', id)}`,
} as const;
