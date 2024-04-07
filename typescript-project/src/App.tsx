import React from 'react';
import { AppNavigator } from './AppNavigator';
import { Box } from '@mui/material';
import { appStyles } from './styles/app';

export const App: React.FC = () => (
  <Box sx={appStyles.box}>
    <AppNavigator />
  </Box>
);
