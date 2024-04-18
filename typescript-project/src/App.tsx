import React from 'react';
import { AppNavigator } from './AppNavigator';
import { SnackbarAlert } from './components/Snackbar/SnackbarAlert';

export const App: React.FC = () => (
  <>
    <AppNavigator />
    <SnackbarAlert />
  </>
);
