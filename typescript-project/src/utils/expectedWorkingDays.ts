export const expectedWorkingDays = (days: number): Date =>
  new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000);
