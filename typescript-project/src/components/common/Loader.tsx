import { CircularProgress } from '@mui/material';
import React from 'react';

export const Loader: React.FC = () => (
  <div style={styles}>
    <CircularProgress />
  </div>
);

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',
};
