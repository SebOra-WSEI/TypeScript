import { CircularProgress } from '@mui/material';
import React from 'react';
import { loaderStyles } from '../../styles/loaderStyles';

export const Loader: React.FC = () => (
  <div style={loaderStyles}>
    <CircularProgress sx={loaderStyles} />
  </div>
);
