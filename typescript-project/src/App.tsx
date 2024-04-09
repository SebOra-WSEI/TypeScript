import React from 'react';
import { AppNavigator } from './AppNavigator';
import { SnackbarContextProvider } from './components/Snackbar/SnackbarContext';

export const App: React.FC = () => (
  <SnackbarContextProvider>
    <AppNavigator />
  </SnackbarContextProvider>
);
